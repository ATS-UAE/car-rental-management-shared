import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { WithServerResponse } from "../typings";
import { FormErrors } from "../utils";

export * from "./Booking";
export * from "./Location";
export * from "./Vehicle";

export const API_URL = process.env.REACT_APP_CAR_BOOKING_API_DOMAIN;

type ActionTypes = "get" | "post" | "delete" | "patch";

type Config = {
	formData?: boolean;
	axios?: AxiosRequestConfig;
};

export class ApiError extends Error {
	constructor(message: string) {
		super(message);
	}
}

export class ServerQueryError<
	Data extends WithServerResponse<any>
> extends Error {
	constructor(message: string, data: Data) {
		super(message);
		this.errors = FormErrors.handleFormApiErrors(data);
	}
	private errors: FormErrors<Data>;

	get fieldErrors() {
		return this.errors.fieldErrors;
	}
	get formErrors() {
		return this.errors.formErrors;
	}
}

export class NetworkError extends Error {}

export abstract class Api {
	private static generateServerError = (
		error: AxiosError<WithServerResponse<null>>
	) => {
		if (error.response) {
			throw new ServerQueryError(
				error.response.data.message,
				error.response.data
			);
		}
		throw new ApiError(error.message);
	};
	public static async execute<Response>(
		action: ActionTypes,
		path: string,
		config?: Config
	): Promise<WithServerResponse<Response>>;
	public static async execute<Response, Body extends object>(
		action: ActionTypes,
		path: string,
		config?: Config & { body?: Body }
	): Promise<WithServerResponse<Response>>;
	public static async execute<Response, Body extends object>(
		action: ActionTypes,
		path: string,
		config: Config & { body?: Body } = {}
	): Promise<WithServerResponse<Response>> {
		let payload: FormData | Body | undefined = config.body;
		const baseAxiosConfig: AxiosRequestConfig = {
			withCredentials: true,
			...config.axios
		};

		if (payload !== undefined && config.formData) {
			payload = new FormData();
			for (let key in config.body) {
				const prop = config.body[key];
				if (prop instanceof Blob) {
					payload.append(key, prop);
				} else {
					payload.append(key, JSON.stringify(prop));
				}
			}
			baseAxiosConfig["headers"] = {
				"Content-Type": "multipart/form-data"
			};
		}

		switch (action) {
			case "get":
				return axios
					.get<WithServerResponse<Response>>(
						`${API_URL}${path}`,
						baseAxiosConfig
					)
					.then(data => data.data)
					.catch(Api.generateServerError);
			case "post":
				return axios
					.post<WithServerResponse<Response>>(
						`${API_URL}${path}`,
						payload,
						baseAxiosConfig
					)
					.then(data => data.data)
					.catch(Api.generateServerError);
			case "patch":
				return axios
					.patch<WithServerResponse<Response>>(
						`${API_URL}${path}`,
						payload,
						baseAxiosConfig
					)
					.then(data => data.data)
					.catch(Api.generateServerError);
			case "delete":
				return axios
					.delete<WithServerResponse<Response>>(
						`${API_URL}${path}`,
						baseAxiosConfig
					)
					.then(data => data.data)
					.catch(Api.generateServerError);
			default:
				throw new Error(`Unknown error ${action}`);
		}
	}
}
