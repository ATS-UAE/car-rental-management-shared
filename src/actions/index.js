import axios from "axios";
import { AUTH_LOGIN } from "./types";

const API_URL = process.env.REACT_APP_CAR_BOOKING_API_DOMAIN;
console.log(API_URL);

export const authLogin = (username, password) => dispatch =>
	new Promise((resolve, reject) => {
		axios
			.post(`${API_URL}/api/carbooking/auth/login`, {
				username,
				password
			})
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
