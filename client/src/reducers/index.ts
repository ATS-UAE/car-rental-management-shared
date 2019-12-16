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
