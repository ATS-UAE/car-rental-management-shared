import { ValidationError } from "yup";
import { Booking as BookingValidators } from "./validators";
import {
	User,
	Booking as BookingModel,
	ReplaceVehicle,
	BookingAttributes,
	ReplaceVehicleAttributes
} from "../models";
import { ItemNotFoundException } from "./exceptions";
import { UseParameters } from ".";
import { Role } from "../variables/enums";
import { ApiErrorHandler } from "./utils";
import { Castable, Collection } from "./Collection";

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
	| "userId"
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

export class Booking implements Castable {
	private constructor(public data: BookingModel) {}

	public cast = (user: User) => BookingValidators.get.cast(user, this.data);

	public static getAll = async (user: User) => {
		let bookings: BookingModel[] = [];

		if (user.role === Role.GUEST) {
			// Get bookings on self.
			bookings = await user.$get("bookings");
		} else if (user.role === Role.ADMIN || user.role === Role.KEY_MANAGER) {
			// Get bookings on self client.
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
			// Get all bookings.
			bookings = await BookingModel.findAll();
		}
		return new Collection(bookings.map(b => new Booking(b)));
	};

	public static create = async (user: User, options: BookingCreateOptions) => {
		try {
			// Validate JSON schema.
			await BookingValidators.create.validate(user, options);
			// Cast the JSON
			const bookingOptions = await BookingValidators.create.cast(user, options);

			// Create replaced vehicle.
			const replacedVehicle =
				bookingOptions.replaceVehicle &&
				(await ReplaceVehicle.create(bookingOptions.replaceVehicle));

			// Create booking
			// TODO: Include "paid", and "amount" in schema.
			const createdBooking = await BookingModel.create({
				paid: false,
				amount: null,
				...bookingOptions,
				replaceVehicleId: replacedVehicle?.id || null
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

	public update = async (user: User, options: BookingUpdateOptions) => {
		try {
			// Validate JSON schema.
			await BookingValidators.update.validate(user, this.data, options);
			// Cast the JSON
			const bookingOptions = await BookingValidators.update.cast(
				user,
				this.data,
				options
			);

			// Create replaced vehicle.
			const replacedVehicle =
				bookingOptions.replaceVehicle &&
				(await ReplaceVehicle.create(bookingOptions.replaceVehicle));

			// Create booking
			// TODO: Include "paid", and "amount" in schema.
			const updatedBooking = await this.data.update({
				...bookingOptions,
				replaceVehicleId: replacedVehicle?.id
			});

			return new Booking(updatedBooking);
		} catch (e) {
			new ApiErrorHandler(e);
		}
	};
	public destroy = async (user: User) => {
		try {
			// Validate JSON schema.
			await BookingValidators.destroy.validate(user, this.data);

			await this.data.destroy();
		} catch (e) {
			new ApiErrorHandler(e);
		}
	};
}
