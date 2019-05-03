import axios from "axios";
export function runIfExistFunction(func, parent, args) {
	return function() {
		if (typeof func === "function") {
			if (parent) {
				func.apply(parent, args);
			}
			func(args);
		}
	};
}

export function Validator(test, errorMessage) {
	this.test = test;
	this.error = errorMessage;
}

// Returns errored validators.
Validator.runThroughValidators = function runThroughValidators(
	validators = [],
	validatee = ""
) {
	let errors = [];
	for (let i = 0; i < validators.length; i++) {
		let validator = validators[i].test.bind(validators[i].test);
		if (!validator(validatee)) errors.push(validators[i]);
	}
	return errors;
};

export const validators = {
	username: new Validator(
		v => /.{4,}/.test(v),
		"Username should be greater than 3 characters."
	),
	password: new Validator(
		v => /.{8,}/.test(v),
		"Password should be greater than 8 characters."
	),
	email: new Validator(
		v =>
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
				v
			),
		"Invalid email."
	),
	requiredField: new Validator(
		v => (v === undefined || v === "" ? false : true),
		"This field is required."
	)
};

const API_URL = process.env.REACT_APP_CAR_BOOKING_API_DOMAIN;

const executeFromAPI = (action, url, body) =>
	new Promise((resolve, reject) => {
		const config = { withCredentials: true };
		if (action !== "get" && action !== "delete") {
			axios[action](`${API_URL}${url}`, body, config)
				.then(data => resolve(data.data))
				.catch(error => {
					if (
						error &&
						error.response &&
						error.response.data &&
						error.response.data.message
					) {
						reject(error.response.data.message, error);
					}
					reject(error.message || "Unknown error has occurred.", error);
				});
		} else if (action === "get" || action === "delete") {
			axios[action](`${API_URL}${url}`, config)
				.then(data => resolve(data.data))
				.catch(error => {
					if (
						error &&
						error.response &&
						error.response.data &&
						error.response.data.message
					) {
						reject(error.response.data.message, error);
					}
					reject(error.message || "Unknown error has occurred.", error);
				});
		} else {
			reject(`Unknown action '%{action}'`);
		}
	});

export function getPermissionData(permissions, role) {
	let $permissions = permissions;
	let $role = role;
	if (permissions && permissions.data && permissions.data.permissions) {
		$permissions = permissions.data.permissions;
	}
	if (role && role.data && role.data.role) {
		$role = role.data.role.name;
	}
	let access = {};
	let rolePages = $permissions.roles.find(roleItem => roleItem.name === $role);
	if (rolePages) {
		if (rolePages.extends) {
			for (let role of rolePages.extends) {
				access = { ...getPermissionData($permissions, role), ...access };
			}
		}
		for (let resourceKey in rolePages.access.resources) {
			if (!access[resourceKey]) {
				access[resourceKey] = {};
			}
			for (let permissionKey in rolePages.access.resources[resourceKey]
				.permissions) {
				if (!access[resourceKey][permissionKey]) {
					access[resourceKey][permissionKey] = {};
				}
				access[resourceKey][permissionKey] = {
					...access[resourceKey][permissionKey],
					...rolePages.access.resources[resourceKey].permissions[permissionKey]
				};
			}
			access[resourceKey] = {
				...access[resourceKey],
				...rolePages.access.resources[resourceKey]
			};
		}
	}
	return access;
}

export function toTitleWords(word, delimiter = "_") {
	let splitWord = word.split(delimiter);
	let result = "";
	for (let word of splitWord) {
		for (let i = 0; i < word.length; i++) {
			let letter = word[i];
			if (i === 0) {
				result += letter.toUpperCase();
			} else {
				result += letter.toLowerCase();
			}
		}
		result += " ";
	}
	return result;
}

export const api = {
	authLogin: credentials =>
		executeFromAPI("post", "/api/carbooking/auth/login", credentials),
	authLogout: () => executeFromAPI("get", "/api/carbooking/auth/logout"),
	fetchCurrentUserDetails: () =>
		executeFromAPI("get", "/api/carbooking/auth/me"),

	fetchEnums: () => executeFromAPI("get", "/api/carbooking/enums"),

	fetchUsers: () => executeFromAPI("get", "/api/carbooking/users"),
	fetchUser: id => executeFromAPI("get", `/api/carbooking/users/${id}`),
	createUser: user => executeFromAPI("post", "/api/carbooking/users", user),
	updateUser: user =>
		executeFromAPI("patch", `/api/carbooking/users/${user.id}`, user),

	inviteGuest: invite =>
		executeFromAPI("post", "/api/carbooking/invites", invite),

	createVehicle: vehicle =>
		executeFromAPI("post", "/api/carbooking/vehicles", vehicle),
	fetchVehicles: () => executeFromAPI("get", "/api/carbooking/vehicles"),
	fetchVehicle: id => executeFromAPI("get", `/api/carbooking/vehicles/${id}`),
	updateVehicle: vehicle =>
		executeFromAPI("patch", `/api/carbooking/vehicles/${vehicle.id}`, vehicle),

	createBooking: booking =>
		executeFromAPI("post", "/api/carbooking/bookings/", booking),
	fetchBookings: () => executeFromAPI("get", "/api/carbooking/bookings"),
	fetchBooking: id => executeFromAPI("get", `/api/carbooking/bookings/${id}`),
	updateBooking: booking =>
		executeFromAPI("patch", `/api/carbooking/bookings/${booking.id}`, booking),
	deleteBooking: booking =>
		executeFromAPI("delete", `/api/carbooking/bookings/${booking.id}`),

	createLocation: location =>
		executeFromAPI("post", "/api/carbooking/locations", location),
	fetchLocations: () => executeFromAPI("get", "/api/carbooking/locations"),
	updateLocation: location =>
		executeFromAPI(
			"patch",
			`/api/carbooking/locations/${location.id}`,
			location
		),
	deleteLocation: location =>
		executeFromAPI("delete", `/api/carbooking/locations/${location.id}`),

	checkAccess: accessParams =>
		executeFromAPI("post", "/api/carbooking/access", accessParams)
};
