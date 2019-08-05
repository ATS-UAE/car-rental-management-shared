import DataSource from "./DataSource";
import { UserType, Operation, Resource } from "../variables/enums";
import userAccessor from "./types/userAccessor";
import RBAC from "../utils/rbac";
import {
	InvalidPermissionException,
	ResourceNotFoundException
} from "../utils/exceptions";
import { toMySQLDate, pickFields } from "../utils/helpers";
export default class Accident extends DataSource {
	user: userAccessor;

	constructor(db: any, userAccessor: userAccessor) {
		super(db);
		this.user = userAccessor;
	}

	async get(id: number): Promise<any> {
		let role: UserType = this.user.role.name;
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
		let role: UserType = this.user.role.name;
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

	async update(id: number, data: any): Promise<any> {
		let role: UserType = this.user.role.name;
		let foundAccident = await this.get(id);

		let accessible = await RBAC.can(
			role,
			Operation.UPDATE,
			Resource.ACCIDENTS,
			{
				accessor: this.user,
				target: foundAccident
			}
		);

		if (!accessible) {
			throw new InvalidPermissionException();
		}

		await foundAccident.update(data);
		return this.get(id);
	}

	async delete(id: number): Promise<any> {
		let role: UserType = this.user.role.name;
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
		let role: UserType = this.user.role.name;

		let accessible = await RBAC.can(
			role,
			Operation.CREATE,
			Resource.ACCIDENTS,
			{
				accessor: this.user
			}
        );
        
		if (!accessible) {
			throw new InvalidPermissionException();
		}

		return this.createAccident(
			pickFields(
				data,
				RBAC.getExcludedFields(role, Operation.CREATE, Resource.ACCIDENTS)
			)
		);
	}
}