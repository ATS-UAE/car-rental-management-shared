import express from "express";
import { ResponseBuilder } from "../utils/helpers";
import { Client } from "../datasource";
import db from "../models";

const router = express.Router();

router.get("/", async ({ user }, res) => {
	const response = new ResponseBuilder();
	const ClientDataSource = new Client(db, user);

	try {
		const clients = await ClientDataSource.getAll();
		response.setData(clients);
		response.handleSuccess(res, `Found ${clients.length} accidents.`);
	} catch (e) {
		response.handleError(e, res);
	}

	res.json(response);
});

router.post("/", async ({ user, body }, res) => {
	const response = new ResponseBuilder();
	const ClientDataSource = new Client(db, user);

	try {
		const createdClient = await ClientDataSource.create(body);
		response.setData(createdClient);
		response.handleSuccess(res, "Client has been created");
	} catch (e) {
		response.handleError(e, res);
	}

	res.json(response);
});

router.get("/:id", async ({ user, params }, res) => {
	const response = new ResponseBuilder();
	const ClientDataSource = new Client(db, user);

	try {
		const foundClient = await ClientDataSource.get(params.id);
		response.setData({
			...foundClient.get({ plain: true }),
			locations: (await foundClient.getLocations()).map(c => c.id)
		});
		response.handleSuccess(res, `Found accident with ID ${params.id}`);
	} catch (e) {
		response.handleError(e, res);
	}

	res.json(response);
});

router.patch("/:id", async ({ user, params, body }, res) => {
	const response = new ResponseBuilder();
	const ClientDataSource = new Client(db, user);

	try {
		const [previousValue, updatedValue] = await ClientDataSource.update(
			params.id,
			body
		);
		response.setData(updatedValue);
		response.handleSuccess(
			res,
			`Client with ID ${params.id} has been updated.`
		);
	} catch (e) {
		response.handleError(e, res);
	}

	res.json(response);
});

router.delete("/:id", async ({ user, params }, res) => {
	const response = new ResponseBuilder();
	const ClientDataSource = new Client(db, user);

	try {
	} catch (e) {
		await ClientDataSource.delete(params.id);
		response.handleSuccess(
			res,
			`Client with ID ${params.id} has been deleted.`
		);
	}

	res.json(response);
});

export default router;
