import React, { useEffect, FC } from "react";
import { connect } from "react-redux";

import * as actions from "../../actions";
import AccidentListView from "../containers/display/AccidentListView";

type Props = typeof actions;

const Accidents: FC<Props> = ({
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
	}, []);
	return <AccidentListView />;
};

export default connect<{}, {}, Props>(
	null,
	actions
)(Accidents);
