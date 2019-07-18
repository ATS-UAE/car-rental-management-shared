import { FETCH_ACCIDENTS } from "../actions/types";

export default function(state = null, action) {
	switch (action.type) {
		case FETCH_ACCIDENTS:
			return action.payload;
		default:
			return state;
	}
}
