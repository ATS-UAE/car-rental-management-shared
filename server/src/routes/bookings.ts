import express from "express";

import requireLogin from "../middlewares/requireLogin";
import db from "../models";
import { ResponseBuilder } from "../utils/helpers";
import { sendInvoice, sendBookingConfirmation } from "../utils/mail";
import { Booking } from "../datasource";
const router = express.Router();
router.use(requireLogin);

router.get("/", async ({ user }, res) => {
	const response = new ResponseBuilder();
	const BookingDataSource = new Booking(db, user);
	try {
		const foundBookings = await BookingDataSource.getAll();
		response.handleSuccess(res, `Found ${foundBookings.length} bookings.`);
		response.setData(foundBookings);
	} catch (e) {
		response.handleError(e, res);
	}

	res.json(response);
});

router.post("/", async ({ user, body }, res) => {
	const response = new ResponseBuilder();
	const BookingDataSource = new Booking(db, user);

	try {
		const createdBooking = await BookingDataSource.create(body);
		response.setData(createdBooking.get({ plain: true }));
		response.handleSuccess(res, "Booking has been created.");
	} catch (e) {
		response.handleError(e, res);
	}

	res.json(response);
});

router.get("/:id", async ({ user, params }, res) => {
	let response = new ResponseBuilder();
	const BookingDataSource = new Booking(db, user);

	try {
		const foundBooking = await BookingDataSource.get(params.id);
		response.setData(foundBooking.get({ plain: true }));
		response.handleSuccess(res, `Booking with ID of ${params.id} found.`);
	} catch (e) {
		response.handleError(e, res);
	}

	res.json(response);
});

router.patch("/:id", async ({ user, params, body }, res) => {
	const response = new ResponseBuilder();
	const BookingDataSource = new Booking(db, user);

	try {
		const bookingPreviousValue = await BookingDataSource.get(params.id);
		const updatedBooking = await BookingDataSource.update(params.id, body);
		const bookingData = await db.Booking.findByPk(params.id, {
			include: [{ all: true }]
		});
		if (
			body.amount !== undefined &&
			body.amount !== null &&
			bookingPreviousValue.amount === null
		) {
			sendInvoice({
				email: bookingData.user.email,
				amount: body.amount,
				customerName: bookingData.user.firstName,
				vehicleName: `${bookingData.vehicle.brand} ${
					bookingData.vehicle.model
				}`,
				from: bookingData.from,
				to: bookingData.to,
				bookingId: bookingData.id
			});
		}

		if (body.approved === true && bookingPreviousValue.approved === null) {
			const location =
				(await db.Location.findByPk(bookingData.vehicle.locationId)) || {};
			sendBookingConfirmation({
				email: bookingData.user.email,
				customerName: bookingData.user.firstName,
				vehicleName: `${bookingData.vehicle.brand} ${
					bookingData.vehicle.model
				} ${bookingData.vehicle.plateNumber}`,
				from: bookingData.from,
				to: bookingData.to,
				bookingId: bookingData.id,
				address: location.address,
				parkingLocation: bookingData.vehicle.parkingLocation,
				lat: location.lat,
				lng: location.lng
			});
		}
		response.setData(updatedBooking.get({ plain: true }));
		response.handleSuccess(res, "Booking has been created");
	} catch (e) {
		response.handleError(e, res);
	}
	res.json(response);
});

router.delete("/:id", async ({ user, params }, res) => {
	const response = new ResponseBuilder();
	const BookingDataSource = new Booking(db, user);
	try {
		const deletedBooking = await BookingDataSource.delete(params.id);
		response.setData(deletedBooking.get({ plain: true }));
		response.handleSuccess(
			res,
			`Booking with ID ${params.id} has been deleted.`
		);
	} catch (e) {
		response.handleError(e, res);
	}
	res.json(response);
});

export default router;
