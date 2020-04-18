import express from "express";
import { Wialon } from "node-wialon";
import { ResponseBuilder } from "../utils";
import { ResourceNotFoundException } from "../api/exceptions";

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

router.get<{ id: string }>("/units/:id", async (req, res) => {
	const response = new ResponseBuilder();

	try {
		const w = await Wialon.login({ token: process.env.WIALON_TOKEN });
		const unit = await w.Core.searchItem({
			id: parseInt(req.params.id),
			flags: 1025
		});
		if (unit) {
			response.handleSuccess(`Found unit with ID ${req.params.id}`, res);
			response.setData(unit.item);
		} else {
			response.setCode(404);
			throw new ResourceNotFoundException(
				`Unit with ID ${req.query.id} is not found.`
			);
		}
	} catch (e) {
		response.handleError(e, res);
	}

	res.json(response);
});

export default router;
