import axios from "axios";
import moment from "moment";
import { bookingStatus } from "../variables/enums";
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

export const isVehicleAvailableForBooking = (vehicle, bookingId) => {
	let available = true;
	if (vehicle && vehicle.bookings) {
		for (const booking of vehicle.bookings) {
			let status = getBookingStatus(booking);
			if (
				status === bookingStatus.PENDING ||
				status === bookingStatus.ONGOING ||
				status === bookingStatus.APPROVED
			) {
				available = false;
			} else if (bookingId && bookingId === booking.id) {
				available = true;
			}
		}
	}
	return available;
};

export const getBookingStatus = booking => {
	let status = bookingStatus.UNKNOWN;
	let currentTime = moment();
	let hasPassedFrom = moment(booking.from, "X").isSameOrBefore(currentTime);
	let hasPassedTo = moment(booking.to, "X").isSameOrBefore(currentTime);
	if (booking.approved) {
		if (hasPassedFrom && !hasPassedTo) status = bookingStatus.ONGOING;
		else if (hasPassedTo) status = bookingStatus.FINISHED;
		else status = bookingStatus.APPROVED;
	} else {
		if (booking.approved === null) {
			if (hasPassedFrom) status = bookingStatus.EXPIRED;
			else status = bookingStatus.PENDING;
		} else if (booking.approved === false) status = bookingStatus.DENIED;
	}
	return status;
};

export const getRelatedDataById = (findId, list, many = false) => {
	let data = [];
	for (let item of list) {
		if (item.id === findId) {
			if (!many) return item;
			else data.push(item);
		}
	}
	return data;
};

export const search = (keyWord, word) => {
	let pass = true;
	if (keyWord && word) {
		pass = Boolean(
			keyWord.split(" ").every(key => new RegExp(key, "i").test(word))
		);
	}
	return pass;
};

export const cancelablePromise = promise => {
	let hasCanceled = false;

	const wrappedPromise = new Promise(async (resolve, reject) => {
		if (promise instanceof Promise) {
			promise.then(
				value =>
					hasCanceled ? reject({ isCanceled: true, value }) : resolve(value),
				error => reject({ isCanceled: hasCanceled, error })
			);
		} else {
			resolve(promise);
		}
	});

	return {
		promise: wrappedPromise,
		cancel: () => (hasCanceled = true)
	};
};

export const validators = {
	username: new Validator(
		v => /^.{4,16}$/.test(v),
		"Min 4 characters, max 16 characters."
	),
	minLength: length =>
		new Validator(
			v => v => new RegExp(`^.{${length},}$`).test(v),
			`Minimum ${length} characters.`
		),
	maxLength: length =>
		new Validator(
			v => v => new RegExp(`^.{0,${length}}$`).test(v),
			`Maximum ${length} characters.`
		),
	usernameCharacters: new Validator(
		v => /^[a-z0-9_-]+$/.test(v),
		"No special characters."
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

const executeFromAPI = (action, url, body, config) =>
	new Promise((resolve, reject) => {
		let formData = body;
		const axiosConfig = {
			withCredentials: true
		};
		if (body && config && config.formData) {
			formData = new FormData();
			for (let key in body) {
				if (body[key] instanceof Blob) formData.append(key, body[key]);
				else formData.append(key, JSON.stringify(body[key]));
			}
			axiosConfig.headers = {
				"Content-Type": "multipart/form-data"
			};
		}
		if (action !== "get" && action !== "delete") {
			axios[action](`${API_URL}${url}`, formData, axiosConfig)
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
			axios[action](`${API_URL}${url}`, axiosConfig)
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
	// auth
	authLogin: credentials =>
		executeFromAPI("post", "/api/carbooking/auth/login", credentials),
	authLogout: () => executeFromAPI("get", "/api/carbooking/auth/logout"),
	resetPassword: data =>
		executeFromAPI("post", "/api/carbooking/auth/forgot", data),
	fetchCurrentUserDetails: () =>
		executeFromAPI("get", "/api/carbooking/auth/me"),
	updateMe: data => executeFromAPI("patch", "/api/carbooking/auth/me", data),

	// enums
	fetchEnums: () => executeFromAPI("get", "/api/carbooking/enums"),

	// users
	fetchUsers: () => executeFromAPI("get", "/api/carbooking/users"),
	fetchUser: id => executeFromAPI("get", `/api/carbooking/users/${id}`),
	createUser: user =>
		executeFromAPI("post", "/api/carbooking/users", user, {
			formData: true
		}),
	updateUser: user =>
		executeFromAPI("patch", `/api/carbooking/users/${user.id}`, user, {
			formData: true
		}),
	deleteUser: user =>
		executeFromAPI("delete", `/api/carbooking/users/${user.id}`),

	// invites
	inviteGuest: invite =>
		executeFromAPI("post", "/api/carbooking/invites", invite),

	// vehicles
	createVehicle: vehicle =>
		executeFromAPI("post", "/api/carbooking/vehicles", vehicle, {
			formData: true
		}),
	fetchVehicles: () => executeFromAPI("get", "/api/carbooking/vehicles"),
	fetchVehicle: id => executeFromAPI("get", `/api/carbooking/vehicles/${id}`),
	updateVehicle: vehicle =>
		executeFromAPI("patch", `/api/carbooking/vehicles/${vehicle.id}`, vehicle, {
			formData: true
		}),

	// bookings
	createBooking: booking =>
		executeFromAPI("post", "/api/carbooking/bookings/", booking),
	fetchBookings: () => executeFromAPI("get", "/api/carbooking/bookings"),
	fetchBooking: id => executeFromAPI("get", `/api/carbooking/bookings/${id}`),
	updateBooking: booking =>
		executeFromAPI("patch", `/api/carbooking/bookings/${booking.id}`, booking),
	deleteBooking: booking =>
		executeFromAPI("delete", `/api/carbooking/bookings/${booking.id}`),

	// locations
	createLocation: location =>
		executeFromAPI("post", "/api/carbooking/locations", location, {
			formData: true
		}),
	fetchLocations: () => executeFromAPI("get", "/api/carbooking/locations"),
	fetchLocation: id => executeFromAPI("get", `/api/carbooking/locations/${id}`),

	updateLocation: location =>
		executeFromAPI(
			"patch",
			`/api/carbooking/locations/${location.id}`,
			location,
			{
				formData: true
			}
		),
	deleteLocation: location =>
		executeFromAPI("delete", `/api/carbooking/locations/${location.id}`),

	// Accidents
	fetchAccident: id => executeFromAPI("get", `/api/carbooking/accidents/${id}`),
	fetchAccidents: () => executeFromAPI("get", "/api/carbooking/accidents"),
	createAccident: accident =>
		executeFromAPI("post", "/api/carbooking/accidents", accident, {
			formData: true
		}),
	updateAccident: accident =>
		executeFromAPI(
			"patch",
			`/api/carbooking/accidents/${accident.id}`,
			accident,
			{
				formData: true
			}
		),
	deleteAccident: id =>
		executeFromAPI("delete", `/api/carbooking/accidents/${id}`),

	// categories
	fetchCategories: () => executeFromAPI("get", "/api/carbooking/categories"),
	createCategories: category =>
		executeFromAPI("post", "/api/carbooking/categories", category),
	updateCategory: category =>
		executeFromAPI(
			"patch",
			`/api/carbooking/categories/${category.id}`,
			category
		),
	deleteCategory: category =>
		executeFromAPI("delete", `/api/carbooking/categories/${category.id}`),
	// access
	checkAccess: accessParams =>
		executeFromAPI("post", "/api/carbooking/access", accessParams)
};

export const rangeOverlap = (x1, x2, y1, y2) => {
	return Math.max(x1, y1) <= Math.min(x2, y2);
};

export const waitForAll = async obj => {
	if (obj instanceof Array) {
		for (let e of obj) {
			await waitForAll(e);
		}
	} else {
		for (let prop in obj) {
			if (obj[prop]) {
				// If the propriety has a 'then' function it's a Promise
				if (typeof obj[prop].then === "function") {
					obj[prop] = await obj[prop];
				}
				if (obj)
					if (typeof obj[prop] === "object") {
						obj[prop] = await waitForAll(obj[prop]);
					}
			}
		}
	}
	return obj;
};
