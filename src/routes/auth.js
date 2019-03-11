const passport = require("passport");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

const { ResponseBuilder } = require("../utils");
const requireLogin = require("../middlewares/requireLogin");
const db = require("../models");

router.get("/me", requireLogin, function(req, res) {
	let response = new ResponseBuilder();
	response.setData(req.user);
	response.setSuccess(true);
	response.setCode(200);
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
