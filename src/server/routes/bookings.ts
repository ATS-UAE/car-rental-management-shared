import express from "express";
import requireLogin from "../middlewares/requireLogin";
import { Booking } from "../api";
import {
	BookingAttributes,
	WialonUnitServerResponseGet,
	ExtractServerResponseData,
	VehicleServerResponseGet,
	UserServerResponseGet,
	BookingServerParamsPost,
	BookingServerParamsPatch
} from "../../shared/typings";
import { ResponseBuilder } from "../utils";

const router = express.Router();

router.use(requireLogin);

router.get<undefined, ResponseBuilder<Partial<BookingAttributes>[]>, undefined>(
	"/",
	async ({ user }, res) => {
		const response = new ResponseBuilder<Partial<BookingAttributes>[]>();
		try {
			const foundBookings = await Booking.getAll(user);
			response.handleSuccess(
				`Found ${foundBookings.data.length} bookings.`,
				res
			);
			response.setData(foundBookings.cast(user));
		} catch (e) {
			response.handleError(e, res);
		}

		res.json(response);
	}
);

router.post<
	undefined,
	ResponseBuilder<Partial<BookingAttributes>>,
	BookingServerParamsPost
>("/", async ({ user, body }, res) => {
	const response = new ResponseBuilder<Partial<BookingAttributes>>();
	try {
		const createdBooking = await Booking.create(user, body);

		createdBooking.setEmailNotificationsToBookingManagers();

		response.setData(createdBooking.cast(user));
		response.handleSuccess("Booking has been created.", res);
	} catch (e) {
		response.handleError(e, res);
	}
	res.json(response);
});

router.get<
	{ id: string },
	ResponseBuilder<Partial<BookingAttributes>>,
	undefined
>("/:id", async ({ user, params }: any, res) => {
	const response = new ResponseBuilder<Partial<BookingAttributes>>();
	try {
		let foundBooking = await Booking.get(user, params.id);
		response.setData(foundBooking.cast(user));
		response.handleSuccess(`Booking with ID of ${params.id} found.`, res);
	} catch (e) {
		response.handleError(e, res);
	}
	res.json(response);
});

router.patch<
	{ id: string },
	ResponseBuilder<Partial<BookingAttributes>>,
	BookingServerParamsPatch
>("/:id", async ({ user, params, body }: any, res) => {
	const response = new ResponseBuilder<Partial<BookingAttributes>>();
	try {
		const bookingPreviousValue = await Booking.get(user, params.id);
		const updatedBooking = await bookingPreviousValue.update(user, body);

		if (
			body.amount !== undefined &&
			body.amount !== null &&
			bookingPreviousValue.data.amount === null
		) {
			updatedBooking.sendInvoice(body.amount);
		}
		if (body.approved === true && bookingPreviousValue.data.approved === null) {
			updatedBooking.sendBookingConfirmation();
		}

		response.setData(updatedBooking.cast(user));
		response.handleSuccess("Booking has been updated", res);
	} catch (e) {
		response.handleError(e, res);
	}
	res.json(response);
});

router.delete<
	{ id: string },
	ResponseBuilder<Partial<BookingAttributes>>,
	undefined
>("/:id", async ({ user, params }: any, res) => {
	const response = new ResponseBuilder<Partial<BookingAttributes>>();
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

router.get<{ id: string }, WialonUnitServerResponseGet>(
	"/:id/vehicle/wialonUnit",
	async ({ user, params }, res) => {
		const response = new ResponseBuilder<
			ExtractServerResponseData<WialonUnitServerResponseGet>
		>();
		try {
			const foundBooking = await Booking.get(user, parseInt(params.id));
			const vehicle = await foundBooking.getVehicle();
			const wialonData = await vehicle.getWialonData();
			response.setData(wialonData);
			response.handleSuccess(`Found data for booking ${params.id}`, res);
		} catch (e) {
			response.handleError(e, res);
		}
		res.json(response.toObject());
	}
);

router.get<{ id: string }, VehicleServerResponseGet>(
	"/:id/vehicle",
	async ({ user, params }, res) => {
		const response = new ResponseBuilder<
			ExtractServerResponseData<VehicleServerResponseGet>
		>();
		try {
			const foundBooking = await Booking.get(user, parseInt(params.id));
			const vehicle = await foundBooking.getVehicle();

			response.setData(vehicle.cast(user));
			response.handleSuccess(`Found data for booking ${params.id}`, res);
		} catch (e) {
			response.handleError(e, res);
		}
		res.json(response.toObject());
	}
);

router.get<{ id: string }, UserServerResponseGet>(
	"/:id/user",
	async ({ user, params }, res) => {
		const response = new ResponseBuilder<
			ExtractServerResponseData<UserServerResponseGet>
		>();
		try {
			const foundBooking = await Booking.get(user, parseInt(params.id));
			const booker = await foundBooking.getUser();

			response.setData(booker.cast(user));
			response.handleSuccess(`Found data for booking ${params.id}`, res);
		} catch (e) {
			response.handleError(e, res);
		}
		res.json(response.toObject());
	}
);

export default router;
