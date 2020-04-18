import Action from "../actions/types";

export default function(state = null, action) {
	switch (action.type) {
		case Action.FETCH_CLIENTS:
			return action.payload;
		default:
			return state;
	}
}
