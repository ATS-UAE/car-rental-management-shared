import { combineReducers } from "redux";

import auth from "./auth";
import enums from "./enums";
import users from "./users";

export default combineReducers({ auth, enums, users });
