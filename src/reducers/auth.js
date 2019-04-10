import { AUTH_LOGIN, FETCH_CURRENT_USER_DETAILS } from "../actions/types";

export default function(state = null, action) {
	switch (action.type) {
		case AUTH_LOGIN:
			return action.payload;
		case FETCH_CURRENT_USER_DETAILS:
			return action.payload;
		default:
			return state;
	}
}
