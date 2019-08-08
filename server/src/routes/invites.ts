import express from "express";

import { ResponseBuilder } from "../utils/helpers";
import { sendInvite } from "../utils/mail";
import requireLogin from "../middlewares/requireLogin";
import disallowGuests from "../middlewares/disallowGuests";
import db from "../models";

const router = express.Router();
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
			let existingEmail = await db.User.findOne({
				where: { email: body.email }
			});
			if (!existingEmail) {
				await sendInvite({ email: body.email });
				response.handleSuccess(res, `Invite has been sent to ${body.email}`);
			} else {
				throw new Error("Email is already registered.");
			}
		} catch (e) {
			response.handleError(e, res);
		}
	} else {
		response.setMessage("Please provide an email address.");
		response.setCode(422);
	}

	res.json(response);
});

export default router;