import { Wialon } from "node-wialon";
import { Op } from "sequelize";
import moment = require("moment");

import { Booking as BookingValidators } from "./validators";
import {
	User,
	Booking as BookingModel,
	ReplaceVehicle,
	BookingAttributes,
	ReplaceVehicleAttributes,
	Location,
	Vehicle
} from "../models";
import { ItemNotFoundException } from "./exceptions";
import { UseParameters, API_OPERATION } from ".";
import { Role, BookingType } from "../variables/enums";
import { ApiErrorHandler } from "./utils";
import { Castable, Collection } from "./Collection";
import {
	sendBookingNotification,
	sendInvoice as sendInvoiceEmail,
	sendBookingConfirmation as sendBookingConfirmationEmail
} from "../utils/mail";

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
	"id",
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
> & {
	replaceVehicle?: UseParameters<
		ReplaceVehicleAttributes,
		"vin" | "brand" | "model" | "plateNumber"
	>;
};

export class Booking implements Castable<Partial<BookingAttributes>> {
	private constructor(public data: BookingModel) {}

	public cast = (user: User) =>
		BookingValidators.getValidator(user, API_OPERATION.READ).cast(this.data);

	public static getAll = async (user: User) => {
		let bookings: BookingModel[] = [];

		if (user.role === Role.GUEST) {
			// Get bookings on self.
			bookings = await user.$get("bookings", {
				include: [Vehicle, ReplaceVehicle]
			});
		} else if (user.role === Role.ADMIN || user.role === Role.KEY_MANAGER) {
			// Get bookings on self client.
			bookings = await BookingModel.findAll({
				include: [
					{
						model: User,
						where: {
							clientId: user.clientId
						}
					},
					Vehicle,
					ReplaceVehicle
				]
			});
		} else if (user.role === Role.MASTER) {
			// Get all bookings.
			bookings = await BookingModel.findAll({
				include: [Vehicle, ReplaceVehicle]
			});
		}
		return new Collection<Partial<BookingAttributes>, Booking>(
			bookings.map(b => new Booking(b))
		);
	};

	public static create = async (user: User, options: BookingCreateOptions) => {
		try {
			const validator = BookingValidators.getValidator(
				user,
				API_OPERATION.CREATE
			);

			// Validate JSON schema.
			await validator.validate(options);
			// Cast the JSON
			const bookingOptions = validator.cast(options) as Partial<
				BookingCreateOptions
			>;

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
			const booking = await this.data.reload({
				include: [{ model: ReplaceVehicle }]
			});
			const validator = BookingValidators.getValidator(
				user,
				API_OPERATION.UPDATE,
				booking
			);
			// Validate JSON schema.
			await validator.validate(options);
			// Cast the JSON
			const bookingOptions = validator.cast(options) as Partial<
				BookingUpdateOptions
			>;

			// Create replaced vehicle.
			const replacedVehicle =
				bookingOptions.replaceVehicle &&
				(await ReplaceVehicle.create(bookingOptions.replaceVehicle));
			// Delete replaced vehicle
			if (replacedVehicle && booking.replaceVehicleId) {
				await ReplaceVehicle.destroy();
			}
			// Create booking

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
			await BookingValidators.getValidator(
				user,
				API_OPERATION.DELETE,
				this.data
			).validate(this.data);

			await this.data.destroy();
		} catch (e) {
			new ApiErrorHandler(e);
		}
	};

	public setEmailNotificationsToBookingManagers = async () => {
		const bookingData = await this.data.reload({
			include: [{ model: User }]
		});
		await User.findAll({
			where: {
				clientId: bookingData.user.clientId,
				role: {
					[Op.in]: [Role.ADMIN, Role.KEY_MANAGER]
				}
			}
		}).then(async users => {
			const vehicle = await Vehicle.findByPk(bookingData.vehicleId);
			const location = await Location.findByPk(vehicle.locationId);

			let lng = location.lng;
			let lat = location.lat;

			if (vehicle.wialonUnitId) {
				const w = await Wialon.login({
					token: process.env.WIALON_TOKEN
				});
				const unit = await w.Core.searchItem({
					id: vehicle.wialonUnitId,
					flags: 1024 + 8192
				});
				if (unit) {
					lat = unit.item && unit.item.pos && unit.item.pos.y;
					lng = unit.item && unit.item.pos && unit.item.pos.x;
				}
			}
			for (const user of users) {
				try {
					sendBookingNotification({
						email: user.email,
						company: "LeasePlan",
						bookingId: bookingData.id,
						customerEmail: bookingData.user.email,
						customerName: `${bookingData.user.firstName} ${bookingData.user.lastName}`,
						from: moment(bookingData.from).unix(),
						to: moment(bookingData.to).unix(),
						lat,
						lng,
						location: location.name,
						mobile: bookingData.user.mobileNumber,
						plateNumber: vehicle.plateNumber || "N/A",
						vehicle: `${vehicle.brand} ${vehicle.model}`,
						vehicleId: vehicle.id,
						timeZone: user.timeZone
					});
				} catch (e) {}
			}
		});
	};

	public sendInvoice = async (amount: number) => {
		const bookingData = await this.data.reload({
			include: [{ model: User }, { model: Vehicle }]
		});
		await sendInvoiceEmail({
			email: bookingData.user.email,
			amount: amount,
			customerName: bookingData.user.firstName,
			vehicleName: `${bookingData.vehicle.brand} ${bookingData.vehicle.model}`,
			from: moment(bookingData.from, "X").unix(),
			to: moment(bookingData.to, "X").unix(),
			bookingId: bookingData.id,
			timeZone: bookingData.user.timeZone
		});
	};

	public sendBookingConfirmation = async () => {
		const bookingData = await this.data.reload({
			include: [{ model: User }, { model: Vehicle }]
		});
		const vehicleLocation = await Location.findByPk(
			bookingData.vehicle.locationId
		);
		let lng = vehicleLocation.lng;
		let lat = vehicleLocation.lat;

		if (bookingData.vehicle.wialonUnitId) {
			const w = await Wialon.login({
				token: process.env.WIALON_TOKEN
			});
			const unit = await w.Core.searchItem({
				id: bookingData.vehicle.wialonUnitId,
				flags: 1024 + 8192
			});
			if (unit) {
				lat = unit.item && unit.item.pos && unit.item.pos.y;
				lng = unit.item && unit.item.pos && unit.item.pos.x;
			}
		}
		await sendBookingConfirmationEmail({
			email: bookingData.user.email,
			customerName: bookingData.user.firstName,
			vehicleName: `${bookingData.vehicle.brand} ${bookingData.vehicle.model} ${bookingData.vehicle.plateNumber}`,
			from: moment(bookingData.from, "X").unix(),
			to: moment(bookingData.to, "X").unix(),
			bookingId: bookingData.id,
			address: vehicleLocation && vehicleLocation.address,
			parkingLocation: bookingData.vehicle.parkingLocation,
			lat,
			lng,
			timeZone: bookingData.user.timeZone
		});
	};
}
