import { combineReducers } from "redux";

import auth from "./auth";
import users from "./users";
import vehicles from "./vehicles";
import bookings from "./bookings";
import locations from "./locations";
import accidents from "./accidents";
import categories from "./categories";
import clients from "./clients";
import wialonUnits from "./wialonUnits";

import {
	Nullable,
	AccidentServerResponseGetAll,
	BookingServerResponseGetAll,
	CategoryServerResponseGetAll,
	ClientServerResponseGetAll,
	LocationServerResponseGetAll,
	UserServerResponseGetAll,
	AuthServerResponseGet,
	VehicleServerResponseGetAll,
	WialonUnitServerResponseGetAll
} from "../../shared/typings";

export type ReduxState = Nullable<{
	users: UserServerResponseGetAll;
	vehicles: VehicleServerResponseGetAll;
	categories: CategoryServerResponseGetAll;
	bookings: BookingServerResponseGetAll;
	accidents: AccidentServerResponseGetAll;
	auth: AuthServerResponseGet | false;
	clients: ClientServerResponseGetAll;
	locations: LocationServerResponseGetAll;
	units: WialonUnitServerResponseGetAll;
}>;

export default combineReducers({
	auth,
	users,
	vehicles,
	bookings,
	locations,
	accidents,
	categories,
	clients,
	wialonUnits
});
