import React, { useEffect, FC } from "react";
import { RouteComponentProps } from "react-router";
import { connect } from "react-redux";

import AppBarWithDrawer from "../containers/layout/AppBarWithDrawer";
import * as actions from "../../actions";

const All: FC<typeof actions & RouteComponentProps> = ({
	fetchCurrentUserDetails,
	location
}) => {
	useEffect(() => {
		fetchCurrentUserDetails();
	}, []);
	return <AppBarWithDrawer />;
};

export default connect<typeof actions>(null, actions)(All);
