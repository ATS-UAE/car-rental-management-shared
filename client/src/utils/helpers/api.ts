import axios, { AxiosRequestConfig } from "axios";
import {
	Auth,
	WithServerResponse,
	Enums,
	UserResponse,
	VehicleResponse,
	Booking,
	LocationResponse,
	Accident,
	Category,
	ClientResponse,
	ClientRequest,
	Unit,
	VehicleIssue,
	UnitSummaryResponse
} from "../../typings/api";
import { PartialExcept } from "../../typings";

const API_URL = process.env.REACT_APP_CAR_BOOKING_API_DOMAIN;

export const executeFromAPI = <Data>(
	action: "get" | "post" | "delete" | "patch",
	url: string,
	body?: { [key: string]: any },
	config: {
		formData?: boolean;
	} & AxiosRequestConfig = {}
): Promise<WithServerResponse<Data>> =>
	new Promise((resolve, reject) => {
		let formData = body;
		const axiosConfig: AxiosRequestConfig = {
			withCredentials: true
		};
		if (body !== undefined && config.formData) {
			formData = new FormData();
			for (let key in body) {
				if (body[key] instanceof Blob) {
					(formData as FormData).append(key, body[key]);
				} else {
					(formData as FormData).append(key, JSON.stringify(body[key]));
				}
			}
			axiosConfig["headers"] = {
				"Content-Type": "multipart/form-data"
			};
		}
		if (action !== "get" && action !== "delete") {
			axios[action](`${API_URL}${url}`, formData, axiosConfig)
				.then(data => resolve(data.data as WithServerResponse<Data>))
				.catch(reject);
		} else if (action === "get" || action === "delete") {
			axios[action](`${API_URL}${url}`, axiosConfig)
				.then(data => resolve(data.data as WithServerResponse<Data>))
				.catch(reject);
		} else {
			reject(`Unknown action '${action}'`);
		}
	});

const api = {
	// auth
	authLogin: (credentials: { username: string; password: string }) =>
		executeFromAPI<Auth>("post", "/api/carbooking/auth/login", credentials),
	authLogout: () => executeFromAPI<null>("get", "/api/carbooking/auth/logout"),
	resetPassword: (data: { email: string; password: string }) =>
		executeFromAPI<null>("post", "/api/carbooking/auth/forgot", data),
	fetchCurrentUserDetails: () =>
		executeFromAPI<Auth>("get", "/api/carbooking/auth/me"),
	updateMe: (data: Partial<Auth>) =>
		executeFromAPI<Auth>("patch", "/api/carbooking/auth/me", data),

	// enums
	fetchEnums: () => executeFromAPI<Enums>("get", "/api/carbooking/enums"),

	// users
	fetchUsers: () =>
		executeFromAPI<UserResponse[]>("get", "/api/carbooking/users"),
	fetchUser: (id: number) =>
		executeFromAPI<UserResponse>("get", `/api/carbooking/users/${id}`),
	createUser: (user: Omit<UserResponse, "id">) =>
		executeFromAPI<UserResponse>("post", "/api/carbooking/users", user, {
			formData: true
		}),
	updateUser: (user: PartialExcept<UserResponse, "id">) =>
		executeFromAPI<UserResponse>(
			"patch",
			`/api/carbooking/users/${user.id}`,
			user,
			{
				formData: true
			}
		),
	deleteUser: (id: number) =>
		executeFromAPI<UserResponse>("delete", `/api/carbooking/users/${id}`),

	// invites
	inviteGuest: (invite: { email: string }) =>
		executeFromAPI<null>("post", "/api/carbooking/invites", invite),

	// vehicles
	createVehicle: (vehicle: Omit<VehicleResponse, "id">) =>
		executeFromAPI<VehicleResponse>(
			"post",
			"/api/carbooking/vehicles",
			vehicle,
			{
				formData: true
			}
		),
	fetchVehicles: () =>
		executeFromAPI<VehicleResponse[]>("get", "/api/carbooking/vehicles"),
	fetchVehicle: (id: number) =>
		executeFromAPI<VehicleResponse>("get", `/api/carbooking/vehicles/${id}`),
	updateVehicle: (vehicle: PartialExcept<VehicleResponse, "id">) =>
		executeFromAPI<VehicleResponse>(
			"patch",
			`/api/carbooking/vehicles/${vehicle.id}`,
			vehicle,
			{
				formData: true
			}
		),

	// bookings
	createBooking: (booking: Omit<Booking, "id">) =>
		executeFromAPI<Booking>("post", "/api/carbooking/bookings/", booking),
	fetchBookings: () =>
		executeFromAPI<Booking[]>("get", "/api/carbooking/bookings"),
	fetchBooking: (id: number) =>
		executeFromAPI<Booking>("get", `/api/carbooking/bookings/${id}`),
	updateBooking: (booking: Booking) =>
		executeFromAPI<Booking>(
			"patch",
			`/api/carbooking/bookings/${booking.id}`,
			booking
		),
	deleteBooking: (id: number) =>
		executeFromAPI<Booking>("delete", `/api/carbooking/bookings/${id}`),

	// locations
	createLocation: (location: Omit<LocationResponse, "id">) =>
		executeFromAPI<LocationResponse>(
			"post",
			"/api/carbooking/locations",
			location,
			{
				formData: true
			}
		),
	fetchLocations: () =>
		executeFromAPI<LocationResponse[]>("get", "/api/carbooking/locations"),
	fetchLocation: (id: number) =>
		executeFromAPI<LocationResponse>("get", `/api/carbooking/locations/${id}`),

	updateLocation: (location: PartialExcept<LocationResponse, "id">) =>
		executeFromAPI<LocationResponse>(
			"patch",
			`/api/carbooking/locations/${location.id}`,
			location,
			{
				formData: true
			}
		),
	deleteLocation: (id: number) =>
		executeFromAPI<LocationResponse>(
			"delete",
			`/api/carbooking/locations/${id}`
		),

	// Accidents
	fetchAccident: (id: number) =>
		executeFromAPI<Accident>("get", `/api/carbooking/accidents/${id}`),
	fetchAccidents: () =>
		executeFromAPI<Accident[]>("get", "/api/carbooking/accidents"),
	createAccident: (accident: Omit<Accident, "id">) =>
		executeFromAPI<Accident>("post", "/api/carbooking/accidents", accident, {
			formData: true
		}),
	updateAccident: (accident: PartialExcept<Accident, "id">) =>
		executeFromAPI<Accident>(
			"patch",
			`/api/carbooking/accidents/${accident.id}`,
			accident,
			{
				formData: true
			}
		),
	deleteAccident: (id: number) =>
		executeFromAPI<Accident>("delete", `/api/carbooking/accidents/${id}`),

	// categories
	fetchCategories: () =>
		executeFromAPI<Category[]>("get", "/api/carbooking/categories"),
	createCategories: (category: Omit<Category, "id">) =>
		executeFromAPI<Category>("post", "/api/carbooking/categories", category),
	updateCategory: (category: PartialExcept<Category, "id">) =>
		executeFromAPI<Category>(
			"patch",
			`/api/carbooking/categories/${category.id}`,
			category
		),
	deleteCategory: (id: number) =>
		executeFromAPI<Category>("delete", `/api/carbooking/categories/${id}`),

	// Clients
	fetchClients: () =>
		executeFromAPI<ClientResponse[]>("get", "/api/carbooking/clients"),
	fetchClient: id =>
		executeFromAPI<ClientResponse>("get", `/api/carbooking/clients/${id}`),
	createClient: (category: Pick<ClientResponse, "name">) =>
		executeFromAPI<ClientResponse>("post", "/api/carbooking/clients", category),
	updateClient: (category: PartialExcept<ClientRequest, "id">) =>
		executeFromAPI<ClientResponse>(
			"patch",
			`/api/carbooking/clients/${category.id}`,
			category
		),
	deleteClient: (id: number) =>
		executeFromAPI<ClientResponse>("delete", `/api/carbooking/clients/${id}`),

	fetchWialonUnits: () =>
		executeFromAPI<Unit[]>("get", "/api/carbooking/wialon/units"),

	// vehicleIssues
	fetchVehicleIssues: () =>
		executeFromAPI<VehicleIssue[]>("get", "/api/carbooking/issues"),
	createVehicleIssue: (category: Omit<VehicleIssue, "id">) =>
		executeFromAPI<VehicleIssue>("post", "/api/carbooking/issues", category),
	updateVehicleIssue: (category: PartialExcept<VehicleIssue, "id">) =>
		executeFromAPI<VehicleIssue>(
			"patch",
			`/api/carbooking/issues/${category.id}`,
			category
		),
	deleteVehicleIssue: (id: number) =>
		executeFromAPI<VehicleIssue>("delete", `/api/carbooking/issues/${id}`),

	// reports
	fetchUnitSummaryReport: () =>
		executeFromAPI<UnitSummaryResponse[]>(
			"get",
			"/api/carbooking/reports/unit-summary"
		)
};

export class Sync<T> {
	constructor(
		private baseHost: string = process.env.REACT_APP_CAR_BOOKING_API_DOMAIN!
	) {}

	async save(props: Partial<T>): Promise<T> {
		return (await axios.put(this.baseHost, props)).data;
	}
	async create(props: Partial<T>): Promise<T> {
		return (await axios.post(this.baseHost, props)).data;
	}
	async delete(): Promise<T> {
		return (await axios.delete(this.baseHost)).data;
	}
}

export default api;
