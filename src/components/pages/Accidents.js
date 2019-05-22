import React, { useEffect } from "react";
import { connect } from "react-redux";

import * as actions from "../../actions";
import AccidentListView from "../containers/display/AccidentListView";
function Accidents({ classes, theme, fetchAccidents }) {
	useEffect(() => {
		fetchAccidents();
	});
	return <AccidentListView />;
}

export default connect(
	null,
	actions
)(Accidents);
