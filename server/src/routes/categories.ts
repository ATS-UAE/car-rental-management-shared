import express from "express";

import db from "../models";
import { ResponseBuilder } from "../utils/";
import requireLogin from "../middlewares/requireLogin";

const router = express.Router();

router.get("/", requireLogin, async (req, res) => {
	let response = new ResponseBuilder();
	const categories = await db.Category.findAll();
	response.setData(categories);
	response.setSuccess(true);
	response.setCode(200);
	response.setMessage(null);
	res.json(response);
});

router.post("/", requireLogin, async ({ body }, res) => {
	let response = new ResponseBuilder();
	const created = await db.Category.create({ name: body.name });
	response.setData(created);
	response.setSuccess(true);
	response.setCode(200);
	response.setMessage(null);
	res.json(response);
});

router.patch("/:id", requireLogin, async ({ params, body }, res) => {
	let response = new ResponseBuilder();
	const found = await db.Category.findByPk(params.id);
	found && found.update({ name: body.name });
	response.setData(found);
	response.setSuccess(true);
	response.setCode(200);
	response.setMessage(null);
	res.json(response);
});

router.delete("/:id", requireLogin, async ({ params }, res) => {
	let response = new ResponseBuilder();
	const found = await db.Category.findByPk(params.id);
	found && (await found.destroy());
	response.setData(found);
	response.setSuccess(true);
	response.setCode(200);
	response.setMessage(null);
	res.json(response);
});

export default router;
