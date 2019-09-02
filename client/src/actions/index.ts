import Action from "./types";
import api from "../utils/helpers/api";

type dispatchCallBack = (action: { type: Action; payload: unknown }) => null;

export const fetchCurrentUserDetails = () => (
	dispatch: dispatchCallBack
): Promise<unknown> =>
	api
		.fetchCurrentUserDetails()
		.then(data =>
			dispatch({
				type: Action.FETCH_CURRENT_USER_DETAILS,
				payload: data
			})
		)
		.catch(() =>
			dispatch({
				type: Action.FETCH_CURRENT_USER_DETAILS,
				payload: false
			})
		);

export const authLogin = (username: string, password: string) => (
	dispatch: dispatchCallBack
): Promise<unknown> =>
	api.authLogin({ username, password }).then(() =>
		api
			.fetchCurrentUserDetails()
			.then(data => dispatch({ type: Action.AUTH_LOGIN, payload: data }))
			.catch(() => dispatch({ type: Action.AUTH_LOGIN, payload: false }))
	);
export const authLogout = () => (
	dispatch: dispatchCallBack
): Promise<unknown> =>
	api
		.authLogout()
		.then(() => dispatch({ type: Action.AUTH_LOGOUT, payload: false }));

export const fetchUsers = () => (
	dispatch: dispatchCallBack
): Promise<unknown> =>
	api
		.fetchUsers()
		.then(data => dispatch({ type: Action.FETCH_USERS, payload: data }));

export const fetchEnums = () => (
	dispatch: dispatchCallBack
): Promise<unknown> =>
	api
		.fetchEnums()
		.then(data => dispatch({ type: Action.FETCH_ENUMS, payload: data }));

export const fetchVehicles = () => (
	dispatch: dispatchCallBack
): Promise<unknown> =>
	api
		.fetchVehicles()
		.then(data => dispatch({ type: Action.FETCH_VEHICLES, payload: data }));

export const fetchBookings = () => (
	dispatch: dispatchCallBack
): Promise<unknown> =>
	api
		.fetchBookings()
		.then(data => dispatch({ type: Action.FETCH_BOOKINGS, payload: data }));

export const fetchLocations = () => (
	dispatch: dispatchCallBack
): Promise<unknown> =>
	api
		.fetchLocations()
		.then(data => dispatch({ type: Action.FETCH_LOCATIONS, payload: data }));

export const fetchAccidents = () => (
	dispatch: dispatchCallBack
): Promise<unknown> =>
	api
		.fetchAccidents()
		.then(data => dispatch({ type: Action.FETCH_ACCIDENTS, payload: data }));

export const fetchCategories = () => (
	dispatch: dispatchCallBack
): Promise<unknown> =>
	api
		.fetchCategories()
		.then(data => dispatch({ type: Action.FETCH_CATEGORIES, payload: data }));
