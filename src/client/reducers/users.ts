import Action from "../actions/types";

export default function(state = null, action) {
	switch (action.type) {
		case Action.FETCH_USERS:
			return action.payload;
		default:
			return state;
	}
}
