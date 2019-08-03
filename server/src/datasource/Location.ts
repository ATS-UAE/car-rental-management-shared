import DataSource from "./DataSource";
import { UserType, Operation, Resource } from "../variables/enums";
import userAccessor from "./types/userAccessor";
import RBAC from "../utils/rbac";
import {
	InvalidPermissionException,
	ResourceNotFoundException
} from "../utils/exceptions";

export default class Location extends DataSource {
	user: userAccessor;

	constructor(db: any, userAccessor: userAccessor) {
		super(db);
		this.user = userAccessor;
	}

	async get(id: number): Promise<any> {
		let role: UserType = this.user.role.name;
		let foundLocation = await this.getLocation(id);
		if (!foundLocation) {
			throw new ResourceNotFoundException(
				`User with ID of ${id} is not found.`
			);
		}
		let accessible = await RBAC.can(role, Operation.READ, Resource.LOCATIONS, {
			accessor: this.user,
			target: foundLocation
		});
		if (!accessible) {
			throw new InvalidPermissionException();
		}
		return foundLocation;
	}

	async getAll(): Promise<any> {
		let role: UserType = this.user.role.name;
		let foundLocations = await this.getLocations({
			exclude: RBAC.getExcludedFields(role, Operation.READ, Resource.LOCATIONS)
		});
		let locations = [];
		for (let location of foundLocations) {
			let accessible = await RBAC.can(
				role,
				Operation.READ,
				Resource.LOCATIONS,
				{
					accessor: this.user,
					target: location
				}
			);
			if (accessible) {
				locations.push(location);
			}
		}

		return locations;
	}

	async update(id: number, data?: object): Promise<any> {
		let role: UserType = this.user.role.name;
		let foundLocation = await this.get(id);

		let accessible = await RBAC.can(
			role,
			Operation.UPDATE,
			Resource.LOCATIONS,
			{
				accessor: this.user,
				target: foundLocation
			}
		);

		if (!accessible) {
			throw new InvalidPermissionException();
		}
		await foundLocation.update(data);
		return this.get(id);
	}

	async delete(id: number): Promise<any> {
		let role: UserType = this.user.role.name;
		let foundLocation = await this.get(id);

		let accessible = await RBAC.can(
			role,
			Operation.DELETE,
			Resource.LOCATIONS,
			{
				accessor: this.user,
				target: foundLocation
			}
		);

		if (!accessible) {
			throw new InvalidPermissionException();
		}
		await foundLocation.destroy();
		return foundLocation;
	}

	async create(data: object) {
		let role: UserType = this.user.role.name;

		let accessible = await RBAC.can(
			role,
			Operation.CREATE,
			Resource.LOCATIONS,
			{
				accessor: this.user
			}
		);
		if (!accessible) {
			throw new InvalidPermissionException();
		}
		let createdUser = await this.createLocation(data);
		return createdUser;
	}
}
