import axios from "axios";
import { AUTH_LOGIN, FETCH_ENUMS, FETCH_USERS } from "./types";

const API_URL = process.env.REACT_APP_CAR_BOOKING_API_DOMAIN;

export const authLogin = (username, password) => dispatch =>
	new Promise((resolve, reject) => {
		axios
			.post(
				`${API_URL}/api/carbooking/auth/login`,
				{
					username,
					password
				},
				{ withCredentials: true }
			)
			.then(data => {
				resolve(data.data);
				dispatch({ type: AUTH_LOGIN, payload: data.data });
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

export const fetchUsers = () => dispatch =>
	new Promise((resolve, reject) => {
		axios
			.get(`${API_URL}/api/carbooking/users`, { withCredentials: true })
			.then(data => {
				resolve(data.data);
				dispatch({ type: FETCH_USERS, payload: data.data });
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

export const createUser = user => dispatch =>
	new Promise((resolve, reject) => {
		axios
			.post(`${API_URL}/api/carbooking/users/`, user, {
				withCredentials: true
			})
			.then(data => {
				axios
					.get(`${API_URL}/api/carbooking/users`, { withCredentials: true })
					.then(data => {
						dispatch({ type: FETCH_USERS, payload: data.data });
					});
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

export const updateUser = user => dispatch =>
	new Promise((resolve, reject) => {
		axios
			.patch(`${API_URL}/api/carbooking/users/${user.id}`, user, {
				withCredentials: true
			})
			.then(data => {
				axios
					.get(`${API_URL}/api/carbooking/users`, { withCredentials: true })
					.then(data => {
						dispatch({ type: FETCH_USERS, payload: data.data });
					});
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

export const fetchEnums = () => dispatch =>
	new Promise((resolve, reject) => {
		axios
			.get(`${API_URL}/api/carbooking/enums`, { withCredentials: true })
			.then(data => {
				resolve(data.data);
				dispatch({ type: FETCH_ENUMS, payload: data.data });
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
