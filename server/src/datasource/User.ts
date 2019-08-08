import DataSource from "./DataSource";
import { UserType, Operation, Resource, Role } from "../variables/enums";
import userAccessor from "./types/userAccessor";
import RBAC from "../utils/rbac";
import {
	InvalidPermissionException,
	ResourceNotFoundException
} from "../utils/exceptions";

export default class User extends DataSource {
	user: userAccessor;

	constructor(db: any, userAccessor: userAccessor) {
		super(db);
		this.user = userAccessor;
	}

	async get(id: number): Promise<any> {
		let role: UserType = this.user.role.name;
		let foundUser = await this.getUser(id, {
			exclude: RBAC.getExcludedFields(role, Operation.READ, Resource.USERS)
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
		let role: UserType = this.user.role.name;
		let foundUsers = await this.getUsers({
			exclude: RBAC.getExcludedFields(role, Operation.READ, Resource.USERS)
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
		let role: UserType = this.user.role.name;
		let foundUser = await this.get(id);
		if (!foundUser) {
			throw new ResourceNotFoundException(
				`User with ID of ${id} is not found.`
			);
		}
		let accessible = await RBAC.can(role, Operation.UPDATE, Resource.USERS, {
			accessor: this.user,
			target: foundUser
		});
		if (!accessible) {
			throw new InvalidPermissionException();
		}
		await foundUser.update(data, options);
		return this.get(id);
	}

	async delete(id: number): Promise<any> {
		let role: UserType = this.user.role.name;
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
		let role: UserType = this.user.role.name;

		let accessible =
			options.invited ||
			(await RBAC.can(role, Operation.CREATE, Resource.USERS, {
				accessor: this.user
			}));
		if (!accessible) {
			throw new InvalidPermissionException();
		}
		let newUserRole = await this.db.Role.findByPk(data.roleId);
		let guestRole = await this.db.Role.findOne({
			where: { name: Role.GUEST }
		});
		let createdUser = await this.createUser({
			...data,
			roleId: options.invited ? guestRole.id : newUserRole.id,
			approved: !options.invited
		});
		return createdUser;
	}
}
