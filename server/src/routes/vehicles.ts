import express from "express";
import { Wialon } from "node-wialon";

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

router.get("/", async ({ user }: any, res) => {
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

router.get("/:id", async ({ user, params }: any, res) => {
	let response = new ResponseBuilder();
	const VehicleDataSource = new Vehicle(db, user);
	try {
		const foundVehicle = await VehicleDataSource.get(params.id);
		const foundVehiclePlain = {
			...foundVehicle.get({ plain: true }),
			position: null,
			mileage: null,
			categories: (await foundVehicle.getCategories()).map(c => c.id)
		};
		if (foundVehicle.wialonUnitId) {
			try {
				let w = await Wialon.login({
					token: process.env.WIALON_TOKEN
				});
				const unit = await w.Core.searchItem({
					id: foundVehiclePlain.wialonUnitId,
					flags: 1024 + 8192
				});
				const lng = unit.item.pos.x;
				const lat = unit.item.pos.y;
				const mileage = unit.item.cnm;
				foundVehiclePlain.position = lat && lng ? { lat, lng } : null;
				foundVehiclePlain.mileage = mileage || null;
			} catch (e) {
				console.error(e);
			}
		}
		response.setData(foundVehiclePlain);
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
	async ({ user, params }: any, res, next) => {
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
