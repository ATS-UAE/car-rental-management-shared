import Action from "../actions/types";

export default function(state = null, action) {
	switch (action.type) {
		case Action.FETCH_ENUMS:
			return action.payload;
		default:
			return state;
	}
}
