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
		if (action !== "get")
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
	});

export const api = {};
api.createUser = user =>
	new Promise((resolve, reject) => {
		axios
			.post(`${API_URL}/api/carbooking/users`, user, { withCredentials: true })
			.then(data => {
				resolve(data.data);
			})
			.catch(error => {
				if (
					error &&
					error.response &&
					error.response.data &&
					error.response.data.message
				) {
					reject(error.response.data.message);
				}
				reject(error.message || "Unknown error has occured.");
			});
	});

api.inviteGuest = email =>
	new Promise((resolve, reject) => {
		axios
			.post(
				`${API_URL}/api/carbooking/invites`,
				{ email },
				{ withCredentials: true }
			)
			.then(data => {
				resolve(data.data);
			})
			.catch(error => {
				if (
					error &&
					error.response &&
					error.response.data &&
					error.response.data.message
				) {
					reject(error.response.data.message);
				}
				reject(error.message || "Unknown error has occured.");
			});
	});

api.createVehicle = vehicle =>
	new Promise((resolve, reject) => {
		axios
			.post(`${API_URL}/api/carbooking/vehicles`, vehicle, {
				withCredentials: true
			})
			.then(data => {
				resolve(data.data);
			})
			.catch(error => {
				if (
					error &&
					error.response &&
					error.response.data &&
					error.response.data.message
				) {
					reject(error.response.data.message);
				}
				reject(error.message || "Unknown error has occured.");
			});
	});
api.updateVehicle = vehicle =>
	executeFromAPI("patch", `/api/carbooking/vehicles/${vehicle.id}`, vehicle);
