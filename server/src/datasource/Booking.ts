import DataSource from "./DataSource";
import { Role, Operation, Resource } from "../variables/enums";
import userAccessor from "./types/userAccessor";
import RBAC from "../utils/rbac";
import {
	InvalidPermissionException,
	ResourceNotFoundException
} from "../utils/exceptions";
import { toMySQLDate, pickFields } from "../utils/helpers";
import { BookingType } from "../variables/enums";
export default class Booking extends DataSource {
	user: userAccessor;

	constructor(db: any, userAccessor: userAccessor) {
		super(db);
		this.user = userAccessor;
	}

	async get(id: number): Promise<any> {
		let role: Role = this.user.role.name;
		let foundBooking = await this.getBooking(id, {
			exclude: RBAC.getExcludedFields(role, Operation.READ, Resource.BOOKINGS)
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
		let role: Role = this.user.role.name;
		let foundBookings = await this.getBookings({
			exclude: RBAC.getExcludedFields(role, Operation.READ, Resource.BOOKINGS)
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
		let role: Role = this.user.role.name;
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

		await foundBooking.update(data);
		return this.get(id);
	}

	async delete(id: number): Promise<any> {
		let role: Role = this.user.role.name;
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
		let role: Role = this.user.role.name;

		let accessible = await RBAC.can(role, Operation.CREATE, Resource.BOOKINGS, {
			accessor: this.user
			body: data
		});
		let replacementVehicle;
		try {
			const bookingType = this.db.BookingType.findByPk(data.bookingTypeId);
			if (bookingType.name === BookingType.REPLACEMENT) {
				const { brand, model, plateNumber, vin } = data;
				replacementVehicle = await this.db.ReplaceVehicle.create({
					brand,
					model,
					plateNumber,
					vin
				});
			}
			if (!accessible) {
				throw new InvalidPermissionException();
			}
			let exceptions = RBAC.getExcludedFields(
				role,
				Operation.CREATE,
				Resource.BOOKINGS
			);
			let createdBooking = await this.createBooking({
				...pickFields(data, exceptions),
				to: toMySQLDate(data.to),
				from: toMySQLDate(data.from),
				replaceVehicleId: (replacementVehicle && replacementVehicle.id) || null
			});
			return createdBooking;
		} catch (e) {
			replacementVehicle && (await replacementVehicle.destroy());
			throw e;
		}
	}
}
