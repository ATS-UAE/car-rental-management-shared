import Action from "../../actions/types";
import {
	ClientResponse,
	VehicleResponse,
	Auth,
	Category,
	UserResponse,
	WithServerResponse,
	Accident,
	LocationResponse,
	Unit
} from "./api";
import { Nullable } from "./utils";
import { BookingGetResponseItem } from "../api";

export interface ReduxAction {
	type: Action;
	payload: any;
}

export type ReduxState = Nullable<{
	users: WithServerResponse<UserResponse[]>;
	vehicles: WithServerResponse<VehicleResponse[]>;
	categories: WithServerResponse<Category[]>;
	bookings: WithServerResponse<BookingGetResponseItem[]>;
	accidents: WithServerResponse<Accident[]>;
	auth: WithServerResponse<Auth> | false;
	clients: WithServerResponse<ClientResponse[]>;
	locations: WithServerResponse<LocationResponse[]>;
	units: WithServerResponse<Unit[]>;
}>;
