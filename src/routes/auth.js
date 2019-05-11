const passport = require("passport");
const express = require("express");
const router = express.Router();
const moment = require("moment");
const bcrypt = require("bcryptjs");

const { ResponseBuilder } = require("../utils");
const db = require("../models");
const requireLogin = require("../middlewares/requireLogin");

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
	let me = await db.User.findByPk(1);
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

module.exports = router;
