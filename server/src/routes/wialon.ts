import express from "express";
import { Wialon } from "node-wialon";
import { ResponseBuilder } from "../utils";
import { ItemNotFoundException } from "../api/exceptions";

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

router.get("/units/:id", async (req, res) => {
	const response = new ResponseBuilder();

	try {
		const w = await Wialon.login({ token: process.env.WIALON_TOKEN });
		const units = await w.Utils.getUnits({ flags: 1025 });
		const unit = units.items.find(unit => unit.id === req.query.id);
		if (unit) {
			response.handleSuccess(`Found ${units.items.length} units.`, res);
			response.setData(units.items);
		} else {
			response.setCode(404);
			throw new ItemNotFoundException(
				`Unit with ID ${req.query.id} is not found.`
			);
		}
	} catch (e) {
		response.handleError(e, res);
	}

	res.json(response);
});

export default router;
