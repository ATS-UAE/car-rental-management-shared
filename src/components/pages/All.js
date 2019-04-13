import React, { useEffect } from "react";

import { connect } from "react-redux";

import AppBarWithDrawer from "../containers/layout/AppBarWithDrawer";
import * as actions from "../../actions";

function All({ fetchEnums, fetchCurrentUserDetails, location }) {
	useEffect(() => {
		fetchEnums();
		fetchCurrentUserDetails();
	}, []);
	return <AppBarWithDrawer />;
}

export default connect(
	null,
	actions
)(All);
