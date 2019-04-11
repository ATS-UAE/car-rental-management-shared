import axios from "axios";
import { access } from "fs";
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
	validatee
) {
	let errors = [];
	for (let i = 0; i < validators.length; i++) {
		let validator = validators[i].test.bind(validators[i].test);
		if (validatee !== undefined && !validator(validatee))
			errors.push(validators[i]);
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
	)
};

const API_URL = process.env.REACT_APP_CAR_BOOKING_API_DOMAIN;

const executeFromAPI = (action, url, body) =>
	new Promise((resolve, reject) => {
		if (action !== "get") {
			axios[action](`${API_URL}${url}`, body, { withCredentials: true })
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
		} else if (action === "get") {
			axios
				.get(`${API_URL}${url}`, { withCredentials: true })
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
			if ((i = 0)) {
				result += letter.toUpperCase();
			}
			result += letter.toUpperCase();
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
	createUser: user => executeFromAPI("post", "/api/carbooking/users", user),
	updateUser: user =>
		executeFromAPI("patch", `/api/carbooking/users/${user.id}`, user),

	inviteGuest: email =>
		executeFromAPI("post", "/api/carbooking/invites", { email }),

	createVehicle: vehicle =>
		executeFromAPI("post", "/api/carbooking/vehicles", vehicle),
	fetchVehicles: () => executeFromAPI("get", "/api/carbooking/vehicles"),
	updateVehicle: vehicle =>
		executeFromAPI("patch", `/api/carbooking/vehicles/${vehicle.id}`, vehicle),

	createBooking: booking =>
		executeFromAPI("post", "/api/carbooking/bookings/", booking),
	fetchBookings: () => executeFromAPI("get", "/api/carbooking/bookings")
};
