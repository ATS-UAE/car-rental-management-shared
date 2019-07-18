import { FETCH_BOOKINGS } from "../actions/types";

export default function(state = null, action) {
	switch (action.type) {
		case FETCH_BOOKINGS:
			return action.payload;
		default:
			return state;
	}
}
