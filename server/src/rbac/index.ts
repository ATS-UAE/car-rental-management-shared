import UserType from "../variables/enums/UserType";
import ResourceType from "../variables/enums/Resource";

export class RBAC {
	name: string;
	roles: Role[];
	constructor(name: string) {
		this.name = name;
		this.roles = [];
	}
	addRole(role: Role): void {
		let existing = this.roles.find(
			(roleItem: Role) => roleItem.name === role.name
		);
		if (existing) throw new Error("Role already exists");
		this.roles.push(role);
	}

	can(
		role: Role | UserType,
		action: string,
		resource: Resource,
		params: any
	): Promise<boolean> {
		return new Promise(async resolve => {
			let existingRole: Role | undefined = this.roles.find((roleItem: Role) => {
				if (role instanceof Role) {
					return role.name === roleItem.name;
				}
				return role === roleItem.name;
			});
			if (!existingRole) throw new Error("Role does not exist.");
			let permitted = await existingRole.can(action, resource, params);
			resolve(permitted);
		});
	}

	getExcludedFields(role: string, action: string, resource: string) {
		let $role: Role | undefined = this.roles.find(
			($role: Role) => $role.name === role
		);
		if ($role) {
			let excludedFields = [];
			if ($role.extends) {
				for (let role of $role.extends) {
					let $action = role.actions.find(
						$action =>
							$action.name === action && $action.resource.name === resource
					);
					if ($action) {
						excludedFields.push(...$action.excludedFields);
					}
				}
			}
			let $action = $role.actions.find(
				$action => $action.name === action && $action.resource.name === resource
			);
			if ($action) {
				excludedFields.push(...$action.excludedFields);
			}
			return excludedFields;
		} else throw new Error("Role does not exist.");
	}
	toObject() {
		return {
			name: this.name,
			roles: this.roles.map(role => ({
				name: role.name,
				access: role.actions.reduce(
					(acc: { [key: string]: any }, action) => {
						if (!acc.resources[action.resource.name]) {
							acc.resources[action.resource.name] = {
								permissions: {}
							};
						}
						acc.resources[action.resource.name].permissions[action.name] = {
							conditional: action.condition ? true : false,
							excludedFields: action.excludedFields
						};
						return acc;
					},
					{
						resources: {}
					}
				),
				extends: role.extends.map(role => role.name)
			}))
		};
	}
}

export class Role {
	name: string;
	actions: Action[];
	extends: Role[];

	constructor(name: string) {
		this.name = name;
		this.actions = [];
		this.extends = [];
	}

	addPermission(action: Action) {
		let existingAction = this.actions.find(
			currentAction =>
				currentAction.name === action.name &&
				currentAction.resource.name === action.resource.name
		);
		if (existingAction) throw new Error("Action already exists.");
		this.actions.push(action);
	}

	extend(role: Role) {
		this.extends.push(role);
	}
	can(
		action: string,
		resource: Resource | ResourceType,
		params: any
	): Promise<boolean> {
		return new Promise(async resolve => {
			let actions = this.actions;
			let resourceName =
				resource instanceof Resource ? resource.name : resource;
			for (let i = 0; i < actions.length; i++) {
				let currentAction: Action = actions[i];
				if (
					action === currentAction.name &&
					currentAction.resource.name === resourceName
				) {
					let permitted;
					try {
						permitted = await currentAction.perform(params);
					} catch (e) {
						permitted = false;
					}
					if (permitted) {
						return resolve(permitted);
					}
				}
			}
			// Contine looking for matching actions, incase role is extended.
			if (this.extends) {
				for (let i = 0; i < this.extends.length; i++) {
					let extendedRole = this.extends[i];
					let permitted: boolean = await extendedRole.can(
						action,
						resource,
						params
					);
					if (permitted) {
						return resolve(permitted);
					}
				}
			}
			return resolve(false);
		});
	}
}

export class Action {
	name: string;
	resource: Resource;
	condition?: ((params?: any) => Promise<boolean> | boolean) | null;
	excludedFields: string[];
	constructor(
		name: string,
		resource: Resource,
		condition?: ((params?: any) => Promise<boolean> | boolean) | null,
		excludedFields: string[] = []
	) {
		this.name = name;
		this.resource = resource;
		this.condition = condition;
		this.excludedFields = excludedFields;
	}
	perform(params?: any) {
		if (this.condition) {
			return this.condition(params);
		}
		return true;
	}
}

export class Resource {
	name: string;

	constructor(name: string) {
		this.name = name;
	}
}

export default RBAC;
