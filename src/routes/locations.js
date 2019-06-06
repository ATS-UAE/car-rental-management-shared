const express = require("express");
const router = express.Router();

const requireLogin = require("../middlewares/requireLogin");
const disallowGuests = require("../middlewares/disallowGuests");
const parseBody = require("../middlewares/parseBody");
const deleteFileOnError = require("../middlewares/deleteFileOnError");
const { deleteReplacedFiles } = require("../middlewares/deleteReplacedFiles");
const upload = require("../middlewares/multerUpload");

const { RBAC, OPERATIONS, resources } = require("../rbac/init");
const { CREATE, READ, UPDATE, DELETE } = OPERATIONS;
const db = require("../models");
const { errorCodes } = require("../utils/variables");
const { ResponseBuilder } = require("../utils");

router.use(requireLogin);

router.get("/", async ({ user }, res) => {
	let response = new ResponseBuilder();
	let accessible = await RBAC.can(user.role.name, READ, resources.locations);
	if (accessible) {
		let locations = await db.Location.findAll({ include: [{ all: true }] });
		response.setData(locations);
		response.setCode(200);
		response.setMessage(`Found ${locations.length} locations.`);
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
	upload("carbooking/media/locations").single("locationImageSrc"),
	parseBody,
	disallowGuests,
	async ({ user, body }, res) => {
		let response = new ResponseBuilder();
		let accessible = await RBAC.can(
			user.role.name,
			CREATE,
			resources.locations
		);
		if (accessible) {
			try {
				let createdLocation = await db.Location.create(body);
				response.setData(createdLocation);
				response.setMessage("Location has been created.");
				response.setCode(200);
				response.setSuccess(true);
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
	},
	deleteFileOnError
);

router.get("/:id", async ({ user }, res) => {
	let response = new ResponseBuilder();
	let accessible = await RBAC.can(user.role.name, READ, resources.locations);
	if (accessible) {
		try {
			let foundLocation = await db.Location.findByPk(req.params.id);
			if (foundLocation) {
				response.setData(foundLocation);
				response.setCode(200);
				response.setMessage(`Location with ID ${req.params.id} found.`);
				response.setSuccess(true);
			} else {
				res.status(404);
				response.setCode(404);
				response.setMessage(`Location with ID ${req.params.id} not found.`);
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
	upload("carbooking/media/locations").single("locationImageSrc"),
	parseBody,
	disallowGuests,
	async (req, res) => {
		const { user, params, body } = req;
		let response = new ResponseBuilder();

		let accessible = await RBAC.can(
			user.role.name,
			UPDATE,
			resources.locations
		);
		if (accessible) {
			let foundLocation = await db.Location.findByPk(params.id);
			if (foundLocation) {
				try {
					req.beforeUpdate = foundLocation;
					let updatedLocation = await foundLocation.update(body);
					response.setData(updatedLocation);
					response.setCode(200);
					response.setMessage(`Location with ID ${params.id} updated.`);
					response.setSuccess(true);
				} catch (e) {
					response.setMessage(e.message);
					response.setCode(422);
					res.status(422);
					if (e.errors && e.errors.length > 0) {
						e.errors.forEach(error => response.appendError(error.path));
					}
				}
			} else {
				res.status(404);
				response.setCode(404);
				response.setMessage(`Location with ID ${params.id} not found.`);
			}
		} else {
			response.setMessage(errorCodes.UNAUTHORIZED.message);
			response.setCode(errorCodes.UNAUTHORIZED.statusCode);
			res.status(errorCodes.UNAUTHORIZED.statusCode);
		}

		res.json(response);
	},

	deleteFileOnError,
	deleteReplacedFiles
);

router.delete("/:id", disallowGuests, async ({ user, params }, res) => {
	let response = new ResponseBuilder();

	let accessible = await RBAC.can(user.role.name, DELETE, resources.locations);

	if (accessible) {
		let foundLocation = await db.Location.findByPk(params.id);
		if (foundLocation) {
			await foundLocation.destroy();
			response.setCode(200);
			response.setSuccess(true);
			response.setMessage(`Location with ID ${params.id} has been deleted.`);
		} else {
			response.setCode(404);
			response.setMessage(`Location with ID ${params.id} is not found.`);
		}
	} else {
		response.setMessage(errorCodes.UNAUTHORIZED.message);
		response.setCode(errorCodes.UNAUTHORIZED.statusCode);
		res.status(errorCodes.UNAUTHORIZED.statusCode);
	}
	res.json(response);
});

module.exports = router;
