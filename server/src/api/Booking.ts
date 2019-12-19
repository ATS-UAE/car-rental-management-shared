import { ValidationError } from "yup";
import { Booking as BookingValidators } from "./validators";
import {
	User,
	Booking as BookingModel,
	ReplaceVehicle,
	BookingAttributes,
	ReplaceVehicleAttributes
} from "../models";
import { ApiException, ItemNotFoundException } from "./exceptions";
import { UseParameters } from ".";
import { Role } from "../variables/enums";
import { ApiErrorHandler } from "./utils";

export type BookingCreateOptions = UseParameters<
	BookingAttributes,
	"from" | "to" | "bookingType",
	"userId" | "vehicleId"
> & {
	replaceVehicle?: UseParameters<
		ReplaceVehicleAttributes,
		"vin" | "brand" | "model" | "plateNumber"
	>;
};

export type BookingUpdateOptions = UseParameters<
	BookingAttributes,
	undefined,
	| "paid"
	| "amount"
	| "from"
	| "to"
	| "approved"
	| "finished"
	| "startMileage"
	| "endMileage"
	| "startFuel"
	| "endFuel"
	| "vehicleId"
	| "bookingType"
>;

export class Booking {
	private constructor(public data: BookingModel) {}

	public static getAll = async (user: User) => {
		let bookings: BookingModel[] = [];

		if (user.role === Role.GUEST) {
			bookings = await user.$get("bookings");
		} else if (user.role === Role.ADMIN || user.role === Role.KEY_MANAGER) {
			bookings = await BookingModel.findAll({
				include: [
					{
						model: User,
						where: {
							clientId: user.clientId
						}
					}
				]
			});
		} else if (user.role === Role.MASTER) {
			bookings = await BookingModel.findAll();
		}

		if (bookings instanceof Array) {
			return bookings.map(b => new Booking(b));
		}
		return [];
	};

	public create = async (user: User, options: BookingCreateOptions) => {
		try {
			await BookingValidators.create.validate(options, {
				abortEarly: false,
				context: { user, booking: this.data }
			});

			const bookingOptions = await BookingValidators.create.cast(options);

			const replacedVehicle =
				bookingOptions.replaceVehicle &&
				(await ReplaceVehicle.create(bookingOptions.replaceVehicle));

			const createdBooking = await BookingModel.create({
				paid: false,
				amount: null,
				...bookingOptions,
				replaceVehicleId: replacedVehicle || null
			});

			return new Booking(createdBooking);
		} catch (e) {
			new ApiErrorHandler(e);
		}
	};

	public static get = async (user: User, bookingId: number) => {
		const booking = await BookingModel.findByPk(bookingId, {
			include: [{ all: true }]
		});

		if (!booking) {
			throw new ItemNotFoundException(
				`Booking with ${bookingId} does not exist.`
			);
		}

		if (user.role === Role.GUEST) {
			// Return only own bookings.
			if (booking.userId === user.id) {
				return new Booking(booking);
			}
		} else if (user.role === Role.KEY_MANAGER || user.role === Role.ADMIN) {
			if (booking.user.clientId === user.clientId) {
				return new Booking(booking);
			}
		} else if (user.role === Role.MASTER) {
			return new Booking(booking);
		}
	};
}
