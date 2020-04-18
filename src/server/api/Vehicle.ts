import { Op, FindOptions } from "sequelize";
import _ from "lodash";
import { Wialon } from "node-wialon";
import { Vehicle as VehicleModel, User, Booking, Category } from "../models";
import {
	VehicleAttributes,
	BookingStatus,
	Role,
	WialonUnitAttributes,
	ExtractServerResponseData,
	VehicleServerResponseGet
} from "../../shared/typings";
import { getBookingStatus } from "../../shared/utils";
import {
	InvalidPermissionException,
	ResourceNotFoundException,
	FormException
} from "./exceptions";
import { Vehicle as VehicleValidators } from "./validators";
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
export class Vehicle
	implements Castable<ExtractServerResponseData<VehicleServerResponseGet>> {
	public constructor(public data: VehicleModel) {}

	public cast = (user: User) =>
		VehicleValidators.getValidator(user, API_OPERATION.READ).cast(this.data);

	public getWialonData = async (): Promise<WialonUnitAttributes | null> => {
		if (this.data.wialonUnitId) {
			const w = await Wialon.login({ token: process.env.WIALON_TOKEN });
			const unit = await w.Core.searchItem({
				id: this.data.wialonUnitId,
				flags: 1 + 256 + 1024 + 8192
			});
			if (unit && unit.item) {
				return {
					name: unit.item.nm,
					imei: unit.item.uid,
					lat: unit.item.pos?.x || null,
					lng: unit.item.pos?.y || null,
					mileage: unit.item.cnm || null
				};
			}
			throw new ResourceNotFoundException(
				`Unit with ID ${this.data.wialonUnitId} is not found.`
			);
		}
		return null;
	};

	public availableForBooking = async (
		from: number,
		to: number,
		bookings?: Booking[]
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
		// TODO: No Nested Models
		const vehicle = await VehicleModel.findByPk(id, {
			include: [{ model: Category }]
		});

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
			FormException.handleFieldErrors(e);
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
			FormException.handleFieldErrors(e);
		}
	};

	public static getAll = async (
		user: User,
		options?: { from: Date; to: Date }
	) => {
		let vehicles: VehicleModel[] = [];
		const baseFindOptions: FindOptions =
			options?.from && options?.to
				? {
						where: {
							"$bookings.vehicleId$": null
						},
						include: [
							{
								model: Booking,
								required: false,
								where: {
									// Check if the intervals does not intersect with other bookings.
									to: {
										[Op.lte]: options.to
									},
									from: {
										[Op.gte]: options.from
									}
								}
							}
						]
				  }
				: {};

		if (user.role === Role.MASTER) {
			vehicles = await VehicleModel.findAll(
				_.merge(
					{
						include: [{ model: Category }]
					},
					baseFindOptions
				)
			);
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
							},
							include: [{ model: Category }]
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
						},
						include: [{ model: Category }]
					},
					baseFindOptions
				)
			);
		}

		return new Collection<Partial<VehicleAttributes>, Vehicle>(
			vehicles.map(v => new Vehicle(v))
		);
	};
}
