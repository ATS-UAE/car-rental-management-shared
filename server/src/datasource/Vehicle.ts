import DataSource from "./DataSource";
import { Role, Operation, Resource } from "../variables/enums";
import userAccessor from "./types/UserAccessor";
import RBAC from "../utils/rbac";
import {
	InvalidPermissionException,
	ResourceNotFoundException
} from "../utils/exceptions";

export default class Vehicle extends DataSource {
	user: userAccessor;

	constructor(db: any, userAccessor: userAccessor) {
		super(db);
		this.user = userAccessor;
	}

	async get(id: number): Promise<any> {
		let role: Role = this.user.role.name;
		let foundVehicle = await this.getVehicle(id);
		if (!foundVehicle) {
			throw new ResourceNotFoundException(
				`User with ID of ${id} is not found.`
			);
		}
		let accessible = await RBAC.can(role, Operation.READ, Resource.VEHICLES, {
			accessor: this.user,
			target: foundVehicle
		});
		if (!accessible) {
			throw new InvalidPermissionException();
		}
		return foundVehicle;
	}

	async getAll(): Promise<any> {
		let role: Role = this.user.role.name;
		let foundVehicles = await this.getVehicles({
			exclude: RBAC.getExcludedFields(role, Operation.READ, Resource.VEHICLES)
		});
		let vehicles = [];
		for (let vehicle of foundVehicles) {
			let accessible = await RBAC.can(role, Operation.READ, Resource.VEHICLES, {
				accessor: this.user,
				target: vehicle
			});
			if (accessible) {
				vehicles.push(vehicle);
			}
		}

		return vehicles;
	}

	async update(id: number, data?: object): Promise<any> {
		let role: Role = this.user.role.name;
		let foundVehicle = await this.get(id);

		let accessible = await RBAC.can(role, Operation.UPDATE, Resource.VEHICLES, {
			accessor: this.user,
			target: foundVehicle,
			body: data
		});

		if (!accessible) {
			throw new InvalidPermissionException();
		}
		await foundVehicle.update(data);
		return this.get(id);
	}

	async delete(id: number): Promise<any> {
		let role: Role = this.user.role.name;
		let foundVehicle = await this.get(id);

		let accessible = await RBAC.can(role, Operation.DELETE, Resource.VEHICLES, {
			accessor: this.user,
			target: foundVehicle
		});

		if (!accessible) {
			throw new InvalidPermissionException();
		}
		await foundVehicle.destroy();
		return foundVehicle;
	}

	async create(data: object) {
		let role: Role = this.user.role.name;

		let accessible = await RBAC.can(role, Operation.CREATE, Resource.VEHICLES, {
			accessor: this.user,
			body: data
		});
		if (!accessible) {
			throw new InvalidPermissionException();
		}
		let createdUser = await this.createVehicle(data);
		return createdUser;
	}
}
