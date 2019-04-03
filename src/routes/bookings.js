const express = require("express");
const router = express.Router();

const requireLogin = require("../middlewares/requireLogin");
const { RESOURCES, accessControl, op } = require("../rbac/init");
const { CREATE, READ, UPDATE, DELETE } = op;
const db = require("../models");
const { errorCodes, BOOKING_STATUS } = require("../utils/variables");
const { ResponseBuilder, pickFields, toMySQLDate } = require("../utils");

router.use(requireLogin);

// Get all finalized bookings

router.get("/", async ({ user }, res) => {
	let response = new ResponseBuilder();

	let bookings = await db.Booking.findAll();
	let userBookings = [];
	for (let booking of bookings) {
		// Get own bookings.
		let accessible = await accessControl.can(
			user.role.name,
			`${RESOURCES.BOOKINGS}:${READ}`,
			{
				booking,
				user
			}
		);
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

router.get("/", async ({ user }, res) => {
	let response = new ResponseBuilder();

	let bookings = await db.Booking.findAll();
	let userBookings = [];
	for (let booking of bookings) {
		// Get own bookings.
		let accessible = await accessControl.can(
			user.role.name,
			`${RESOURCES.BOOKINGS}:${READ}`,
			{
				booking,
				user
			}
		);
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
	let accessible = await accessControl.can(
		user.role.name,
		`${RESOURCES.BOOKINGS}:${CREATE}`
	);
	if (accessible) {
		try {
			let pendingBookingStatus = await db.BookingStatus.find({
				where: { name: BOOKING_STATUS.PENDING }
			});
			let createdBooking = await db.Booking.create({
				...pickFields(["bookingType", "vehicleId"], body),
				bookingStatus: pendingBookingStatus.id,
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

	let booking = await db.Booking.findByPk(params.id);
	// Allow only on own bookings.
	let accessible = await accessControl.can(
		user.role.name,
		`${RESOURCES.BOOKINGS}:${READ}`,
		{
			booking,
			user
		}
	);

	if (accessible) {
		response.setSuccess(true);
		response.setCode(200);
		response.setMessage(`Found ${userBookings.length} bookings.`);
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
	let accessible = await accessControl.can(
		user.role.name,
		`${RESOURCES.BOOKINGS}:${UPDATE}`,
		{
			booking,
			user,
			update
		}
	);

	if (accessible) {
		booking.update({ ...pickFields([], body) });
		response.setSuccess(true);
		response.setCode(200);
		response.setMessage(`Found ${userBookings.length} bookings.`);
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
		`${RESOURCES.USERS}:${DELETE}`
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
