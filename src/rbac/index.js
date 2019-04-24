class RBAC {
	constructor(name) {
		this.name = name;
		this.roles = [];
	}
	addRole(role) {
		let existing = this.roles.find(roleItem => roleItem.name === role.name);
		if (existing) throw new Error("Role already exists");
		this.roles.push(role);
	}
	can(role, action, resource, params) {
		return new Promise(async resolve => {
			let existingRole = this.roles.find(roleItem => {
				if (role.name) {
					return role.name === roleItem.name;
				}
				return role === roleItem.name;
			});
			if (!existingRole) throw new Error("Role does not exist.");
			let permitted = await existingRole.can(action, resource, params);
			resolve(permitted);
		});
	}
	getExcludedFields(role, action, resource) {
		let $role = this.roles.find($role => $role.name === role);
		if ($role) {
			let excludedFields = [];
			if ($role.extends) {
				for (let role of $role.extends) {
					let $action = role.actions.find(
						$action =>
							$action.name === action && $action.resource.name === resource
					);
					excludedFields.push(...$action.excludedFields);
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
					(acc, action) => {
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

class Role {
	constructor(name) {
		this.name = name;
		this.actions = [];
		this.extends = [];
	}
	addPermission(action) {
		let existingAction = this.actions.find(
			currentAction =>
				currentAction.name === action.name &&
				currentAction.resource.name === action.resource.name
		);
		if (existingAction) throw new Error("Action already exists.");
		this.actions.push(action);
	}
	extend(role) {
		this.extends.push(role);
	}
	can(action, resource, params) {
		return new Promise(async resolve => {
			let actions = this.actions;
			let resourceName = resource.name || resource;
			for (let i = 0; i < actions.length; i++) {
				let currentAction = actions[i];
				if (
					action === currentAction.name &&
					currentAction.resource.name === resourceName
				) {
					let permitted = await currentAction.perform(params);
					// Contine looking for matching actions, incase role is extended.
					if (permitted) {
						return resolve(permitted);
					}
				}
			}
			if (this.extends) {
				for (let i = 0; i < this.extends.length; i++) {
					let extendedRole = this.extends[i];
					let permitted = await extendedRole.can(action, resource, params);
					if (permitted) {
						return resolve(permitted);
					}
				}
			}
			return resolve(false);
		});
	}
}

class Resource {
	constructor(name) {
		this.name = name;
	}
}

class Action {
	constructor(name, resource, condition = null, excludedFields = []) {
		this.name = name;
		this.resource = resource;
		this.condition = condition;
		this.excludedFields = excludedFields;
	}
	perform(params) {
		if (this.condition) {
			return this.condition(params);
		}
		return true;
	}
}

Action.OPERATIONS = {
	READ: "READ",
	UPDATE: "UPDATE",
	DELETE: "DELETE",
	CREATE: "CREATE"
};

module.exports = { RBAC, Role, Resource, Action };

// const Q = require("q");

// function RBAC(roles) {
// 	this.roles = {};
// 	this.addRoles(roles);
// }

// RBAC.prototype.can = function(role, operation, params, cb) {
// 	if (typeof params === "function") {
// 		cb = params;
// 		params = undefined;
// 	}

// 	let callback = cb || (() => {});

// 	return Q.Promise((resolvePromise, rejectPromise) => {
// 		// Collect resolve handling
// 		function resolve(value) {
// 			resolvePromise(value);
// 			callback(undefined, value);
// 		}

// 		// Collect error handling
// 		function reject(err) {
// 			rejectPromise(err);
// 			callback(err);
// 		}

// 		if (typeof role !== "string") {
// 			throw new TypeError("Expected first parameter to be string : role");
// 		}

// 		if (typeof operation !== "string") {
// 			throw new TypeError("Expected second parameter to be string : operation");
// 		}

// 		let $role = this.roles[role];

// 		if (!$role) {
// 			throw new Error("Undefined role");
// 		}

// 		// IF this operation is not defined at current level try higher
// 		if (!$role.can[operation]) {
// 			// If no parents reject
// 			if (!$role.inherits) {
// 				return resolve(false);
// 			}
// 			// Return if any parent resolves true or all reject
// 			return Q.any(
// 				$role.inherits.map(parent => this.can(parent, operation, params))
// 			).then(resolve, reject);
// 		}

// 		// We have the operation resolve
// 		if ($role.can[operation] === 1) {
// 			return resolve(true);
// 		}

// 		// Operation is conditional, run async function
// 		if (typeof $role.can[operation] === "function") {
// 			$role.can[operation](params || {}, function(err, result) {
// 				if (err) {
// 					return reject(err);
// 				}
// 				return resolve(result);
// 			});
// 		}
// 		// No operation reject as false
// 		resolve(false);
// 	});
// };

// RBAC.prototype.addRoles = function(roles, cb = () => {}) {
// 	return Q.promise((resolve, reject) => {
// 		function rejectPromise(err) {
// 			cb(err);
// 			reject(err);
// 		}

// 		function resolvePromise() {
// 			resolve();
// 			cb();
// 		}

// 		if (typeof roles === "function") {
// 			// Asynchronously add a roles by providing a function as an argument.
// 			return Q.nfcall(roles)
// 				.then(data => this.addRoles(data))
// 				.catch(err => {
// 					rejectPromise(err);
// 				});
// 		}
// 		if (typeof roles !== "object") {
// 			rejectPromise("Expected object or function as input for 'roles'");
// 		}
// 		let map = {};
// 		Object.keys(roles).forEach(role => {
// 			map[role] = {
// 				can: {}
// 			};
// 			if (roles[role].inherits) {
// 				map[role].inherits = roles[role].inherits;
// 			}
// 			roles[role].can.forEach(operation => {
// 				if (typeof operation === "string") {
// 					map[role].can[operation] = 1;
// 				} else if (
// 					typeof operation.name === "string" &&
// 					typeof operation.when === "function"
// 				) {
// 					map[role].can[operation.name] = operation.when;
// 				} else {
// 					cb("Expected roles to be typeof string or an object");
// 				}
// 				resolvePromise();
// 			});
// 		});
// 		this.roles = { ...this.roles, ...map };
// 		cb(undefined, roles);
// 	});
// };

// function Resource(name, operation, condition) {
// 	if (!name) {
// 		throw new Error("Resource name is required.");
// 	}
// 	this.name = name;
// 	this.operation = operation;
// 	this.condition = condition;
// }

// Resource.prototype.getPermission = function(operation, condition) {
// 	let name = this.name;
// 	let $operation = operation || this.operation;
// 	let $condition = condition || this.condition;
// 	if (!operation) {
// 		throw new Error("No operation given on Resource.");
// 	}
// 	// operation can be an array.
// 	if ($operation instanceof Array) {
// 		return $operation.map(op => {
// 			if (typeof $condition === "function") {
// 				return {
// 					name: `${name}:${op}`,
// 					when: $condition
// 				};
// 			}
// 			return `${name}:${op}`;
// 		});
// 	}
// 	if (!$operation) throw new Error("No operation is defined");
// 	if (typeof $condition === "function") {
// 		return {
// 			name: `${name}:${$operation}`,
// 			when: $condition
// 		};
// 	} else {
// 		return `${name}:${$operation}`;
// 	}
// };

// Resource.OPERATIONS = {
// 	CREATE: "CREATE",
// 	READ: "READ",
// 	UPDATE: "UPDATE",
// 	DELETE: "DELETE"
// };

// module.exports = { RBAC, Resource };
