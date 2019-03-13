const Q = require("q");

function RBAC(roles) {
	this.roles = {};
	this.addRoles(roles);
}

RBAC.prototype.can = function(role, operation, params, cb) {
	if (typeof params === "function") {
		cb = params;
		params = undefined;
	}

	let callback = cb || (() => {});

	return Q.Promise((resolvePromise, rejectPromise) => {
		// Collect resolve handling
		function resolve(value) {
			resolvePromise(value);
			callback(undefined, value);
		}

		// Collect error handling
		function reject(err) {
			rejectPromise(err);
			callback(err);
		}

		if (typeof role !== "string") {
			throw new TypeError("Expected first parameter to be string : role");
		}

		if (typeof operation !== "string") {
			throw new TypeError("Expected second parameter to be string : operation");
		}

		let $role = this.roles[role];

		if (!$role) {
			throw new Error("Undefined role");
		}

		// IF this operation is not defined at current level try higher
		if (!$role.can[operation]) {
			// If no parents reject
			if (!$role.inherits) {
				return resolve(false);
			}
			// Return if any parent resolves true or all reject
			return Q.any(
				$role.inherits.map(parent => this.can(parent, operation, params))
			).then(resolve, reject);
		}

		// We have the operation resolve
		if ($role.can[operation] === 1) {
			return resolve(true);
		}

		// Operation is conditional, run async function
		if (typeof $role.can[operation] === "function") {
			$role.can[operation](params || {}, function(err, result) {
				if (err) {
					return reject(err);
				}
				return resolve(result);
			});
		}
		// No operation reject as false
		resolve(false);
	});
};

RBAC.prototype.addRoles = function(roles, cb = () => {}) {
	return Q.promise((resolve, reject) => {
		function rejectPromise(err) {
			cb(err);
			reject(err);
		}

		function resolvePromise() {
			resolve();
			cb();
		}

		if (typeof roles === "function") {
			// Asynchronously add a roles by providing a function as an argument.
			return Q.nfcall(roles)
				.then(data => this.addRoles(data))
				.catch(err => {
					rejectPromise(err);
				});
		}
		if (typeof roles !== "object") {
			rejectPromise("Expected object or function as input for 'roles'");
		}
		let map = {};
		Object.keys(roles).forEach(role => {
			map[role] = {
				can: {}
			};
			if (roles[role].inherits) {
				map[role].inherits = roles[role].inherits;
			}
			roles[role].can.forEach(operation => {
				if (typeof operation === "string") {
					map[role].can[operation] = 1;
				} else if (
					typeof operation.name === "string" &&
					typeof operation.when === "function"
				) {
					map[role].can[operation.name] = operation.when;
				} else {
					cb("Expected roles to be typeof string or an object");
				}
				resolvePromise();
			});
		});
		this.roles = { ...this.roles, ...map };
		cb(undefined, roles);
	});
};

function Resource(name, operation, condition) {
	if (!name) {
		throw new Error("Resource name is required.");
	}
	this.name = name;
	this.operation = operation;
	this.condition = condition;
}

Resource.prototype.getPermission = function(operation, condition) {
	let name = this.name;
	let $operation = operation || this.operation;
	let $condition = condition || this.condition;
	if (!operation) {
		throw new Error("No operation given on Resource.");
	}
	// operation can be an array.
	if ($operation instanceof Array) {
		return $operation.map(op => {
			if (typeof $condition === "function") {
				return {
					name: `${name}:${op}`,
					when: $condition
				};
			}
			return `${name}:${op}`;
		});
	}
	if (!$operation) throw new Error("No operation is defined");
	if (typeof $condition === "function") {
		return {
			name: `${name}:${$operation}`,
			when: $condition
		};
	} else {
		return `${name}:${$operation}`;
	}
};

Resource.OPERATIONS = {
	CREATE: "CREATE",
	READ: "READ",
	UPDATE: "UPDATE",
	DELETE: "DELETE"
};

module.exports = { RBAC, Resource };
