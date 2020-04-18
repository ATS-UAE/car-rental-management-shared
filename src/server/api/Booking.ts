import { Wialon } from "node-wialon";
import { Op } from "sequelize";
import moment from "moment";

import { Booking as BookingValidators } from "./validators";
import {
	BookingAttributes,
	Role,
	BookingServerParamsPost,
	BookingServerParamsPatch
} from "../../shared/typings";
import {
	User as UserModel,
	Booking as BookingModel,
	ReplaceVehicle,
	Location,
	Vehicle as VehicleModel
} from "../models";
import {
	ResourceNotFoundException,
	InvalidPermissionException,
	FormException
} from "./exceptions";
import { UseParameters, API_OPERATION, Vehicle, User } from ".";
import { Castable, Collection } from "./Collection";
import {
	sendBookingNotification,
	sendInvoice as sendInvoiceEmail,
	sendBookingConfirmation as sendBookingConfirmationEmail
} from "../utils/mail";

export class Booking implements Castable<Partial<BookingAttributes>> {
	public constructor(public data: BookingModel) {}

	public cast = (user: UserModel) =>
		BookingValidators.getValidator(user, API_OPERATION.READ).cast(this.data);

	public static getAll = async (user: UserModel) => {
		let bookings: BookingModel[] = [];

		if (user.role === Role.GUEST) {
			// Get bookings on self.
			bookings = await user.$get("bookings", {
				include: [VehicleModel, ReplaceVehicle]
			});
		} else if (user.role === Role.ADMIN || user.role === Role.KEY_MANAGER) {
			// Get bookings on self client.
			bookings = await BookingModel.findAll({
				include: [
					{
						model: UserModel,
						where: {
							clientId: user.clientId
						}
					},
					VehicleModel,
					ReplaceVehicle
				]
			});
		} else if (user.role === Role.MASTER) {
			// Get all bookings.
			bookings = await BookingModel.findAll({
				include: [VehicleModel, ReplaceVehicle]
			});
		}
		return new Collection<Partial<BookingAttributes>, Booking>(
			bookings.map(b => new Booking(b))
		);
	};

	public getVehicle = async () => {
		await this.data.reload({ include: [VehicleModel] });
		return new Vehicle(this.data.vehicle);
	};

	public static create = async (
		user: UserModel,
		options: BookingServerParamsPost
	) => {
		try {
			if (!user) {
				throw new InvalidPermissionException("You need to login first!");
			}

			const validator = BookingValidators.getValidator(
				user,
				API_OPERATION.CREATE
			);

			// Validate JSON schema.
			await validator.validate(options);
			// Cast the JSON
			const bookingOptions = validator.cast(options) as Partial<
				BookingServerParamsPost
			>;

			const vehicle = await Vehicle.get(user, options.vehicleId);

			if (!(await vehicle.availableForBooking(options.from, options.to))) {
				throw new FormException(
					"Vehicle is not available. Please select another vehicle.",
					[{ key: "vehicleId", value: "Vehicle is not available." }]
				);
			}
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
			FormException.handleFieldErrors(e);
		}
	};

	public static get = async (user: UserModel, bookingId: number) => {
		const booking = await BookingModel.findByPk(bookingId, {
			include: [{ all: true }]
		});

		if (!booking) {
			throw new ResourceNotFoundException(
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

	public update = async (
		user: UserModel,
		options: BookingServerParamsPatch
	) => {
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
				BookingServerParamsPatch
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
			FormException.handleFieldErrors(e);
		}
	};
	public destroy = async (user: UserModel) => {
		try {
			// Validate JSON schema.
			await BookingValidators.getValidator(
				user,
				API_OPERATION.DELETE,
				this.data
			).validate(this.data);

			await this.data.destroy();
		} catch (e) {
			FormException.handleFieldErrors(e);
		}
	};

	public setEmailNotificationsToBookingManagers = async () => {
		const bookingData = await this.data.reload({
			include: [{ model: UserModel }]
		});
		await UserModel.findAll({
			where: {
				clientId: bookingData.user.clientId,
				role: {
					[Op.in]: [Role.ADMIN, Role.KEY_MANAGER]
				}
			}
		}).then(async users => {
			const vehicle = await VehicleModel.findByPk(bookingData.vehicleId);
			const location = vehicle && (await Location.findByPk(vehicle.locationId));

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

	public getUser = async () => {
		await this.data.reload({
			include: [UserModel]
		});
		return new User(this.data.user);
	};

	public sendInvoice = async (amount: number) => {
		const bookingData = await this.data.reload({
			include: [{ model: UserModel }, { model: VehicleModel }]
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
			include: [{ model: UserModel }, { model: VehicleModel }]
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
