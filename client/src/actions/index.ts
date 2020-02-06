import Action from "./types";
import api from "../utils/helpers/api";
import {
	ClientResponse,
	VehicleResponse,
	Auth,
	UserResponse,
	LocationResponse,
	Accident,
	Booking,
	WithServerResponse,
	Category,
	Unit
} from "../typings/api";
import { ReduxState } from "../typings";
import { BookingGetResponseItem } from "../api";

export type ExtractAction<T extends (...args: any) => any> = (
	...args: Parameters<ReturnType<T>>
) => ReturnType<T>;

export type DispatchCallBack<Payload> = (action: {
	type: Action;
	payload: Payload;
}) => void;

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

export const fetchVehicles = (from?: number, to?: number) => async (
	dispatch: DispatchCallBack<ReduxState["vehicles"]>
): Promise<WithServerResponse<VehicleResponse[]>> => {
	let vehicles = await api.fetchVehicles(from, to);
	dispatch({ type: Action.FETCH_VEHICLES, payload: vehicles });
	return vehicles;
};

export const fetchBookings = () => async (
	dispatch: DispatchCallBack<ReduxState["bookings"]>
): Promise<WithServerResponse<BookingGetResponseItem[]>> => {
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

export const fetchWialonUnits = () => async (
	dispatch: DispatchCallBack<ReduxState["units"]>
): Promise<WithServerResponse<Unit[]>> => {
	let units = await api.fetchWialonUnits();
	dispatch({ type: Action.FETCH_WIALON_UNITS, payload: units });
	return units;
};
