import { Op } from "sequelize";
import _ from "lodash";
import DataSource from "./DataSource";
import { Vehicle } from "../models";
import { Role, Operation, Resource } from "../../shared/typings";
import UserAccessor from "./types/UserAccessor";
import RBAC from "../utils/rbac";
import {
	InvalidPermissionException,
	ResourceNotFoundException
} from "../utils/exceptions";

export default class Client extends DataSource {
	constructor(db: any, userAccessor: UserAccessor) {
		super(db, userAccessor, Resource.CLIENTS);
	}

	get = async (id: number): Promise<any> => {
		let role: Role = this.user.role;
		let foundClient = await this.getClient(id, {
			attributes: {
				exclude: RBAC.getExcludedFields(role, Operation.READ, Resource.CLIENTS)
			}
		});
		if (!foundClient) {
			throw new ResourceNotFoundException(
				`Client with ID of ${id} is not found.`
			);
		}
		let accessible = await RBAC.can(role, Operation.READ, Resource.CLIENTS, {
			accessor: this.user,
			target: foundClient
		});
		if (!accessible) {
			throw new InvalidPermissionException();
		}
		return foundClient;
	};

	async getAll(): Promise<any> {
		let role: Role = this.user.role;
		let foundClients = await this.getClients({
			attributes: {
				exclude: RBAC.getExcludedFields(role, Operation.READ, Resource.CLIENTS)
			}
		});
		let vehicles = [];
		for (let vehicle of foundClients) {
			let accessible = await RBAC.can(role, Operation.READ, Resource.CLIENTS, {
				accessor: this.user,
				target: vehicle
			});
			if (accessible) {
				vehicles.push(vehicle);
			}
		}

		return vehicles;
	}

	update = async (id: number, data?: any): Promise<[any, any]> => {
		let foundClient = await this.get(id);

		const { access, excludedFields } = await this.getUserPermissions(
			Operation.UPDATE,
			{
				accessor: this.user,
				target: foundClient
			}
		);
		if (!access) {
			throw new InvalidPermissionException();
		}
		if (data.locations && !excludedFields.includes("locations")) {
			await foundClient.setLocations(data.locations);
			await Vehicle.update(
				{ clientId: null },
				{
					where: { clientId: id, locationId: { [Op.notIn]: data.locations } }
				}
			);
		}
		if (data.users && !excludedFields.includes("users")) {
			await foundClient.setUsers(data.users);
		}
		if (data.vehicles && !excludedFields.includes("vehicles")) {
			await foundClient.setVehicles(data.vehicles);
		}

		await foundClient.update(
			_.omit(data, [...excludedFields, "locations", "users", "vehicles"])
		);

		return [foundClient, await this.get(id)];
	};

	async delete(id: number): Promise<any> {
		let role: Role = this.user.role;
		let foundClient = await this.get(id);

		let accessible = await RBAC.can(role, Operation.DELETE, Resource.CLIENTS, {
			accessor: this.user,
			target: foundClient
		});

		if (!accessible) {
			throw new InvalidPermissionException();
		}
		await foundClient.destroy();
		return foundClient;
	}

	async create(data: object) {
		let role: Role = this.user.role;

		let accessible = await RBAC.can(role, Operation.CREATE, Resource.CLIENTS, {
			accessor: this.user,
			body: data
		});
		if (!accessible) {
			throw new InvalidPermissionException();
		}
		let createdClient = await this.createClient(data);
		return createdClient;
	}
}
