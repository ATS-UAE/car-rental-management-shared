const express = require("express");
const router = express.Router();

const requireLogin = require("../middlewares/requireLogin");
const { RBAC, OPERATIONS, resources } = require("../rbac/init");
const { CREATE, READ, UPDATE, DELETE } = OPERATIONS;
const db = require("../models");
const { errorCodes, ROLES, BOOKING_TYPES } = require("../utils/variables");
const {
	ResponseBuilder,
	pickFields,
	toMySQLDate,
	getGoogleMapsStaticURL
} = require("../utils");
const { sendInvoice, sendBookingConfirmation } = require("../mail/utils");

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
			let bookingType = await db.BookingType.findByPk(body.bookingTypeId);
			let createdBooking;
			let replacementVehicle;
			try {
				if (bookingType.name === BOOKING_TYPES.REPLACEMENT) {
					const { brand, model, plateNumber, vin } = body;
					replacementVehicle = await db.ReplaceVehicle.create({
						brand,
						model,
						plateNumber,
						vin
					});
				}
				createdBooking = await db.Booking.create({
					...pickFields(["bookingTypeId", "vehicleId"], body),
					userId,
					to: toMySQLDate(body.to),
					from: toMySQLDate(body.from),
					replaceVehicleId:
						(replacementVehicle && replacementVehicle.id) || null
				});
				response.setData(createdBooking.get({ plain: true }));
				response.setMessage("Booking has been created.");
				response.setCode(200);
				response.setSuccess(true);
			} catch (e) {
				createdBooking && (await createdBooking.destroy());
				replacementVehicle && (await replacementVehicle.destroy());
				response.setMessage(e.message);
				response.setCode(422);
				res.status(422);
				if (e.errors && e.errors.length > 0) {
					e.errors.forEach(error => response.appendError(error.path));
				}
			}
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
});

router.get("/:id", async ({ user, params }, res) => {
	let response = new ResponseBuilder();

	let booking = await db.Booking.findByPk(params.id, {
		include: [{ all: true }]
	});
	if (!booking) {
		response.setMessage(`Booking with ID of ${params.id} not found.`);
		response.setCode(404);
		response.setSuccess(false);
		res.status(404).json(response);
	} else {
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
		// If amount is being changed, then it must mean it is being finalized. Send invoice.
		let previousValue = booking.get({ plain: true });
		await booking.update({
			...body,
			to: toMySQLDate(body.to),
			from: toMySQLDate(body.from)
		});

		if (body.replaceVehicle) {
			let replaceVehicle = await db.ReplaceVehicle.findByPk(
				body.replaceVehicle.id
			);
			replaceVehicle &&
				(await replaceVehicle.update(
					pickFields(["vin", "plateNo", "brand", "model"], body.replaceVehicle)
				));
		}

		if (
			body.amount !== undefined &&
			body.amount !== null &&
			previousValue.amount === null
		) {
			sendInvoice({
				email: booking.user.email,
				amount: body.amount,
				customerName: booking.user.firstName,
				vehicleName: `${booking.vehicle.brand} ${booking.vehicle.model}`,
				from: booking.from,
				to: booking.to,
				bookingId: booking.id
			});
		}

		if (body.approved === true && previousValue.approved === null) {
			let location = await db.Location.findByPk(booking.vehicle.locationId);
			sendBookingConfirmation({
				email: booking.user.email,
				customerName: booking.user.firstName,
				vehicleName: `${booking.vehicle.brand} ${booking.vehicle.model} ${
					booking.vehicle.plateNumber
				}`,
				from: booking.from,
				to: booking.to,
				bookingId: booking.id,
				parkingLocation: booking.vehicle.parkingLocation,
				mapURL: location
					? getGoogleMapsStaticURL({
							lat: location.lat,
							lng: location.lng
					  })
					: null
			});
		}

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

	let accessible = await RBAC.can(user.role.name, DELETE, resources.bookings);

	if (accessible) {
		let foundBooking = await db.Booking.findByPk(params.id);
		if (foundBooking) {
			await foundBooking.destroy();
			response.setCode(200);
			response.setSuccess(true);
			response.setMessage(`Booking with ID ${params.id} has been deleted.`);
		} else {
			response.setCode(404);
			response.setMessage(`Booking with ID ${params.id} is not found.`);
		}
	} else {
		response.setMessage(errorCodes.UNAUTHORIZED.message);
		response.setCode(errorCodes.UNAUTHORIZED.statusCode);
		res.status(errorCodes.UNAUTHORIZED.statusCode);
	}
	res.json(response);
});

module.exports = router;
