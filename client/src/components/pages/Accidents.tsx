import React, { useEffect, FC } from "react";
import { connect } from "react-redux";

import * as actions from "../../actions";
import AccidentListView from "../containers.deprecated/display/AccidentListView";

const Accidents: FC<typeof actions> = ({
	fetchAccidents,
	fetchBookings,
	fetchCurrentUserDetails,
	fetchVehicles
}) => {
	useEffect(() => {
		fetchAccidents();
		fetchBookings();
		fetchCurrentUserDetails();
		fetchVehicles();
	});
	return <AccidentListView />;
};

export default connect<typeof actions>(
	null,
	actions
)(Accidents);
