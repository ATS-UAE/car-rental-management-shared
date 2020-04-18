import axios, { AxiosRequestConfig } from "axios";
import {
	PartialExcept,
	AuthAttributes,
	UserAttributes,
	VehicleAttributes,
	BookingAttributes,
	LocationAttributes,
	AccidentAttributes,
	CategoryAttributes,
	ClientAttributes,
	VehicleIssueAttributes,
	ClientServerParamsPatch,
	ClientServerResponseGet,
	ClientServerResponsePost,
	CategoryServerParamsPost,
	CategoryServerResponseGet,
	UserServerResponseGetAll,
	VehicleServerResponseGetAll,
	BookingServerResponseGetAll,
	LocationServerResponseGetAll,
	ClientServerResponseGetAll,
	AuthServerResponseGet,
	AccidentServerResponseGetAll,
	CategoryServerResponseGetAll,
	WialonUnitServerResponseGetAll,
	ReportUnitSummaryServerResponseGetAll
} from "../../../shared/typings";

export const API_URL = process.env.REACT_APP_CAR_BOOKING_API_DOMAIN;

export const executeFromAPI = <Data>(
	action: "get" | "post" | "delete" | "patch",
	url: string,
	body?: { [key: string]: any },
	config: {
		formData?: boolean;
	} & AxiosRequestConfig = {}
): Promise<Data> =>
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
				.then(data => resolve(data.data as Data))
				.catch(reject);
		} else if (action === "get" || action === "delete") {
			axios[action](`${API_URL}${url}`, axiosConfig)
				.then(data => resolve(data.data as Data))
				.catch(reject);
		} else {
			reject(`Unknown action '${action}'`);
		}
	});

const api = {
	// auth
	authLogin: (credentials: { username: string; password: string }) =>
		executeFromAPI<AuthAttributes>(
			"post",
			"/api/carbooking/auth/login",
			credentials
		),
	authLogout: () => executeFromAPI<null>("get", "/api/carbooking/auth/logout"),
	resetPassword: (data: { email: string; password: string }) =>
		executeFromAPI<null>("post", "/api/carbooking/auth/forgot", data),
	fetchCurrentUserDetails: () =>
		executeFromAPI<AuthServerResponseGet>("get", "/api/carbooking/auth/me"),
	updateMe: (data: Partial<AuthAttributes>) =>
		executeFromAPI<AuthAttributes>("patch", "/api/carbooking/auth/me", data),

	// users
	fetchUsers: () =>
		executeFromAPI<UserServerResponseGetAll>("get", "/api/carbooking/users"),
	fetchUser: (id: number) =>
		executeFromAPI<UserAttributes>("get", `/api/carbooking/users/${id}`),
	createUser: (user: Omit<UserAttributes, "id">) =>
		executeFromAPI<UserAttributes>("post", "/api/carbooking/users", user, {
			formData: true
		}),
	updateUser: (user: PartialExcept<UserAttributes, "id">) =>
		executeFromAPI<UserAttributes>(
			"patch",
			`/api/carbooking/users/${user.id}`,
			user,
			{
				formData: true
			}
		),
	deleteUser: (id: number) =>
		executeFromAPI<UserAttributes>("delete", `/api/carbooking/users/${id}`),

	// invites
	inviteGuest: (invite: { email: string }) =>
		executeFromAPI<null>("post", "/api/carbooking/invites", invite),

	// vehicles
	createVehicle: (vehicle: Omit<VehicleAttributes, "id">) =>
		executeFromAPI<VehicleAttributes>(
			"post",
			"/api/carbooking/vehicles",
			vehicle,
			{
				formData: true
			}
		),
	fetchVehicles: (from?: number, to?: number) =>
		executeFromAPI<VehicleServerResponseGetAll>(
			"get",
			`/api/carbooking/vehicles${from && to ? `?from=${from}&to=${to}` : ""}`
		),
	fetchVehicle: (id: number) =>
		executeFromAPI<VehicleAttributes>("get", `/api/carbooking/vehicles/${id}`),
	updateVehicle: (vehicle: PartialExcept<VehicleAttributes, "id">) =>
		executeFromAPI<VehicleAttributes>(
			"patch",
			`/api/carbooking/vehicles/${vehicle.id}`,
			vehicle,
			{
				formData: true
			}
		),

	// bookings
	createBooking: (
		booking: Omit<
			PartialExcept<BookingAttributes, "from" | "to" | "userId" | "vehicleId">,
			"id"
		>
	) =>
		executeFromAPI<BookingAttributes>(
			"post",
			"/api/carbooking/bookings/",
			booking
		),
	fetchBookings: () =>
		executeFromAPI<BookingServerResponseGetAll>(
			"get",
			"/api/carbooking/bookings"
		),
	fetchBooking: (id: number) =>
		executeFromAPI<BookingAttributes>("get", `/api/carbooking/bookings/${id}`),
	updateBooking: (booking: PartialExcept<BookingAttributes, "id">) =>
		executeFromAPI<BookingAttributes>(
			"patch",
			`/api/carbooking/bookings/${booking.id}`,
			booking
		),
	deleteBooking: (id: number) =>
		executeFromAPI<BookingAttributes>(
			"delete",
			`/api/carbooking/bookings/${id}`
		),

	// locations
	createLocation: (location: Omit<LocationAttributes, "id">) =>
		executeFromAPI<LocationAttributes>(
			"post",
			"/api/carbooking/locations",
			location,
			{
				formData: true
			}
		),
	fetchLocations: () =>
		executeFromAPI<LocationServerResponseGetAll>(
			"get",
			"/api/carbooking/locations"
		),
	fetchLocation: (id: number) =>
		executeFromAPI<LocationAttributes>(
			"get",
			`/api/carbooking/locations/${id}`
		),

	updateLocation: (location: PartialExcept<LocationAttributes, "id">) =>
		executeFromAPI<LocationAttributes>(
			"patch",
			`/api/carbooking/locations/${location.id}`,
			location,
			{
				formData: true
			}
		),
	deleteLocation: (id: number) =>
		executeFromAPI<LocationAttributes>(
			"delete",
			`/api/carbooking/locations/${id}`
		),

	// Accidents
	fetchAccident: (id: number) =>
		executeFromAPI<AccidentAttributes>(
			"get",
			`/api/carbooking/accidents/${id}`
		),
	fetchAccidents: () =>
		executeFromAPI<AccidentServerResponseGetAll>(
			"get",
			"/api/carbooking/accidents"
		),
	createAccident: (accident: Omit<AccidentAttributes, "id">) =>
		executeFromAPI<AccidentAttributes>(
			"post",
			"/api/carbooking/accidents",
			accident,
			{
				formData: true
			}
		),
	updateAccident: (accident: PartialExcept<AccidentAttributes, "id">) =>
		executeFromAPI<AccidentAttributes>(
			"patch",
			`/api/carbooking/accidents/${accident.id}`,
			accident,
			{
				formData: true
			}
		),
	deleteAccident: (id: number) =>
		executeFromAPI<AccidentAttributes>(
			"delete",
			`/api/carbooking/accidents/${id}`
		),

	// categories
	fetchCategories: () =>
		executeFromAPI<CategoryServerResponseGetAll>(
			"get",
			"/api/carbooking/categories"
		),
	createCategories: (category: CategoryServerParamsPost) =>
		executeFromAPI<CategoryServerResponseGet>(
			"post",
			"/api/carbooking/categories",
			category
		),
	updateCategory: (category: PartialExcept<CategoryAttributes, "id">) =>
		executeFromAPI<CategoryAttributes>(
			"patch",
			`/api/carbooking/categories/${category.id}`,
			category
		),
	deleteCategory: (id: number) =>
		executeFromAPI<CategoryAttributes>(
			"delete",
			`/api/carbooking/categories/${id}`
		),

	// Clients
	fetchClients: () =>
		executeFromAPI<ClientServerResponseGetAll>(
			"get",
			"/api/carbooking/clients"
		),
	fetchClient: (id: number) =>
		executeFromAPI<ClientServerResponseGet>(
			"get",
			`/api/carbooking/clients/${id}`
		),
	createClient: (category: ClientServerResponsePost) =>
		executeFromAPI<ClientServerResponsePost>(
			"post",
			"/api/carbooking/clients",
			category
		),
	updateClient: (id: number, category: ClientServerParamsPatch) =>
		executeFromAPI<ClientServerResponseGet>(
			"patch",
			`/api/carbooking/clients/${id}`,
			category
		),
	deleteClient: (id: number) =>
		executeFromAPI<ClientAttributes>("delete", `/api/carbooking/clients/${id}`),

	fetchWialonUnits: () =>
		executeFromAPI<WialonUnitServerResponseGetAll>(
			"get",
			"/api/carbooking/wialon/units"
		),

	// vehicleIssues
	fetchVehicleIssues: () =>
		executeFromAPI<VehicleIssueAttributes[]>("get", "/api/carbooking/issues"),
	createVehicleIssue: (category: Omit<VehicleIssueAttributes, "id">) =>
		executeFromAPI<VehicleIssueAttributes>(
			"post",
			"/api/carbooking/issues",
			category
		),
	updateVehicleIssue: (category: PartialExcept<VehicleIssueAttributes, "id">) =>
		executeFromAPI<VehicleIssueAttributes>(
			"patch",
			`/api/carbooking/issues/${category.id}`,
			category
		),
	deleteVehicleIssue: (id: number) =>
		executeFromAPI<VehicleIssueAttributes>(
			"delete",
			`/api/carbooking/issues/${id}`
		),

	// reports
	fetchUnitSummaryReport: () =>
		executeFromAPI<ReportUnitSummaryServerResponseGetAll>(
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
