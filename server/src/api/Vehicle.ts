import moment from "moment";
import { Op } from "sequelize";
import {
	Vehicle as VehicleModel,
	User,
	Booking,
	VehicleAttributes
} from "../models";
import { getBookingStatus } from "../utils";
import { BookingStatus, Role } from "../variables/enums";
import { InvalidPermissionException, ApiException } from "./exceptions";
import { Vehicle as VehicleValidators } from "./validators";
import { FormErrorBuilder, ApiErrorHandler } from "./utils";
import { UseParameters } from ".";

export type CreateVehicleOptions = UseParameters<
	VehicleAttributes,
	"brand" | "model" | "vin",
	| "plateNumber"
	| "defleeted"
	| "parkingLocation"
	| "vehicleImageSrc"
	| "bookingChargeCount"
	| "bookingCharge"
	| "wialonUnitId"
	| "bookingChargeUnit"
	| "clientId"
	| "locationId"
>;

export type UpdateVehicleOptions = UseParameters<
	VehicleAttributes,
	"brand" | "model" | "vin",
	| "plateNumber"
	| "defleeted"
	| "parkingLocation"
	| "vehicleImageSrc"
	| "bookingChargeCount"
	| "bookingCharge"
	| "wialonUnitId"
	| "bookingChargeUnit"
	| "clientId"
	| "locationId"
>;
export class Vehicle {
	private constructor(public data: VehicleModel) {}

	public availableForBooking = async (from: number, to: number) => {
		if (this.data.defleeted === true) {
			return false;
		}

		const bookings = await this.data.$get("bookings");

		for (const booking of bookings) {
			const status = getBookingStatus({
				from,
				to,
				approved: booking.approved
			});
			if (
				status === BookingStatus.PENDING ||
				status === BookingStatus.APPROVED ||
				status === BookingStatus.ONGOING
			) {
				return false;
			}
		}

		return true;
	};

	public static get = async (user: User, id: number) => {
		const vehicle = await VehicleModel.findByPk(id);

		if (user.role === Role.MASTER) {
			return new Vehicle(vehicle);
		} else if (user.clientId === vehicle.clientId) {
			return new Vehicle(vehicle);
		}
		throw new InvalidPermissionException("You cannot access this vehicle.");
	};

	static create = async (user: User, options: CreateVehicleOptions) => {
		try {
			await VehicleValidators.create.validate(options, {
				abortEarly: false,
				context: { user }
			});

			const vehicleOptions = VehicleValidators.create.cast(options);

			const createdVehicle = await VehicleModel.create(vehicleOptions);

			return new Booking(createdVehicle);
		} catch (e) {
			new ApiErrorHandler(e);
		}
	};

	public update = async (user: User, options: UpdateVehicleOptions) => {
		try {
			await VehicleValidators.create.validate(
				{ ...options },
				{
					abortEarly: false,
					context: { user, vehicle: this.data }
				}
			);

			const vehicleOptions = VehicleValidators.update.cast(options);

			await this.data.update(vehicleOptions);
		} catch (e) {
			new ApiErrorHandler(e);
		}
	};

	public static getAll = async (user: User) => {
		let vehicles: VehicleModel[] = [];

		if (user.role === Role.MASTER) {
			vehicles = await VehicleModel.findAll();
		} else if (user.role === Role.GUEST) {
			// Get only available vehicles in the same client.
			vehicles = await VehicleModel.findAll({
				where: {
					clientId: user.clientId,
					$Booking$: null
				},
				include: [
					{
						model: Booking,
						required: false,
						where: {
							approved: true,
							finished: false,
							from: {
								[Op.lte]: moment().toDate()
							},
							to: {
								[Op.gte]: moment().toDate()
							}
						}
					}
				]
			});
		} else if (user.clientId) {
			vehicles = await VehicleModel.findAll({
				where: {
					clientId: user.clientId
				}
			});
		}

		return vehicles.map(v => new Vehicle(v));
	};
}
