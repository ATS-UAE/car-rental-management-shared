const passport = require("passport");
const express = require("express");
const router = express.Router();
const moment = require("moment");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, oneOf, validationResult } = require("express-validator/check");

const { ResponseBuilder } = require("../utils");
const { sendPasswordResetToken } = require("../mail/utils");
const db = require("../models");
const requireLogin = require("../middlewares/requireLogin");
const { secretKey } = require("../config");

router.get("/me", requireLogin, function(req, res) {
	let response = new ResponseBuilder();
	response.setData(req.user);
	response.setMessage("You are logged in.");
	response.setSuccess(true);
	response.setCode(200);
	res.json(response);
});

router.patch("/me", async function({ user, body }, res) {
	let response = new ResponseBuilder();
	let me = await db.User.findByPk(user.id);
	if (me) {
		if (body.password && body.passwordOld) {
			let samePassword = await bcrypt.compare(body.password, me.password);
			if (!samePassword) {
				let validOldPassword = await bcrypt.compare(
					body.passwordOld,
					me.password
				);
				let newPassword = await bcrypt.hash(body.password, 10);
				if (validOldPassword) {
					await me.update({ password: newPassword });
					response.setCode(200);
					response.setMessage("Successfully updated.");
					response.setSuccess(true);
				} else {
					response.setCode(400);
					response.setMessage("Invalid old password.");
					res.status(400);
				}
			} else {
				response.setCode(400);
				response.setMessage("Old password is same as the new one.");
				res.status(400);
			}
		}
	} else {
		response.setCode(401);
		response.setMessage("Unauthorized. Are you logged in?");
		res.status(401);
	}
	res.json(response);
});

router.post(
	"/login",
	function(req, res, next) {
		passport.authenticate("local", function(err, user, info) {
			if (err) {
				return next(err);
			}
			if (!user) {
				let response = new ResponseBuilder();
				response.setMessage("Invalid login details");
				response.setCode(401);
				res.status(401);
				return res.json(response);
			}
			req.logIn(user, function(err) {
				// TODO: Updated last login in user.
				db.User.findByPk(user.id).then(user => {
					user.update({ lastLogin: moment().format("YYYY-MM-DD HH:mm:ss") });
				});
				let response = new ResponseBuilder();
				if (err) {
					return next(err);
				}
				response.setMessage("Logged in successfully");
				response.setCode(200);
				response.setSuccess(true);
				return res.json(response);
			});
		})(req, res, next);
	},
	function(req, res) {
		res.json(req.user);
	}
);

router.get("/logout", function(req, res) {
	let response = new ResponseBuilder();
	response.setCode(200);
	response.setMessage("Successfully logged out.");
	response.setSuccess(true);
	req.logout();
	res.status = 200;
	res.send(response);
});

router.post(
	"/forgot",
	oneOf([
		check("email")
			.exists({ checkNull: true })
			.withMessage("Email cannot be empty")
			.isEmail()
			.withMessage("Invalid email"),
		[
			check("token")
				.exists({ checkNull: true })
				.withMessage("You do not have a reset token."),
			check("password")
				.exists({ checkNull: true })
				.isLength({ min: 8, max: 32 })
				.withMessage("A new password should be provided")
		]
	]),
	async function(req, res) {
		const response = new ResponseBuilder();

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			for (let error of errors.array()) response.appendError(error.msg);
			response.setMessage("Invalid fields");
			response.setCode(422);
			return res.status(422).json(response);
		}
		const { email, token, password } = req.body;

		if (token) {
			try {
				const validToken = jwt.verify(token, secretKey);
				if (validToken && validToken.passwordReset) {
					const user = await db.User.findOne({
						where: { email: validToken.email }
					});
					const newPassword = await bcrypt.hash(password, 10);
					await user.update({ password: newPassword });
					response.setSuccess(true);
					response.setMessage("Password has been reset.");
					response.setCode(401);
					return res.json(response);
				}
			} catch (e) {
				response.setSuccess(true);
				response.setMessage("Invalid token");
				response.setCode(422);
				return res.status(401).json(response);
			}
		} else if (email) {
			const foundEmail = await db.User.findOne({ where: { email } });
			if (foundEmail) {
				sendPasswordResetToken({
					email,
					url: `${process.env.CLIENT_URL}/login/forgot`
				})
					.then(() => {
						response.setSuccess(true);
						response.setMessage("A reset code has been sent.");
						response.setCode(200);
						return res.json(response);
					})
					.catch(e => {
						console.log(e);
						response.setMessage("Unknown error.");
						response.setCode(500);
						return res.status(500).json(response);
					});
			} else {
				response.setMessage("Email is not registered.");
				response.setCode(404);
				return res.status(404).json(response);
			}
		}
	}
);

module.exports = router;
