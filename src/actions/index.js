import {
	AUTH_LOGIN,
	FETCH_ENUMS,
	FETCH_USERS,
	FETCH_VEHICLES,
	FETCH_BOOKINGS
} from "./types";
import { api } from "../utils";

export const authLogin = (username, password) => dispatch =>
	api
		.authLogin({ username, password })
		.then(data => dispatch({ type: AUTH_LOGIN, payload: data.data }));

export const fetchUsers = () => dispatch =>
	api
		.fetchUsers()
		.then(data => dispatch({ type: FETCH_USERS, payload: data.data }));

export const fetchEnums = () => dispatch =>
	api
		.fetchEnums()
		.then(data => dispatch({ type: FETCH_ENUMS, payload: data.data }));

export const fetchVehicles = () => dispatch =>
	api
		.fetchVehicles()
		.then(data => dispatch({ type: FETCH_VEHICLES, payload: data.data }));

export const fetchBookings = () => dispatch =>
	api
		.fetchBookings()
		.then(data => dispatch({ type: FETCH_BOOKINGS, payload: data.data }));
