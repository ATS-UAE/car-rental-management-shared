import express from "express";
import { Wialon } from "node-wialon";
import RBAC from "../utils/rbac";
import db from "../models";
import { ResponseBuilder } from "../utils/helpers";

const router = express.Router();

router.get("/units", async (req, res) => {
	const response = new ResponseBuilder();

	try {
		const w = await Wialon.login({ token: process.env.WIALON_TOKEN });
		const units = await w.Utils.getUnits({ flags: 1025 });
		response.handleSuccess(`Found ${units.items.length} units.`, res);
		response.setData(units.items);
	} catch (e) {
		response.handleError(e, res);
	}

	res.json(response);
});

export default router;
