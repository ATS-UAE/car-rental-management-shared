import DataSource from "./DataSource";
import { Role, Operation, Resource } from "../../shared/typings";
import UserAccessor from "./types/UserAccessor";
import RBAC from "../utils/rbac";
import {
	InvalidPermissionException,
	ResourceNotFoundException
} from "../api/exceptions";
import { Client } from "../models";

export default class Location extends DataSource {
	user: UserAccessor;

	constructor(db: any, userAccessor: UserAccessor) {
		super(db);
		this.user = userAccessor;
	}

	async get(id: number): Promise<any> {
		let role: Role = this.user.role;
		let foundLocation = await this.getLocation(id, {
			include: [{ model: Client }],
			attributes: {
				exclude: RBAC.getExcludedFields(
					role,
					Operation.READ,
					Resource.LOCATIONS
				)
			}
		});
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
		let role: Role = this.user.role;
		let foundLocations = await this.getLocations({
			include: [{ model: Client }],
			attributes: {
				exclude: RBAC.getExcludedFields(
					role,
					Operation.READ,
					Resource.LOCATIONS
				)
			}
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
		let role: Role = this.user.role;
		let foundLocation = await this.get(id);

		let accessible = await RBAC.can(
			role,
			Operation.UPDATE,
			Resource.LOCATIONS,
			{
				accessor: this.user,
				target: foundLocation,
				body: data
			}
		);

		if (!accessible) {
			throw new InvalidPermissionException();
		}
		await foundLocation.update(data);
		return this.get(id);
	}

	async delete(id: number): Promise<any> {
		let role: Role = this.user.role;
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
		let role: Role = this.user.role;

		let accessible = await RBAC.can(
			role,
			Operation.CREATE,
			Resource.LOCATIONS,
			{
				accessor: this.user,
				body: data
			}
		);
		if (!accessible) {
			throw new InvalidPermissionException();
		}
		let createdUser = await this.createLocation(data);
		return createdUser;
	}
}
