import { ValidationError } from "yup";
import { Booking as BookingValidators } from "./validators";
import {
	User,
	Booking as BookingModel,
	Vehicle as VehicleModel,
	ReplaceVehicle,
	BookingAttributes,
	ReplaceVehicleAttributes
} from "../models";
import { FormErrorBuilder, ApiException } from "./exceptions";
import { UseParameters } from ".";
import { Role } from "../variables/enums";

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

export type BookingApproveOptions = UseParameters<
	BookingAttributes,
	undefined,
	"startFuel" | "startMileage"
> & {
	approved: boolean;
};

export type BookingFinalizeOptions = UseParameters<
	BookingAttributes,
	undefined,
	"endFuel" | "endMileage"
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

	public static book = async (options: BookingCreateOptions) => {
		const errors = new FormErrorBuilder();

		try {
			await BookingValidators.book.validate(options, {
				abortEarly: false
			});

			const bookingOptions = await BookingValidators.book.cast(options);

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
			if (e instanceof ValidationError) {
				// Add fields to errors
				for (const error of e.inner) {
					errors.add(error.path, error.message);
				}
				errors.throw;
			}
			// Unknown error.
			throw new ApiException("An unknown error has occurred.");
		}
	};

	public static get = async (user: User, bookingId: number) => {
		const errors = new FormErrorBuilder();
		errors.addIf(!bookingId, "bookingId", "Booking ID does not exist.").throw();

		const booking = await BookingModel.findByPk(bookingId, {
			include: [{ all: true }]
		});
		errors
			.addIf(!booking, "bookingId", `Booking with ${bookingId} does not exist.`)
			.throw();

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

	public approve = async (options: BookingApproveOptions) => {
		try {
			await BookingValidators.approve.validate(options, {
				abortEarly: false,
				context: {
					booking: this.data
				}
			});
			const approveOptions = await BookingValidators.approve.cast(options);

			await this.data.update(approveOptions);
		} catch (e) {
			const errors = new FormErrorBuilder();
			if (e instanceof ValidationError) {
				// Add fields to errors
				for (const error of e.inner) {
					errors.add(error.path, error.message);
				}
				errors.throw;
			}
			// Unknown error.
			throw new ApiException("An unknown error has occurred.");
		}
	};

	public finalize = async (options: BookingFinalizeOptions) => {
		try {
			await BookingValidators.finalize.validate(options, {
				abortEarly: false,
				context: {
					booking: this.data
				}
			});
			const finalizeOptions = await BookingValidators.finalize.cast(options);

			await this.data.update(finalizeOptions);
		} catch (e) {
			const errors = new FormErrorBuilder();
			if (e instanceof ValidationError) {
				// Add fields to errors
				for (const error of e.inner) {
					errors.add(error.path, error.message);
				}
				errors.throw;
			}
			// Unknown error.
			throw new ApiException("An unknown error has occurred.");
		}
	};
}
