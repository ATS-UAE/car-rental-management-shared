import { Op, FindOptions } from "sequelize";
import _ from "lodash";
import {
	Vehicle as VehicleModel,
	User,
	Booking,
	VehicleAttributes,
	Category
} from "../models";
import { getBookingStatus } from "../utils";
import { BookingStatus, Role } from "../variables/enums";
import { InvalidPermissionException, ApiException } from "./exceptions";
import { Vehicle as VehicleValidators } from "./validators";
import { FormErrorBuilder, ApiErrorHandler } from "./utils";
import { UseParameters, Collection, Castable, API_OPERATION } from ".";

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
export class Vehicle implements Castable<Partial<VehicleAttributes>> {
	private constructor(public data: VehicleModel) {}

	public cast = (user: User) =>
		VehicleValidators.getValidator(user, API_OPERATION.READ).cast(this.data);

	public availableForBooking = async (
		from: number,
		to: number,
		bookings: Booking[]
	) => {
		if (this.data.defleeted === true) {
			return false;
		}

		const vehicleBookings = bookings || (await this.data.$get("bookings"));

		for (const booking of vehicleBookings) {
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

	public update = async (user: User, options: UpdateVehicleOptions) => {
		try {
			await VehicleValidators.getValidator(user, API_OPERATION.UPDATE, {
				newData: options,
				target: this.data
			}).validate(options);

			const vehicleOptions = VehicleValidators.getValidator(
				user,
				API_OPERATION.UPDATE,
				{
					newData: options,
					target: this.data
				}
			).cast(options);

			await this.data.update(vehicleOptions);
		} catch (e) {
			new ApiErrorHandler(e);
		}
	};

	public static create = async (user: User, options: CreateVehicleOptions) => {
		try {
			await VehicleValidators.getValidator(user, API_OPERATION.CREATE, {
				newData: options
			}).validate(options);

			const vehicleOptions = await VehicleValidators.getValidator(
				user,
				API_OPERATION.CREATE,
				{
					newData: options
				}
			).cast(options);

			const createdVehicle = await VehicleModel.create(vehicleOptions);

			return new Booking(createdVehicle);
		} catch (e) {
			new ApiErrorHandler(e);
		}
	};

	public static getAll = async (
		user: User,
		availability?: { from: Date; to: Date }
	) => {
		let vehicles: VehicleModel[] = [];

		const baseFindOptions: FindOptions = availability
			? {
					where: {
						$bookings$: null
					},
					include: [
						{
							model: Booking,
							where: {
								// Check if the intervals does not intersect with other bookings.
								[Op.not]: {
									[Op.gte]: {
										to: availability.to
									},
									[Op.lte]: {
										from: availability.from
									}
								}
							}
						}
					]
			  }
			: {};

		if (user.role === Role.MASTER) {
			vehicles = await VehicleModel.findAll();
		} else if (user.role === Role.GUEST) {
			// Get only available vehicles in the same client.
			// Only vehicles which have the same categories as the user.
			const userCategories = await user.$get("categories");

			// Get all vehicles in the client if user does not contain a category.
			if (!userCategories.length) {
				vehicles = await VehicleModel.findAll(
					_.merge(
						{
							where: {
								clientId: user.clientId
							}
						},
						baseFindOptions
					)
				);
			} else {
				vehicles = await VehicleModel.findAll(
					_.merge(
						{
							where: {
								clientId: user.clientId
							},
							include: [
								{
									model: Category,
									where: {
										id: { [Op.in]: userCategories.map(c => c.id) }
									}
								}
							]
						},
						baseFindOptions
					)
				);
			}
		} else if (user.clientId) {
			vehicles = await VehicleModel.findAll(
				_.merge(
					{
						where: {
							clientId: user.clientId
						}
					},
					baseFindOptions
				)
			);
		}

		return new Collection(vehicles.map(v => new Vehicle(v)));
	};
}
