import DataSource from "./DataSource";
import { UserType, Operation, Resource } from "../variables/enums";
import userAccessor from "./types/userAccessor";
import RBAC from "../utils/rbac";
import {
	InvalidPermissionException,
	ResourceNotFoundException
} from "../utils/exceptions";

export default class Booking extends DataSource {
	user: userAccessor;

	constructor(db: any, userAccessor: userAccessor) {
		super(db);
		this.user = userAccessor;
	}

	async get(id: number): Promise<any> {
		let role: UserType = this.user.role.name;
		let foundBooking = await this.getBooking(id);
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
		let role: UserType = this.user.role.name;
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

	async update(id: number, data?: object): Promise<any> {
		let role: UserType = this.user.role.name;
		let foundBooking = await this.get(id);

		let accessible = await RBAC.can(role, Operation.UPDATE, Resource.BOOKINGS, {
			accessor: this.user,
			target: foundBooking
		});

		if (!accessible) {
			throw new InvalidPermissionException();
		}
		await foundBooking.update(data);
		return this.get(id);
	}

	async delete(id: number): Promise<any> {
		let role: UserType = this.user.role.name;
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

	async create(data: object) {
		let role: UserType = this.user.role.name;

		let accessible = await RBAC.can(role, Operation.CREATE, Resource.BOOKINGS, {
			accessor: this.user
		});

		if (!accessible) {
			throw new InvalidPermissionException();
		}

		let createdUser = await this.createBooking(data);
		return createdUser;
	}
}
