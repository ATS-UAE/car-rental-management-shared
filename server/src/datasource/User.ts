import bcrypt from "bcryptjs";
import DataSource from "./DataSource";
import { Operation, Resource, Role } from "../variables/enums";
import UserAccessor from "./types/UserAccessor";
import RBAC from "../utils/rbac";
import {
	InvalidPermissionException,
	ResourceNotFoundException
} from "../utils/exceptions";

export default class User extends DataSource {
	user: UserAccessor;

	constructor(db: any, userAccessor: UserAccessor) {
		super(db);
		this.user = userAccessor;
	}

	async get(id: number): Promise<any> {
		let role: Role = this.user.role;
		let foundUser = await this.getUser(id, {
			attributes: {
				exclude: [
					...RBAC.getExcludedFields(role, Operation.READ, Resource.USERS),
					"password"
				]
			}
		});
		if (!foundUser) {
			throw new ResourceNotFoundException(
				`User with ID of ${id} is not found.`
			);
		}
		let accessible = await RBAC.can(role, Operation.READ, Resource.USERS, {
			accessor: this.user,
			target: foundUser
		});

		if (!accessible) {
			throw new InvalidPermissionException();
		}

		return foundUser;
	}

	async getAll(): Promise<any> {
		let role: Role = this.user.role;
		let foundUsers = await this.getUsers({
			attributes: {
				exclude: [
					...RBAC.getExcludedFields(role, Operation.READ, Resource.USERS),
					"password"
				]
			}
		});
		let users = [];
		for (let user of foundUsers) {
			let accessible = await RBAC.can(role, Operation.READ, Resource.USERS, {
				accessor: this.user,
				target: user
			});
			if (accessible) {
				users.push(user);
			}
		}

		return users;
	}

	async update(id: number, data?: object, options?: object): Promise<any> {
		let role: Role = this.user.role;
		let foundUser = await this.get(id);
		if (!foundUser) {
			throw new ResourceNotFoundException(
				`User with ID of ${id} is not found.`
			);
		}
		let accessible = await RBAC.can(role, Operation.UPDATE, Resource.USERS, {
			accessor: this.user,
			target: foundUser,
			body: data
		});
		if (!accessible) {
			throw new InvalidPermissionException();
		}
		let hashedPassword =
			data["password"] && (await bcrypt.hash(data["password"], 10));
		await foundUser.update(
			{ ...data, password: data["password"] && hashedPassword },
			options
		);
		return this.get(id);
	}

	async delete(id: number): Promise<any> {
		let role: Role = this.user.role;
		let foundUser = await this.get(id);
		if (!foundUser) {
			throw new ResourceNotFoundException(
				`User with ID of ${id} is not found.`
			);
		}
		let accessible = await RBAC.can(role, Operation.DELETE, Resource.USERS, {
			accessor: this.user,
			target: foundUser
		});
		if (!accessible) {
			throw new InvalidPermissionException();
		}
		await foundUser.destroy();
		return foundUser;
	}

	async create(data: any, options: { invited?: boolean } = {}): Promise<any> {
		let createdUser = await this.createUser({
			...data,
			approved: !options.invited
		});
		return createdUser;
	}
}
