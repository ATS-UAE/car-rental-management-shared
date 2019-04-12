const express = require("express");
const router = express.Router();

const { ResponseBuilder, sendInviteToken } = require("../utils");
const requireLogin = require("../middlewares/requireLogin");
const disallowGuests = require("../middlewares/disallowGuests");
router.use(requireLogin);
router.use(disallowGuests);

// Send an invite to an email
router.post("/", async ({ body }, res) => {
	let response = new ResponseBuilder();

	// Check if email is provided.
	if (body.email) {
		// Send email invite
		try {
			await sendInviteToken(body);
			response.setCode(200);
			response.setSuccess(true);
			response.setMessage(`Invite has been sent to ${body.email}`);
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
