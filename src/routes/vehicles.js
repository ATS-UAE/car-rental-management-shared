const express = require("express");
const router = express.Router();

const requireLogin = require("../middlewares/requireLogin");
const {
	deleteReplacedFiles,
	addReplacedFiles
} = require("../middlewares/deleteReplacedFiles");
const disallowGuests = require("../middlewares/disallowGuests");
const parseBody = require("../middlewares/parseBody");
const upload = require("../middlewares/multerUpload");
const deleteFileOnError = require("../middlewares/deleteFileOnError");
const { RBAC, OPERATIONS, resources } = require("../rbac/init");
const { CREATE, READ, UPDATE, DELETE } = OPERATIONS;
const db = require("../models");
const { errorCodes } = require("../utils/variables");
const { ResponseBuilder, getFileURL } = require("../utils");

router.use(requireLogin);

router.get("/", async ({ user }, res) => {
	let response = new ResponseBuilder();
	let accessible = await RBAC.can(user.role.name, READ, resources.vehicles);
	if (accessible) {
		let results = [];
		let vehicles = await db.Vehicle.findAll({ include: [{ all: true }] });
		for (let i = 0; i < vehicles.length; i++) {
			let vehicle = vehicles[i];
			let vehicleBookings = await db.Booking.findAll({
				where: { vehicleId: vehicle.id }
			});
			results.push({
				...vehicle.get({ plain: true }),
				bookings: vehicleBookings
			});
		}
		response.setData(results);
		response.setCode(200);
		response.setMessage(`Found ${results.length} vehicles with bookings.`);
		response.setSuccess(true);
		res.status(200);
	} else {
		response.setCode(errorCodes.UNAUTHORIZED.statusCode);
		response.setMessage(errorCodes.UNAUTHORIZED.message);
		response.setSuccess(false);
		res.status(errorCodes.UNAUTHORIZED.statusCode);
	}

	res.json(response);
});

router.post(
	"/",
	upload("carbooking/media/vehicles").single("vehicleImageSrc"),
	parseBody,
	disallowGuests,
	async ({ user, body, file = {} }, res, next) => {
		const { location: fileLocation = null } = file;
		let response = new ResponseBuilder();
		let accessible = await RBAC.can(user.role.name, CREATE, resources.vehicles);
		if (accessible) {
			try {
				let createdVehicle = await db.Vehicle.create({
					...body,
					vehicleImageSrc: fileLocation
				});

				response.setData(createdVehicle);
				response.setMessage("Vehicle has been created.");
				response.setCode(200);
				response.setSuccess(true);
				res.status(200);
			} catch (e) {
				response.setMessage(e.message);
				response.setCode(422);
				res.status(422);
				if (e.errors && e.errors.length > 0) {
					e.errors.forEach(error => response.appendError(error.path));
				}
			}
		} else {
			response.setMessage(errorCodes.UNAUTHORIZED.message);
			response.setCode(errorCodes.UNAUTHORIZED.statusCode);
			res.status(errorCodes.UNAUTHORIZED.statusCode);
		}

		res.json(response);
		next();
	},
	deleteFileOnError
);

router.get("/:id", async ({ user, params }, res) => {
	let response = new ResponseBuilder();
	let accessible = await RBAC.can(user.role.name, READ, resources.vehicles);
	if (accessible) {
		try {
			let foundVehicle = await db.Vehicle.findByPk(params.id);
			if (foundVehicle) {
				response.setData(foundVehicle);
				response.setCode(200);
				response.setMessage(`Vehicle with ID ${params.id} found.`);
				response.setSuccess(true);
			} else {
				res.status(404);
				response.setCode(404);
				response.setMessage(`Vehicle with ID ${params.id} not found.`);
			}
		} catch (e) {
			res.status(errorCodes.UNAUTHORIZED.statusCode);
			response.setCode(errorCodes.UNAUTHORIZED.statusCode);
			response.setMessage(errorCodes.UNAUTHORIZED.message);
		}
	} else {
		response.setMessage(errorCodes.UNAUTHORIZED.message);
		response.setCode(errorCodes.UNAUTHORIZED.statusCode);
		res.status(errorCodes.UNAUTHORIZED.statusCode);
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

		let accessible = await RBAC.can(user.role.name, UPDATE, resources.vehicles);
		if (accessible) {
			let foundVehicle = await db.Vehicle.findByPk(params.id, {
				include: [{ all: true }]
			});
			if (foundVehicle) {
				try {
					fileLocation &&
						addReplacedFiles(res, {
							url: foundVehicle.vehicleImageSrc,
							model: db.Vehicle,
							field: "vehicleImageSrc"
						});
					let updatedVehicle = await foundVehicle.update({
						...body,
						vehicleImageSrc: fileLocation || foundVehicle.vehicleImageSrc
					});
					response.setData(updatedVehicle);
					response.setCode(200);
					response.setMessage(`Vehicle with ID ${params.id} updated.`);
					response.setSuccess(true);
				} catch (e) {
					response.setMessage(e.message);
					response.setCode(422);
					if (e.errors && e.errors.length > 0) {
						e.errors.forEach(error => response.appendError(error.path));
					}
				}
			} else {
				res.status(404);
				response.setCode(404);
				response.setMessage(`Vehicle with ID ${params.id} not found.`);
			}
		} else {
			response.setMessage(errorCodes.UNAUTHORIZED.message);
			response.setCode(errorCodes.UNAUTHORIZED.statusCode);
			res.status(errorCodes.UNAUTHORIZED.statusCode);
		}

		res.json(response);
		next();
	},
	deleteFileOnError,
	deleteReplacedFiles
);

router.delete("/:id", disallowGuests, async ({ user, params }, res) => {
	let response = new ResponseBuilder();

	let accessible = await RBAC.can(user.role.name, DELETE, resources.vehicles);

	if (accessible) {
		let foundVehicle = await db.Vehicle.findByPk(params.id);
		if (foundVehicle) {
			addReplacedFiles(res, {
				url: foundVehicle.vehicleImageSrc,
				model: db.Vehicle,
				field: "vehicleImageSrc"
			});
			await foundVehicle.destroy();
			response.setCode(200);
			response.setSuccess(true);
			response.setMessage(`Vehicle with ID ${params.id} has been deleted.`);
		} else {
			response.setCode(404);
			response.setMessage(`Vehicle with ID ${params.id} is not found.`);
		}
	} else {
		response.setMessage(errorCodes.UNAUTHORIZED.message);
		response.setCode(errorCodes.UNAUTHORIZED.statusCode);
		res.status(errorCodes.UNAUTHORIZED.statusCode);
	}
	res.json(response);
});

module.exports = router;
