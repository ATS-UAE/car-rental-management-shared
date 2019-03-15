const express = require("express");
const router = express.Router();

const requireLogin = require("../middlewares/requireLogin");
const { RESOURCES, accessControl, op } = require("../rbac/init");
const { READ } = op;
const db = require("../models");
const { errorCodes } = require("../utils/variables");
const { ResponseBuilder } = require("../utils");

router.use(requireLogin);

router.get("/", async ({ user }, res) => {
	let response = new ResponseBuilder();
	let accessible = await accessControl.can(
		user.role.name,
		`${RESOURCES.ENUMS}:${READ}`
	);
	if (accessible) {
		let roles = await db.Role.findAll();
		let bookingTypes = await db.BookingType.findAll();
		let bookingStatus = await db.BookingStatus.findAll();

		roles = roles.map(({ id, name }) => ({
			id,
			name
		}));

		bookingTypes = bookingTypes.map(({ id, name }) => ({
			id,
			name
		}));

		bookingStatus = bookingStatus.map(({ id, name }) => ({
			id,
			name
		}));

		response.setData({ roles, bookingTypes, bookingStatus });
		response.setSuccess(true);
		response.setCode(200);
		response.setMessage(`Found ${roles.length} roles.`);
	} else {
		response.setCode(errorCodes.UNAUTHORIZED.statusCode);
		response.setMessage(errorCodes.UNAUTHORIZED.message);
		response.setSuccess(false);
		res.status(errorCodes.UNAUTHORIZED.statusCode);
	}
	res.json(response);
});

module.exports = router;
