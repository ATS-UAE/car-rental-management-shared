import DataSource from "./DataSource";
import { Role, Operation, Resource } from "../variables/enums";
import userAccessor from "./types/userAccessor";
import RBAC from "../utils/rbac";
import {
	InvalidPermissionException,
	ResourceNotFoundException
} from "../utils/exceptions";

export default class Client extends DataSource {
	user: userAccessor;

	constructor(db: any, userAccessor: userAccessor) {
		super(db);
		this.user = userAccessor;
	}

	async get(id: number): Promise<any> {
		let role: Role = this.user.role.name;
		let foundClient = await this.getClient(id);
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
	}

	async getAll(): Promise<any> {
		let role: Role = this.user.role.name;
		let foundClients = await this.getClients({
			exclude: RBAC.getExcludedFields(role, Operation.READ, Resource.CLIENTS)
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

	async update(id: number, data?: object): Promise<any> {
		let role: Role = this.user.role.name;
		let foundClient = await this.get(id);

		let accessible = await RBAC.can(role, Operation.UPDATE, Resource.CLIENTS, {
			accessor: this.user,
			target: foundClient
		});

		if (!accessible) {
			throw new InvalidPermissionException();
		}
		await foundClient.update(data);
		return this.get(id);
	}

	async delete(id: number): Promise<any> {
		let role: Role = this.user.role.name;
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
		let role: Role = this.user.role.name;

		let accessible = await RBAC.can(role, Operation.CREATE, Resource.CLIENTS, {
			accessor: this.user
		});
		if (!accessible) {
			throw new InvalidPermissionException();
		}
		let createdClient = await this.createClient(data);
		return createdClient;
	}
}
