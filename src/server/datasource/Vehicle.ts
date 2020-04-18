import DataSource from "./DataSource";
import { Role, Operation, Resource } from "../../shared/typings";
import UserAccessor from "./types/UserAccessor";
import RBAC from "../utils/rbac";
import {
	InvalidPermissionException,
	ResourceNotFoundException
} from "../api/exceptions";
import { exceptFields } from "../utils";

export default class Vehicle extends DataSource {
	user: UserAccessor;

	constructor(db: any, userAccessor: UserAccessor) {
		super(db);
		this.user = userAccessor;
	}

	async get(id: number): Promise<any> {
		let role: Role = this.user.role;
		let foundVehicle = await this.getVehicle(id, {
			attributes: {
				exclude: RBAC.getExcludedFields(role, Operation.READ, Resource.VEHICLES)
			}
		});
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
		let role: Role = this.user.role;
		let foundVehicles = await this.getVehicles({
			attributes: {
				exclude: RBAC.getExcludedFields(role, Operation.READ, Resource.VEHICLES)
			}
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
		let role: Role = this.user.role;
		let foundVehicle = await this.get(id);

		let accessible = await RBAC.can(role, Operation.UPDATE, Resource.VEHICLES, {
			accessor: this.user,
			target: foundVehicle,
			body: data
		});

		if (!accessible) {
			throw new InvalidPermissionException();
		}
		await foundVehicle.update(exceptFields(data, ["categories"]));
		return this.get(id);
	}

	async delete(id: number): Promise<any> {
		let role: Role = this.user.role;
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
		let role: Role = this.user.role;

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
