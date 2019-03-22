import { combineReducers } from "redux";

import auth from "./auth";
import enums from "./enums";

export default combineReducers({ auth, enums });
