const passport = require("passport");
const express = require("express");
const router = express.Router();

const requireLogin = require("../middlewares/requireLogin");

router.get("/me", requireLogin, function(req, res) {
	res.json(req.user.get({ plain: true }));
});

router.post("/login", passport.authenticate("local"), function(req, res) {
	res.redirect("/");
});

router.get("/logout", function(req, res) {
	req.logout();
	res.redirect("/");
});

module.exports = router;
