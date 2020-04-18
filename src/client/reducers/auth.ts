import Action from "../actions/types";

export default function(state = null, action) {
	switch (action.type) {
		case Action.AUTH_LOGIN:
			return action.payload;
		case Action.FETCH_CURRENT_USER_DETAILS:
			return action.payload;
		case Action.AUTH_LOGOUT:
			return action.payload;
		default:
			return state;
	}
}
