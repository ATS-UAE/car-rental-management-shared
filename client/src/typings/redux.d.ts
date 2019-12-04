import Action from "../../actions/types";
import {
	ClientResponse,
	VehicleResponse,
	Auth,
	Booking,
	Category,
	UserResponse,
	WithServerResponse,
	Accident,
	LocationResponse,
	Unit
} from "./api";
import { Nullable } from "./utils";

export interface ReduxAction {
	type: Action;
	payload: any;
}

export type ReduxState = Nullable<{
	users: WithServerResponse<UserResponse[]>;
	vehicles: WithServerResponse<VehicleResponse[]>;
	categories: WithServerResponse<Category[]>;
	bookings: WithServerResponse<Booking[]>;
	accidents: WithServerResponse<Accident[]>;
	auth: WithServerResponse<Auth> | false;
	clients: WithServerResponse<ClientResponse[]>;
	locations: WithServerResponse<LocationResponse[]>;
	units: WithServerResponse<Unit[]>;
}>;
