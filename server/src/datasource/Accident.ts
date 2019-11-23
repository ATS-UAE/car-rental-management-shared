import DataSource from "./DataSource";
import { Role, Operation, Resource } from "../variables/enums";
import UserAccessor from "./types/UserAccessor";
import RBAC from "../utils/rbac";
import {
	InvalidPermissionException,
	ResourceNotFoundException,
	InvalidInputException
} from "../utils/exceptions";
import { exceptFields } from "../utils/helpers";
export default class Accident extends DataSource {
	user: UserAccessor;

	constructor(db: any, userAccessor: UserAccessor) {
		super(db);
		this.user = userAccessor;
	}

	async get(id: number): Promise<any> {
		let role: Role = this.user.role.name;
		let foundAccident = await this.getAccident(id, {
			exclude: RBAC.getExcludedFields(role, Operation.READ, Resource.ACCIDENTS)
		});
		if (!foundAccident) {
			throw new ResourceNotFoundException(
				`User with ID of ${id} is not found.`
			);
		}
		let accessible = await RBAC.can(role, Operation.READ, Resource.ACCIDENTS, {
			accessor: this.user,
			target: foundAccident
		});
		if (!accessible) {
			throw new InvalidPermissionException();
		}
		return foundAccident;
	}

	async getAll(): Promise<any> {
		let role: Role = this.user.role.name;
		let foundAccidents = await this.getAccidents({
			exclude: RBAC.getExcludedFields(role, Operation.READ, Resource.ACCIDENTS)
		});
		let bookings = [];
		for (let booking of foundAccidents) {
			let accessible = await RBAC.can(
				role,
				Operation.READ,
				Resource.ACCIDENTS,
				{
					accessor: this.user,
					target: booking
				}
			);
			if (accessible) {
				bookings.push(booking);
			}
		}

		return bookings;
	}

	async update(id: number, data: any): Promise<[any, any]> {
		let role: Role = this.user.role.name;
		let foundAccident = await this.get(id);

		let accessible = await RBAC.can(
			role,
			Operation.UPDATE,
			Resource.ACCIDENTS,
			{
				accessor: this.user,
				target: foundAccident,
				body: data
			}
		);

		if (!accessible) {
			throw new InvalidPermissionException();
		}

		await foundAccident.update(data);

		if (data.read) {
			let foundUser = await this.getUser(this.user.id);
			foundAccident.setUserStatus(foundUser, {
				through: { read: true }
			});
		}
		return [foundAccident, this.get(id)];
	}

	async delete(id: number): Promise<any> {
		let role: Role = this.user.role.name;
		let foundAccident = await this.get(id);

		let accessible = await RBAC.can(
			role,
			Operation.DELETE,
			Resource.ACCIDENTS,
			{
				accessor: this.user,
				target: foundAccident
			}
		);

		if (!accessible) {
			throw new InvalidPermissionException();
		}
		await foundAccident.destroy();
		return foundAccident;
	}

	async create(data: any) {
		let role: Role = this.user.role.name;

		let accessible = await RBAC.can(
			role,
			Operation.CREATE,
			Resource.ACCIDENTS,
			{
				accessor: this.user,
				body: data
			}
		);
		const accidentVehicle = await this.getVehicle(data.vehicleId);

		if (!accidentVehicle) {
			throw new InvalidInputException("Vehicle is not found.", ["vehicleId"]);
		}
		if (!accessible) {
			throw new InvalidPermissionException();
		}

		await accidentVehicle.update({
			defleeted: true
		});

		return this.createAccident(
			exceptFields(
				data,
				RBAC.getExcludedFields(role, Operation.CREATE, Resource.ACCIDENTS)
			)
		);
	}
}
