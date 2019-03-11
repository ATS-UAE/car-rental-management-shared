const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

const { ResponseBuilder } = require("../utils");
const requireLogin = require("../middlewares/requireLogin");
const disallowGuests = require("../middlewares/disallowGuests");
const db = require("../models");
const config = require("../config");

// Resend new invite token
router.post("/", requireLogin, disallowGuests, async (req, res) => {
	let response = new ResponseBuilder();
	let userId = req.body.id;
	let user = await db.User.findByPk(userId);
	if (user) {
		if (!user.getDataValue("approved")) {
			// Send email invite
			try {
				await sendInviteToken(
					createdUser.getDataValue("id"),
					createdUser.getDataValue("email")
				);
			} catch (e) {
				response.setMessage(e.message || "Cannot send invite.");
				res.status(500);
			}
		} else {
			response.setMessage("User is already approved");
			response.setCode(200);
			response.setSuccess(true);
		}
	}
	res.json(response);
});

// Consume token
router.get("/:token", async (req, res) => {
	let response = new ResponseBuilder();
	try {
		let tokenData = jwt.verify(req.params.token, config.secretKey);
		let user = await db.User.findByPk(tokenData.id);
		if (user) {
			if (!user.getDataValue("approved")) {
				user.update({ approved: true });
				response.setMessage("User has been approved");
			} else {
				response.setMessage("User is already approved");
			}
			response.setCode(200);
			response.setSuccess(true);
		} else {
			response.setCode(422);
			response.setMessage("User ID does not exist.");
		}
	} catch (e) {
		response.setMessage("Token is invalid or expired.");
		response.setCode(422);
	}
	res.json(response);
});

module.exports = router;
