import React, { useEffect } from "react";
import { connect } from "react-redux";

import * as actions from "../../actions";
import AccidentListView from "../containers/display/AccidentListView";

function Accidents({
	fetchAccidents,
	fetchBookings,
	fetchCurrentUserDetails,
	fetchVehicles
}) {
	useEffect(() => {
		fetchAccidents();
		fetchBookings();
		fetchCurrentUserDetails();
		fetchVehicles();
	});
	return <AccidentListView />;
}

export default connect(
	null,
	actions
)(Accidents);
