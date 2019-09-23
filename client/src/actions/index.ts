import Action from "./types";
import api from "../utils/helpers/api";
import {
	ClientResponse,
	VehicleResponse,
	Auth,
	UserResponse,
	Enums,
	LocationResponse,
	Accident,
	Booking,
	WithServerResponse,
	Category
} from "../typings/api";
import { ReduxState } from "../typings";

type DispatchCallBack<Payload> = (action: {
	type: Action;
	payload: Payload;
}) => null;

export const fetchCurrentUserDetails = () => async (
	dispatch: DispatchCallBack<ReduxState["auth"]>
): Promise<WithServerResponse<Auth>> => {
	try {
		let user: WithServerResponse<Auth>;
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
): Promise<WithServerResponse<Auth>> => {
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
): Promise<WithServerResponse<UserResponse[]>> => {
	let users = await api.fetchUsers();
	dispatch({ type: Action.FETCH_USERS, payload: users });
	return users;
};

export const fetchEnums = () => async (
	dispatch: DispatchCallBack<ReduxState["enums"]>
): Promise<WithServerResponse<Enums>> => {
	let enums = await api.fetchEnums();
	dispatch({ type: Action.FETCH_ENUMS, payload: enums });
	return enums;
};

export const fetchVehicles = () => async (
	dispatch: DispatchCallBack<ReduxState["vehicles"]>
): Promise<WithServerResponse<VehicleResponse[]>> => {
	let vehicles = await api.fetchVehicles();
	dispatch({ type: Action.FETCH_VEHICLES, payload: vehicles });
	return vehicles;
};

export const fetchBookings = () => async (
	dispatch: DispatchCallBack<ReduxState["bookings"]>
): Promise<WithServerResponse<Booking[]>> => {
	let bookings = await api.fetchBookings();
	dispatch({ type: Action.FETCH_BOOKINGS, payload: bookings });
	return bookings;
};

export const fetchLocations = () => async (
	dispatch: DispatchCallBack<ReduxState["locations"]>
): Promise<WithServerResponse<LocationResponse[]>> => {
	let locations = await api.fetchLocations();
	dispatch({ type: Action.FETCH_LOCATIONS, payload: locations });
	return locations;
};

export const fetchAccidents = () => async (
	dispatch: DispatchCallBack<ReduxState["accidents"]>
): Promise<WithServerResponse<Accident[]>> => {
	let accidents = await api.fetchAccidents();
	dispatch({ type: Action.FETCH_ACCIDENTS, payload: accidents });
	return accidents;
};

export const fetchCategories = () => async (
	dispatch: DispatchCallBack<ReduxState["categories"]>
): Promise<WithServerResponse<Category[]>> => {
	let categories = await api.fetchCategories();
	dispatch({ type: Action.FETCH_CATEGORIES, payload: categories });
	return categories;
};

export const fetchClients = () => async (
	dispatch: DispatchCallBack<ReduxState["clients"]>
): Promise<WithServerResponse<ClientResponse[]>> => {
	let clients = await api.fetchClients();
	dispatch({ type: Action.FETCH_CLIENTS, payload: clients });
	return clients;
};
