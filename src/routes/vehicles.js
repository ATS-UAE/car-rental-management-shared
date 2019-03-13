const express = require("express");
const router = express.Router();

const requireLogin = require("../middlewares/requireLogin");
const disallowGuests = require("../middlewares/disallowGuests");
const { RESOURCES, accessControl, op } = require("../rbac/init");
const { CREATE, READ, UPDATE, DELETE } = op;
const db = require("../models");
const { errorCodes } = require("../utils/variables");
const { ResponseBuilder, pickFields } = require("../utils");

router.use(requireLogin);

// TODO: Only return available vehicles.
router.get("/available", async ({ user }, res) => {
	let response = new ResponseBuilder();
	let accessible = await accessControl.can(
		user.role.name,
		`${RESOURCES.VEHICLES}:${READ}`
	);
	if (accessible) {
		let availableVehicles = await db.Vehicle.findAll({
			include: [
				{
					all: true
				}
			]
		});
		response.setData(availableVehicles);
		response.setCode(200);
		response.setMessage(
			`Found ${availableVehicles.length} available vehicles.`
		);
		response.setSuccess(true);
	} else {
		response.setCode(errorCodes.UNAUTHORIZED.statusCode);
		response.setMessage(errorCodes.UNAUTHORIZED.message);
		res.status(errorCodes.UNAUTHORIZED.statusCode);
	}
	res.json(response);
});

router.get("/available/:id", async ({ user, params }, res) => {
	let response = new ResponseBuilder();
	let accessible = await accessControl.can(
		user.role.name,
		`${RESOURCES.VEHICLES}:${READ}`
	);
	if (accessible) {
		let availableVehicle = await db.Vehicle.findByPk(params.id, {
			include: [
				{
					all: true
				}
			]
		});
		response.setData(availableVehicle.get({ plain: true }));
		response.setCode(200);
		response.setMessage(`Found ${availableVehicle.length} available vehicles.`);
		response.setSuccess(true);
	} else {
		response.setCode(errorCodes.UNAUTHORIZED.statusCode);
		response.setMessage(errorCodes.UNAUTHORIZED.message);
		res.status(errorCodes.UNAUTHORIZED.statusCode);
	}
	res.json(response);
});

router.get("/", async ({ user }, res) => {
	let response = new ResponseBuilder();
	let accessible = await accessControl.can(
		user.role.name,
		`${RESOURCES.VEHICLES}:${READ}`
	);
	if (accessible) {
		let vehicles = await db.Vehicle.findAll();
		let result = vehicles.map(vehicle => ({
			...vehicles.get({ plain: true }),
			role: pickFields(["id", "name"], vehicle.get({ plain: true }).role)
		}));
		response.setSuccess(true);
		response.setCode(200);
		response.setMessage(`Found ${vehicles.length} vehicles.`);
		response.setData(result);
	} else {
		response.setCode(errorCodes.UNAUTHORIZED.statusCode);
		response.setMessage(errorCodes.UNAUTHORIZED.message);
		response.setSuccess(false);
		res.status(errorCodes.UNAUTHORIZED.statusCode);
	}

	res.json(response);
});

router.post("/", disallowGuests, async ({ user, body }, res) => {
	let response = new ResponseBuilder();
	let accessible = await accessControl.can(
		user.role.name,
		`${RESOURCES.VEHICLES}:${CREATE}`
	);
	if (accessible) {
		try {
			let createdVehicle = await db.Vehicle.create(body);

			response.setData(createdVehicle);
			response.setMessage("Vehicle has been created.");
			response.setCode(200);
			response.setSuccess(true);
		} catch (e) {
			response.setMessage(e.message);
			response.setCode(422);
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
});

router.get("/:id", disallowGuests, async ({ user }, res) => {
	let response = new ResponseBuilder();
	let accessible = await accessControl.can(
		user.role.name,
		`${RESOURCES.VEHICLES}:${READ}`
	);
	if (accessible) {
		try {
			let foundVehicle = await db.Vehicle.findByPk(req.params.id);
			if (foundVehicle) {
				response.setData(foundVehicle);
				response.setCode(200);
				response.setMessage(`Vehicle with ID ${req.params.id} found.`);
				response.setSuccess(true);
			} else {
				res.status(404);
				response.setCode(404);
				response.setMessage(`Vehicle with ID ${req.params.id} not found.`);
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

router.patch("/:id", disallowGuests, async ({ user, params, body }, res) => {
	let response = new ResponseBuilder();

	let accessible = await accessControl.can(
		user.role.name,
		`${RESOURCES.VEHICLES}:${UPDATE}`
	);
	if (accessible) {
		let foundVehicle = await db.Vehicle.findByPk(params.id, {
			include: [{ model: db.Role, as: "role" }]
		});
		if (foundVehicle) {
			try {
				let updatedVehicle = await foundVehicle.update(body);
				response.setData(updatedVehicle);
				response.setCode(200);
				response.setMessage(`Vehicle with ID ${req.params.id} updated.`);
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
			response.setMessage(`Vehicle with ID ${req.params.id} not found.`);
		}
	} else {
		response.setMessage(errorCodes.UNAUTHORIZED.message);
		response.setCode(errorCodes.UNAUTHORIZED.statusCode);
		res.status(errorCodes.UNAUTHORIZED.statusCode);
	}

	res.json(response);
});

router.delete("/:id", disallowGuests, async ({ user, params }, res) => {
	let response = new ResponseBuilder();

	let accessible = await accessControl.can(
		user.role.name,
		`${RESOURCES.USERS}:${DELETE}`
	);

	if (accessible) {
		let foundVehicle = await db.Vehicle.findByPk(params.id);
		if (foundVehicle) {
			await foundVehicle.destroy();
			response.setCode(200);
			response.setSuccess(true);
			response.setMessage(`User with ID ${params.id} has been deleted.`);
		} else {
			response.setCode(404);
			response.setMessage(`User with ID ${params.id} is not found.`);
		}
	} else {
		response.setMessage(errorCodes.UNAUTHORIZED.message);
		response.setCode(errorCodes.UNAUTHORIZED.statusCode);
		res.status(errorCodes.UNAUTHORIZED.statusCode);
	}
	res.json(response);
});

module.exports = router;
