import express, { Response } from "express";
import { ResponseBuilder } from "../utils";
import { Client } from "../datasource";
import db, { Location, Client as ClientModel } from "../models";
import requireLogin from "../middlewares/requireLogin";
import { Role, LocationAttributes } from "../../shared/typings";
import {
	ResourceNotFoundException,
	InvalidPermissionException
} from "../utils/exceptions";

const router = express.Router();

router.get("/", async ({ user }: any, res) => {
	const response = new ResponseBuilder();
	const ClientDataSource = new Client(db, user);

	try {
		const clients = await ClientDataSource.getAll();
		response.setData(clients);
		response.handleSuccess(`Found ${clients.length} accidents.`, res);
	} catch (e) {
		response.handleError(e, res);
	}

	res.json(response);
});

router.post("/", async ({ user, body }: any, res: Response) => {
	const response = new ResponseBuilder();
	const ClientDataSource = new Client(db, user);

	try {
		const createdClient = await ClientDataSource.create({
			...body,
			clientId: user.clientId
		});
		response.setData(createdClient);
		response.handleSuccess("Client has been created", res);
	} catch (e) {
		response.handleError(e, res);
	}

	res.json(response);
});

router.get("/:id", async ({ user, params }: any, res) => {
	const response = new ResponseBuilder();
	const ClientDataSource = new Client(db, user);

	try {
		const foundClient = await ClientDataSource.get(params.id);
		response.setData({
			...foundClient.get({ plain: true }),
			locations: (await foundClient.getLocations()).map(c => c.id)
		});
		response.handleSuccess(`Found accident with ID ${params.id}`, res);
	} catch (e) {
		response.handleError(e, res);
	}

	res.json(response);
});

router.patch("/:id", async ({ user, params, body }: any, res) => {
	const response = new ResponseBuilder();
	const ClientDataSource = new Client(db, user);

	try {
		const [previousValue, updatedValue] = await ClientDataSource.update(
			params.id,
			body
		);

		response.setData(updatedValue);
		response.handleSuccess(
			`Client with ID ${params.id} has been updated.`,
			res
		);
	} catch (e) {
		response.handleError(e, res);
	}

	res.json(response);
});

router.delete("/:id", async ({ user, params }: any, res) => {
	const response = new ResponseBuilder();
	const ClientDataSource = new Client(db, user);

	try {
	} catch (e) {
		await ClientDataSource.delete(params.id);
		response.handleSuccess(
			`Client with ID ${params.id} has been deleted.`,
			res
		);
	}

	res.json(response);
});

router.get<{ id: string }>(
	"/:id/locations",
	requireLogin,
	async ({ user, params }, res) => {
		const response = new ResponseBuilder<LocationAttributes[]>();

		// TODO: Abstraction of apis

		try {
			const foundClient = await ClientModel.findByPk(params.id);

			if (!foundClient) {
				throw new ResourceNotFoundException(
					`User with ID ${params.id} cannot be found.`
				);
			}
			if (user.role !== Role.MASTER && foundClient.id !== user.clientId) {
				throw new InvalidPermissionException();
			}

			const clientLocations = await Location.findAll({
				include: [
					{
						model: ClientModel,
						where: {
							id: foundClient.id
						}
					}
				]
			});

			response.setData(clientLocations);

			response.setSuccess(true);
			response.setMessage(`Found ${clientLocations.length} locations.`);
			response.setCode(200);
		} catch (e) {
			response.handleError(e, res);
		}
		res.json(response.toObject());
	}
);

export default router;
