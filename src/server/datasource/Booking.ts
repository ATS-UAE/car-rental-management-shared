import { Wialon } from "node-wialon";
import { Op } from "sequelize";
import DataSource from "./DataSource";
import { Role, Operation, Resource } from "../../shared/typings";
import UserAccessor from "./types/UserAccessor";
import RBAC from "../utils/rbac";
import {
	InvalidPermissionException,
	ResourceNotFoundException
} from "../api/exceptions";
import { toMySQLDate, exceptFields } from "../utils";
import { BookingType } from "../../shared/typings";
import { User, Vehicle, Location } from "../models";
import { sendBookingNotification } from "../utils/mail";
export default class Booking extends DataSource {
	user: UserAccessor;

	constructor(db: any, userAccessor: UserAccessor) {
		super(db);
		this.user = userAccessor;
	}

	async get(id: number): Promise<any> {
		let role: Role = this.user.role;
		let foundBooking = await this.getBooking(id, {
			include: [
				{
					model: User
				}
			],
			attributes: {
				exclude: RBAC.getExcludedFields(role, Operation.READ, Resource.USERS)
			}
		});
		if (!foundBooking) {
			throw new ResourceNotFoundException(
				`User with ID of ${id} is not found.`
			);
		}
		let accessible = await RBAC.can(role, Operation.READ, Resource.BOOKINGS, {
			accessor: this.user,
			target: foundBooking
		});

		if (!accessible) {
			throw new InvalidPermissionException();
		}
		return foundBooking;
	}

	async getAll(): Promise<any> {
		let role: Role = this.user.role;
		let foundBookings = await this.getBookings({
			attributes: {
				exclude: RBAC.getExcludedFields(role, Operation.READ, Resource.USERS)
			},
			include: [
				{
					model: User
				}
			]
		});
		let bookings = [];
		for (let booking of foundBookings) {
			let accessible = await RBAC.can(role, Operation.READ, Resource.BOOKINGS, {
				accessor: this.user,
				target: booking
			});
			if (accessible) {
				bookings.push(booking);
			}
		}

		return bookings;
	}

	async update(id: number, data: any): Promise<any> {
		let role: Role = this.user.role;
		let foundBooking = await this.get(id);

		let accessible = await RBAC.can(role, Operation.UPDATE, Resource.BOOKINGS, {
			accessor: this.user,
			target: foundBooking,
			body: data
		});

		if (!accessible) {
			throw new InvalidPermissionException();
		}

		if (data.replaceVehicle) {
			const replaceVehicle = await this.db.ReplaceVehicle.findByPk(
				foundBooking.replaceVehicleId
			);
			if (replaceVehicle) {
				await replaceVehicle.update(data.replaceVehicle);
			} else {
				await replaceVehicle.create(data.replaceVehicle);
			}
		} else if (
			foundBooking.replaceVehicle !== null &&
			data.replaceVehicle === undefined
		) {
			const replaceVehicle = await this.db.ReplaceVehicle.findByPk(
				foundBooking.replaceVehicleId
			);
			replaceVehicle.destroy();
		}

		await foundBooking.update({
			...data,
			from: data.from && toMySQLDate(data.from),
			to: data.from && toMySQLDate(data.to)
		});
		return this.get(id);
	}

	async delete(id: number): Promise<any> {
		let role: Role = this.user.role;
		let foundBooking = await this.get(id);

		let accessible = await RBAC.can(role, Operation.DELETE, Resource.BOOKINGS, {
			accessor: this.user,
			target: foundBooking
		});

		if (!accessible) {
			throw new InvalidPermissionException();
		}
		await foundBooking.destroy();
		return foundBooking;
	}

	async create(data: any) {
		let role: Role = this.user.role;

		let accessible = await RBAC.can(role, Operation.CREATE, Resource.BOOKINGS, {
			accessor: this.user,
			body: data
		});
		let replacementVehicle;
		try {
			if (!accessible) {
				throw new InvalidPermissionException();
			}

			if (data.bookingType === BookingType.REPLACEMENT) {
				const { brand, model, plateNumber, vin } = data;
				replacementVehicle = await this.db.ReplaceVehicle.create({
					brand,
					model,
					plateNumber,
					vin
				});
			}

			let exceptions = RBAC.getExcludedFields(
				role,
				Operation.CREATE,
				Resource.BOOKINGS
			);

			let createdBooking = await this.createBooking({
				userId: role === Role.GUEST ? this.user.id : data.userId,
				...exceptFields(data, exceptions),
				to: toMySQLDate(data.to),
				from: toMySQLDate(data.from),
				replaceVehicleId: (replacementVehicle && replacementVehicle.id) || null
			});

			let user = await this.getUser(
				role === Role.GUEST ? this.user.id : data.userId
			);

			if (this.user.role === Role.GUEST) {
				User.findAll({
					where: {
						clientId: user.clientId,
						role: {
							[Op.in]: [Role.ADMIN, Role.KEY_MANAGER]
						}
					}
				}).then(async users => {
					const vehicle = await Vehicle.findByPk(data.vehicleId);
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
								bookingId: createdBooking.id,
								customerEmail: this.user.email,
								customerName: `${this.user.firstName} ${this.user.lastName}`,
								from: createdBooking.from,
								to: createdBooking.to,
								lat,
								lng,
								location: location.name,
								mobile: this.user.mobileNumber,
								plateNumber: vehicle.plateNumber || "N/A",
								vehicle: `${vehicle.brand} ${vehicle.model}`,
								vehicleId: vehicle.id,
								timeZone: user.timeZone
							});
						} catch (e) {}
					}
				});
			}
			return createdBooking;
		} catch (e) {
			replacementVehicle && (await replacementVehicle.destroy());
			throw e;
		}
	}
}
