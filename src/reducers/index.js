import { combineReducers } from "redux";

import auth from "./auth";
import enums from "./enums";
import users from "./users";
import vehicles from "./vehicles";
import bookings from "./bookings";

export default combineReducers({
	auth,
	enums,
	users,
	vehicles,
	bookings
});
