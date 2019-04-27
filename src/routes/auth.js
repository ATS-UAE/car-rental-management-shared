const passport = require("passport");
const express = require("express");
const router = express.Router();
const moment = require("moment");

const { ResponseBuilder, get } = require("../utils");
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

// router.patch("/me", requireLogin, function(req, res) {
// 	let response = new ResponseBuilder();
// 	let me = db.findByPk(req.user.id);
// 	if (me) {
// 		me.update(req.body);
// 	}
// });

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
