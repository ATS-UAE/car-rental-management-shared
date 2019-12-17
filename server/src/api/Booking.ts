import moment from "moment";
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
import { FormErrorBuilder, RoleUtils, getArray } from "../utils";
import { UseParameters } from ".";
import { Role } from "../variables/enums";

export type BookAVehicleOptions = UseParameters<
	BookingAttributes,
	"from" | "to" | "bookingType",
	| "userId"
	| "vehicleId"
	| "startMileage"
	| "endMileage"
	| "startFuel"
	| "endFuel"
> & {
	replaceVehicle?: UseParameters<
		ReplaceVehicleAttributes,
		"vin" | "brand" | "model" | "plateNumber"
	>;
};

export class Booking {
	private constructor(public booking: BookingModel) {}

	public static getUserBookings = async (userId: number) => {
		const user = await User.findByPk(userId);
		const errors = new FormErrorBuilder();

		errors.addIf(!user, "userId", "User does not exist");
		errors.throw();

		let bookings: BookingModel[] = [];

		if (user.role === Role.GUEST) {
			bookings = getArray(await user.$get<BookingModel>("bookings"));
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

	public static bookVehicle = async (options: BookAVehicleOptions) => {
		const errors = new FormErrorBuilder();

		try {
			await BookingValidators.bookVehicle.validate(options, {
				abortEarly: false
			});

			const bookingOptions = await BookingValidators.bookVehicle.cast(options);

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
			throw new Error("An unknown error has occurred.");
		}
	};
}
