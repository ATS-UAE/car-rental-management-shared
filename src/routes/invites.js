const express = require("express");
const router = express.Router();

const { ResponseBuilder } = require("../utils");
const { sendInvite } = require("../mail/utils");
const requireLogin = require("../middlewares/requireLogin");
const disallowGuests = require("../middlewares/disallowGuests");
const { db } = require("../models");

router.use(requireLogin);
router.use(disallowGuests);

//TODO: check if email already exists in DB.
// Send an invite to an email
router.post("/", async ({ body }, res) => {
	let response = new ResponseBuilder();

	// Check if email is provided.
	if (body.email) {
		// Send email invite
		try {
			let existingEmail = await db.User.find({ email: body.email });
			if (existingEmail) {
				await sendInvite({ email: body.email });
				response.setCode(200);
				response.setSuccess(true);
				response.setMessage(`Invite has been sent to ${body.email}`);
			} else {
				response.setCode(422);
				response.setSuccess(true);
				response.setMessage(`Email address has already been used.`);
			}
		} catch (e) {
			response.appendError(e.message || "Cannot send invite.");
			res.status(500);
			response.setCode(500);
			response.setSuccess(false);
		}
	} else {
		response.setMessage("Please provide an email address.");
		response.setCode(422);
	}

	res.json(response);
});
module.exports = router;
