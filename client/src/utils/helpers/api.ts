import axios from "axios";

const API_URL = process.env.REACT_APP_CAR_BOOKING_API_DOMAIN;

type apiData = Promise<{ data: any }>;
interface IAxiosConfig {
	withCredentials: boolean;
	[key: string]: any;
}

export const executeFromAPI = (
	action: "get" | "post" | "delete" | "patch",
	url: string,
	body?: any,
	config: {
		formData?: boolean;
	} = {}
): apiData =>
	new Promise((resolve, reject) => {
		let formData = body;
		const axiosConfig: IAxiosConfig = {
			withCredentials: true
		};
		if (body && config.formData) {
			formData = new FormData();
			for (let key in body) {
				if (body[key] instanceof Blob) formData.append(key, body[key]);
				else formData.append(key, JSON.stringify(body[key]));
			}
			axiosConfig["headers"] = {
				"Content-Type": "multipart/form-data"
			};
		}
		if (action !== "get" && action !== "delete") {
			axios[action](`${API_URL}${url}`, formData, axiosConfig)
				.then(data => resolve(data.data))
				.catch(reject);
		} else if (action === "get" || action === "delete") {
			axios[action](`${API_URL}${url}`, axiosConfig)
				.then(data => resolve(data.data))
				.catch(reject);
		} else {
			reject(`Unknown action '${action}'`);
		}
	});

const api = {
	// auth
	authLogin: (credentials: { username: string; password: string }): apiData =>
		executeFromAPI("post", "/api/carbooking/auth/login", credentials),
	authLogout: (): apiData =>
		executeFromAPI("get", "/api/carbooking/auth/logout"),
	resetPassword: (data: any): apiData =>
		executeFromAPI("post", "/api/carbooking/auth/forgot", data),
	fetchCurrentUserDetails: (): apiData =>
		executeFromAPI("get", "/api/carbooking/auth/me"),
	updateMe: (data: any): apiData =>
		executeFromAPI("patch", "/api/carbooking/auth/me", data),

	// enums
	fetchEnums: (): apiData => executeFromAPI("get", "/api/carbooking/enums"),

	// users
	fetchUsers: (): apiData => executeFromAPI("get", "/api/carbooking/users"),
	fetchUser: (id: number): apiData =>
		executeFromAPI("get", `/api/carbooking/users/${id}`),
	createUser: (user: any): apiData =>
		executeFromAPI("post", "/api/carbooking/users", user, {
			formData: true
		}),
	updateUser: (user: any): apiData =>
		executeFromAPI("patch", `/api/carbooking/users/${user.id}`, user, {
			formData: true
		}),
	deleteUser: (user: any): apiData =>
		executeFromAPI("delete", `/api/carbooking/users/${user.id}`),

	// invites
	inviteGuest: (invite: any): apiData =>
		executeFromAPI("post", "/api/carbooking/invites", invite),

	// vehicles
	createVehicle: (vehicle: any): apiData =>
		executeFromAPI("post", "/api/carbooking/vehicles", vehicle, {
			formData: true
		}),
	fetchVehicles: (): apiData =>
		executeFromAPI("get", "/api/carbooking/vehicles"),
	fetchVehicle: (id: number): apiData =>
		executeFromAPI("get", `/api/carbooking/vehicles/${id}`),
	updateVehicle: (vehicle: any): apiData =>
		executeFromAPI("patch", `/api/carbooking/vehicles/${vehicle.id}`, vehicle, {
			formData: true
		}),

	// bookings
	createBooking: (booking: any): apiData =>
		executeFromAPI("post", "/api/carbooking/bookings/", booking),
	fetchBookings: () => executeFromAPI("get", "/api/carbooking/bookings"),
	fetchBooking: (id: any): apiData =>
		executeFromAPI("get", `/api/carbooking/bookings/${id}`),
	updateBooking: (booking: any): apiData =>
		executeFromAPI("patch", `/api/carbooking/bookings/${booking.id}`, booking),
	deleteBooking: (id: any): apiData =>
		executeFromAPI("delete", `/api/carbooking/bookings/${id}`),

	// locations
	createLocation: (location: any): apiData =>
		executeFromAPI("post", "/api/carbooking/locations", location, {
			formData: true
		}),
	fetchLocations: () => executeFromAPI("get", "/api/carbooking/locations"),
	fetchLocation: (id: number): apiData =>
		executeFromAPI("get", `/api/carbooking/locations/${id}`),

	updateLocation: (location: any): apiData =>
		executeFromAPI(
			"patch",
			`/api/carbooking/locations/${location.id}`,
			location,
			{
				formData: true
			}
		),
	deleteLocation: (id: number): apiData =>
		executeFromAPI("delete", `/api/carbooking/locations/${id}`),

	// Accidents
	fetchAccident: (id: number): apiData =>
		executeFromAPI("get", `/api/carbooking/accidents/${id}`),
	fetchAccidents: (): apiData =>
		executeFromAPI("get", "/api/carbooking/accidents"),
	createAccident: (accident: any): apiData =>
		executeFromAPI("post", "/api/carbooking/accidents", accident, {
			formData: true
		}),
	updateAccident: (accident: any): apiData =>
		executeFromAPI(
			"patch",
			`/api/carbooking/accidents/${accident.id}`,
			accident,
			{
				formData: true
			}
		),
	deleteAccident: (id: any): apiData =>
		executeFromAPI("delete", `/api/carbooking/accidents/${id}`),

	// categories
	fetchCategories: (): apiData =>
		executeFromAPI("get", "/api/carbooking/categories"),
	createCategories: (category: any): apiData =>
		executeFromAPI("post", "/api/carbooking/categories", category),
	updateCategory: (category: any): apiData =>
		executeFromAPI(
			"patch",
			`/api/carbooking/categories/${category.id}`,
			category
		),
	deleteCategory: (category: any): apiData =>
		executeFromAPI("delete", `/api/carbooking/categories/${category.id}`)
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
