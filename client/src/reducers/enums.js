import { FETCH_ENUMS } from "../actions/types";

export default function(state = null, action) {
	switch (action.type) {
		case FETCH_ENUMS:
			return action.payload;
		default:
			return state;
	}
}
