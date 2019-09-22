import Action from "../../actions/types";
import {
	Client,
	Vehicle,
	Auth,
	Booking,
	Category,
	User,
	Response,
	Enums,
	Accident,
	Location
} from "./api";
import { Nullable } from "./utils";

export interface ReduxAction {
	type: Action;
	payload: any;
}

export type ReduxState = Nullable<{
	users: Response<User[]>;
	vehicles: Response<Vehicle[]>;
	categories: Response<Category[]>;
	bookings: Response<Booking[]>;
	accidents: Response<Accident[]>;
	auth: Response<Auth> | false;
	clients: Response<Client[]>;
	enums: Response<Enums>;
	locations: Response<Location[]>;
}>;
