import {
	AUTH_LOGIN,
	FETCH_ENUMS,
	FETCH_USERS,
	FETCH_VEHICLES,
	FETCH_BOOKINGS,
	FETCH_CURRENT_USER_DETAILS,
	AUTH_LOGOUT,
	FETCH_LOCATIONS,
	FETCH_ACCIDENTS,
	FETCH_CATEGORIES
} from "./types";
import { api } from "../utils";

export const fetchCurrentUserDetails = () => dispatch =>
	api
		.fetchCurrentUserDetails()
		.then(data => dispatch({ type: FETCH_CURRENT_USER_DETAILS, payload: data }))
		.catch(() =>
			dispatch({ type: FETCH_CURRENT_USER_DETAILS, payload: false })
		);

export const authLogin = (username, password) => dispatch =>
	api.authLogin({ username, password }).then(() =>
		api
			.fetchCurrentUserDetails()
			.then(data => dispatch({ type: AUTH_LOGIN, payload: data }))
			.catch(() => dispatch({ type: AUTH_LOGIN, payload: false }))
	);
export const authLogout = () => dispatch =>
	api.authLogout().then(() => dispatch({ type: AUTH_LOGOUT, payload: false }));

export const fetchUsers = () => dispatch =>
	api.fetchUsers().then(data => dispatch({ type: FETCH_USERS, payload: data }));

export const fetchEnums = () => dispatch =>
	api.fetchEnums().then(data => dispatch({ type: FETCH_ENUMS, payload: data }));

export const fetchVehicles = () => dispatch =>
	api
		.fetchVehicles()
		.then(data => dispatch({ type: FETCH_VEHICLES, payload: data }));

export const fetchBookings = () => dispatch =>
	api
		.fetchBookings()
		.then(data => dispatch({ type: FETCH_BOOKINGS, payload: data }));

export const fetchLocations = () => dispatch =>
	api
		.fetchLocations()
		.then(data => dispatch({ type: FETCH_LOCATIONS, payload: data }));

export const fetchAccidents = () => dispatch =>
	api
		.fetchAccidents()
		.then(data => dispatch({ type: FETCH_ACCIDENTS, payload: data }));

export const fetchCategories = () => dispatch =>
	api
		.fetchCategories()
		.then(data => dispatch({ type: FETCH_CATEGORIES, payload: data }));
