import express from "express";

import requireLogin from "../middlewares/requireLogin";
import {
	deleteReplacedFiles,
	addReplacedFiles
} from "../middlewares/deleteReplacedFiles";
import disallowGuests from "../middlewares/disallowGuests";
import parseBody from "../middlewares/parseBody";
import upload from "../middlewares/multerUpload";
import deleteFileOnError from "../middlewares/deleteFileOnError";
import db from "../models";
import { ResponseBuilder, getFileURL } from "../utils/helpers";
import { Vehicle } from "../datasource";

const router = express.Router();
router.use(requireLogin);

router.get("/", async ({ user }, res) => {
	const response = new ResponseBuilder();
	const VehicleDataSource = new Vehicle(db, user);

	try {
		let vehicles = await VehicleDataSource.getAll();
		response.setData(vehicles);
		response.handleSuccess(`Found ${vehicles.length} vehicles.`, res);
	} catch (e) {
		response.handleError(e, res);
	}

	res.json(response);
});

router.post(
	"/",
	upload("carbooking/media/vehicles").single("vehicleImageSrc"),
	parseBody,
	disallowGuests,
	async ({ user, body, file }, res, next) => {
		const fileLocation =
			file &&
			file.filename &&
			getFileURL("carbooking/media/vehicles", file.filename);
		let response = new ResponseBuilder();
		const VehicleDataSource = new Vehicle(db, user);

		try {
			let createdVehicle = await VehicleDataSource.create({
				...body,
				vehicleImageSrc: fileLocation
			});

			if (body.categories) {
				let categories = await db.Category.findAll({
					where: { id: body.categories }
				});
				await createdVehicle.setCategories(categories);
			}
			response.setData({
				...createdVehicle.get({ plain: true }),
				categories: await createdVehicle.getCategories().map(c => c.id)
			});
			response.handleSuccess("Vehicle has been created.", res);
		} catch (e) {
			response.handleError(e, res);
		}

		res.json(response);
		next();
	},
	deleteFileOnError
);

router.get("/:id", async ({ user, params }, res) => {
	let response = new ResponseBuilder();
	const VehicleDataSource = new Vehicle(db, user);

	try {
		let foundVehicle = await VehicleDataSource.get(params.id);

		response.setData({
			...foundVehicle.get({ plain: true }),
			categories: (await foundVehicle.getCategories()).map(c => c.id)
		});
		response.handleSuccess(`Vehicle with ID ${params.id} found.`, res);
	} catch (e) {
		response.handleError(e, res);
	}

	res.json(response);
});

router.patch(
	"/:id",
	upload("carbooking/media/vehicles").single("vehicleImageSrc"),
	parseBody,
	disallowGuests,
	async (req, res, next) => {
		const { user, params, body, file } = req;
		const fileLocation =
			file &&
			file.filename &&
			getFileURL("carbooking/media/vehicles", file.filename);
		let response = new ResponseBuilder();
		const VehicleDataSource = new Vehicle(db, user);

		try {
			let updatedVehicle = await VehicleDataSource.update(params.id, {
				...body,
				vehicleImageSrc: fileLocation
			});

			fileLocation &&
				addReplacedFiles(res, {
					url: updatedVehicle.vehicleImageSrc,
					model: db.Vehicle,
					field: "vehicleImageSrc"
				});
			if (body.categories) {
				let categories = await db.Category.findAll({
					where: { id: body.categories }
				});
				await updatedVehicle.setCategories(categories);
			}

			response.setData({
				...updatedVehicle.get({ plain: true }),
				categories: (await updatedVehicle.getCategories()).map(c => c.id)
			});
			response.handleSuccess(`Vehicle with ID ${params.id} updated.`, res);
		} catch (e) {
			response.handleError(e, res);
		}

		res.json(response);
		next();
	},
	deleteFileOnError,
	deleteReplacedFiles
);

router.delete(
	"/:id",
	disallowGuests,
	async ({ user, params }, res, next) => {
		let response = new ResponseBuilder();

		const VehicleDataSource = new Vehicle(db, user);
		try {
			const deletedVehicle = await VehicleDataSource.delete(params.id);
			addReplacedFiles(res, {
				url: deletedVehicle.vehicleImageSrc,
				model: db.Vehicle,
				field: "vehicleImageSrc"
			});
			response.setData(deletedVehicle.get({ plain: true }));
			response.handleSuccess(
				`Vehicle with ID ${params.id} has been deleted.`,
				res
			);
		} catch (e) {
			response.handleError(e, res);
		}

		res.json(response);
		next();
	},
	deleteReplacedFiles
);

export default router;
