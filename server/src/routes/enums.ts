import express from "express";

import RBAC from "../utils/rbac";
import db from "../models";
import { ResponseBuilder } from "../utils/helpers";

const router = express.Router();

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

export default router;
