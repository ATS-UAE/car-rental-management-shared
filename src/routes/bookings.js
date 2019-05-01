const express = require("express");
const router = express.Router();

const requireLogin = require("../middlewares/requireLogin");
const { RBAC, OPERATIONS, resources } = require("../rbac/init");
const { CREATE, READ, UPDATE, DELETE } = OPERATIONS;
const db = require("../models");
const { errorCodes, ROLES } = require("../utils/variables");
const { ResponseBuilder, pickFields, toMySQLDate } = require("../utils");

router.use(requireLogin);

router.get("/", async ({ user }, res) => {
	let response = new ResponseBuilder();

	let bookings = await db.Booking.findAll({ include: [{ all: true }] });
	let userBookings = [];
	for (let booking of bookings) {
		let accessible = await RBAC.can(user.role.name, READ, resources.bookings, {
			booking,
			user
		});
		accessible && userBookings.push(booking);
	}

	let result = userBookings.map(booking => ({
		...booking.get({ plain: true })
	}));
	response.setSuccess(true);
	response.setCode(200);
	response.setMessage(`Found ${userBookings.length} bookings.`);
	response.setData(result);

	res.json(response);
});

router.post("/", async ({ user, body }, res) => {
	let response = new ResponseBuilder();
	let accessible = await RBAC.can(user.role.name, CREATE, resources.bookings);
	if (accessible) {
		try {
			let userId = user.role.name === ROLES.GUEST ? user.id : body.userId;
			let createdBooking = await db.Booking.create({
				...pickFields(["bookingTypeId", "vehicleId"], body),
				userId,
				to: toMySQLDate(body.to),
				from: toMySQLDate(body.from)
			});
			response.setData(createdBooking.get({ plain: true }));
			response.setMessage("Booking has been created.");
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

router.get("/:id", async ({ user, params }, res) => {
	let response = new ResponseBuilder();

	let booking = await db.Booking.findByPk(params.id, {
		include: [{ all: true }]
	});
	// Allow only on own bookings.
	let accessible = await RBAC.can(user.role.name, READ, resources.bookings, {
		booking,
		user
	});

	if (accessible) {
		response.setSuccess(true);
		response.setCode(200);
		response.setMessage(`Found booking with ID of ${booking.id}.`);
		response.setData(booking.get({ plain: true }));
	} else {
		response.setMessage(errorCodes.UNAUTHORIZED.message);
		response.setCode(errorCodes.UNAUTHORIZED.statusCode);
		res.status(errorCodes.UNAUTHORIZED.statusCode);
	}
	res.json(response);
});

router.patch("/:id", async ({ user, params, body }, res) => {
	let response = new ResponseBuilder();

	let booking = await db.Booking.findByPk(params.id, {
		include: [{ all: true }]
	});
	// Allow only on own bookings.
	let accessible = await RBAC.can(user.role.name, UPDATE, resources.bookings, {
		booking,
		user
	});
	if (accessible) {
		booking.update(body);
		response.setSuccess(true);
		response.setCode(200);
		response.setMessage(`Booking with ID of ${booking.id} has been updated.`);
		response.setData(booking.get({ plain: true }));
	} else {
		response.setMessage(errorCodes.UNAUTHORIZED.message);
		response.setCode(errorCodes.UNAUTHORIZED.statusCode);
		res.status(errorCodes.UNAUTHORIZED.statusCode);
	}
	res.json(response);
});

router.delete("/:id", async ({ user, params }, res) => {
	let response = new ResponseBuilder();

	let accessible = await accessControl.can(
		user.role.name,
		DELETE,
		resources.bookings
	);

	if (accessible) {
		let foundBooking = await db.Booking.findByPk(params.id);
		if (foundBooking) {
			await foundBooking.destroy();
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
