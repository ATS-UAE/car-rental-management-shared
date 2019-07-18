import { FETCH_VEHICLES } from "../actions/types";

export default function(state = null, action) {
	switch (action.type) {
		case FETCH_VEHICLES:
			return action.payload;
		default:
			return state;
	}
}
