import express from "express";
import requireLogin from "../middlewares/requireLogin";
import { Booking } from "../api";
import { Location } from "../models";
import { ResponseBuilder } from "../utils";
import { sendInvoice, sendBookingConfirmation } from "../utils/mail";

import moment from "moment";
const router = express.Router();
router.use(requireLogin);

router.get("/", async ({ user }: any, res) => {
	const response = new ResponseBuilder();
	try {
		const foundBookings = await Booking.getAll(user);
		response.handleSuccess(`Found ${foundBookings.data.length} bookings.`, res);
		response.setData(foundBookings.cast(user));
	} catch (e) {
		response.handleError(e, res);
	}

	res.json(response);
});

router.post("/", async ({ user, body }: any, res) => {
	const response = new ResponseBuilder();
	try {
		const createdBooking = await Booking.create(user, body);
		response.setData(createdBooking.cast(user));
		response.handleSuccess("Booking has been created.", res);
	} catch (e) {
		response.handleError(e, res);
	}
	res.json(response);
});

router.get("/:id", async ({ user, params }: any, res) => {
	let response = new ResponseBuilder();
	try {
		let foundBooking = await Booking.get(user, params.id);
		response.setData(foundBooking.cast(user));
		response.handleSuccess(`Booking with ID of ${params.id} found.`, res);
	} catch (e) {
		response.handleError(e, res);
	}
	res.json(response);
});

router.patch("/:id", async ({ user, params, body }: any, res) => {
	const response = new ResponseBuilder();
	try {
		const bookingPreviousValue = await Booking.get(user, params.id);
		const updatedBooking = await bookingPreviousValue.update(user, body);
		const bookingData = await updatedBooking.data.reload({
			include: [{ all: true }]
		});

		if (
			body.amount !== undefined &&
			body.amount !== null &&
			bookingPreviousValue.data.amount === null
		) {
			sendInvoice({
				email: bookingData.user.email,
				amount: body.amount,
				customerName: bookingData.user.firstName,
				vehicleName: `${bookingData.vehicle.brand} ${bookingData.vehicle.model}`,
				from: moment(bookingData.from, "X").unix(),
				to: moment(bookingData.to, "X").unix(),
				bookingId: bookingData.id,
				timeZone: bookingData.user.timeZone
			});
		}
		if (body.approved === true && bookingPreviousValue.data.approved === null) {
			const location = await Location.findByPk(bookingData.vehicle.locationId);
			sendBookingConfirmation({
				email: bookingData.user.email,
				customerName: bookingData.user.firstName,
				vehicleName: `${bookingData.vehicle.brand} ${bookingData.vehicle.model} ${bookingData.vehicle.plateNumber}`,
				from: moment(bookingData.from, "X").unix(),
				to: moment(bookingData.to, "X").unix(),
				bookingId: bookingData.id,
				address: location && location.address,
				parkingLocation: bookingData.vehicle.parkingLocation,
				lat: location && location.lat,
				lng: location && location.lng,
				timeZone: bookingData.user.timeZone
			});
		}

		response.setData(updatedBooking.cast(user));
		response.handleSuccess("Booking has been updated", res);
	} catch (e) {
		response.handleError(e, res);
	}
	res.json(response);
});

router.delete("/:id", async ({ user, params }: any, res) => {
	const response = new ResponseBuilder();
	try {
		const foundBooking = await Booking.get(user, params.id);
		await foundBooking.destroy(user);
		response.setData(foundBooking.cast(user));
		response.handleSuccess(
			`Booking with ID ${params.id} has been deleted.`,
			res
		);
	} catch (e) {
		response.handleError(e, res);
	}
	res.json(response);
});

export default router;
