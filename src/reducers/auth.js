import {
	AUTH_LOGIN,
	FETCH_CURRENT_USER_DETAILS,
	AUTH_LOGOUT
} from "../actions/types";

export default function(state = null, action) {
	switch (action.type) {
		case AUTH_LOGIN:
			return action.payload;
		case FETCH_CURRENT_USER_DETAILS:
			return action.payload;
		case AUTH_LOGOUT:
			return action.payload;
		default:
			return state;
	}
}
