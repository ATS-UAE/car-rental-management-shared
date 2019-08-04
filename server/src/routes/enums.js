const express = require("express");
const router = express.Router();
const { RBAC } = require("../rbac/init");
const db = require("../models");
const { ResponseBuilder } = require("../utils/helpers");

router.get("/", async (req, res) => {
	let response = new ResponseBuilder();

	let roles = await db.Role.findAll();
	let bookingTypes = await db.BookingType.findAll();

	roles = roles.map(({ id, name }) => ({
		id,
		name
	}));

	bookingTypes = bookingTypes.map(({ id, name }) => ({
		id,
		name
	}));

	response.setData({ roles, bookingTypes, permissions: RBAC.toObject() });
	response.setSuccess(true);
	response.setCode(200);
	response.setMessage("Successfully found data.");

	res.json(response);
});

module.exports = router;
