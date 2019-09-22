import Action from "./types";
import api from "../utils/helpers/api";
import {
	Client,
	Vehicle,
	Auth,
	User,
	Enums,
	Location,
	Accident,
	Booking,
	Response,
	Category
} from "../typings/api";
import { ReduxState } from "../typings";

type DispatchCallBack<Payload> = (action: {
	type: Action;
	payload: Payload;
}) => null;

export const fetchCurrentUserDetails = () => async (
	dispatch: DispatchCallBack<ReduxState["auth"]>
): Promise<Response<Auth>> => {
	try {
		let user: Response<Auth>;
		user = await api.fetchCurrentUserDetails();
		dispatch({ type: Action.AUTH_LOGIN, payload: user });
		return user;
	} catch (e) {
		dispatch({ type: Action.AUTH_LOGIN, payload: false });
		throw e.response;
	}
};

export const authLogin = (username: string, password: string) => async (
	dispatch: DispatchCallBack<ReduxState["auth"]>
): Promise<Response<Auth>> => {
	try {
		await api.authLogin({ username, password });
		let user = await api.fetchCurrentUserDetails();
		dispatch({ type: Action.AUTH_LOGIN, payload: user });
		return user;
	} catch (e) {
		dispatch({ type: Action.AUTH_LOGIN, payload: false });
		throw e;
	}
};
export const authLogout = () => async (
	dispatch: DispatchCallBack<false>
): Promise<void> => {
	await api.authLogout();
	dispatch({ type: Action.AUTH_LOGOUT, payload: false });
};

export const fetchUsers = () => async (
	dispatch: DispatchCallBack<ReduxState["users"]>
): Promise<Response<User[]>> => {
	let users = await api.fetchUsers();
	dispatch({ type: Action.FETCH_USERS, payload: users });
	return users;
};

export const fetchEnums = () => async (
	dispatch: DispatchCallBack<ReduxState["enums"]>
): Promise<Response<Enums>> => {
	let enums = await api.fetchEnums();
	dispatch({ type: Action.FETCH_ENUMS, payload: enums });
	return enums;
};

export const fetchVehicles = () => async (
	dispatch: DispatchCallBack<ReduxState["vehicles"]>
): Promise<Response<Vehicle[]>> => {
	let vehicles = await api.fetchVehicles();
	dispatch({ type: Action.FETCH_VEHICLES, payload: vehicles });
	return vehicles;
};

export const fetchBookings = () => async (
	dispatch: DispatchCallBack<ReduxState["bookings"]>
): Promise<Response<Booking[]>> => {
	let bookings = await api.fetchBookings();
	dispatch({ type: Action.FETCH_BOOKINGS, payload: bookings });
	return bookings;
};

export const fetchLocations = () => async (
	dispatch: DispatchCallBack<ReduxState["locations"]>
): Promise<Response<Location[]>> => {
	let locations = await api.fetchLocations();
	dispatch({ type: Action.FETCH_LOCATIONS, payload: locations });
	return locations;
};

export const fetchAccidents = () => async (
	dispatch: DispatchCallBack<ReduxState["accidents"]>
): Promise<Response<Accident[]>> => {
	let accidents = await api.fetchAccidents();
	dispatch({ type: Action.FETCH_ACCIDENTS, payload: accidents });
	return accidents;
};

export const fetchCategories = () => async (
	dispatch: DispatchCallBack<ReduxState["categories"]>
): Promise<Response<Category[]>> => {
	let categories = await api.fetchCategories();
	dispatch({ type: Action.FETCH_CATEGORIES, payload: categories });
	return categories;
};

export const fetchClients = () => async (
	dispatch: DispatchCallBack<ReduxState["clients"]>
): Promise<Response<Client[]>> => {
	let clients = await api.fetchClients();
	dispatch({ type: Action.FETCH_CLIENTS, payload: clients });
	return clients;
};
