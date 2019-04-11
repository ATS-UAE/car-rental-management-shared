import React, { Fragment, useEffect, useState } from "react";
import { Redirect, withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import AppBarWithDrawer from "../containers/layout/AppBarWithDrawer";
import * as actions from "../../actions";
import { DirectionsCar } from "@material-ui/icons";
import { Typography } from "@material-ui/core";

function All({ auth, enums, history, fetchEnums, fetchCurrentUserDetails }) {
	useEffect(() => {
		fetchEnums();
		fetchCurrentUserDetails();
	}, []);
	console.log(history);
	return (
		<Fragment>
			<AppBarWithDrawer />
			{auth === false && history.location.pathname !== "/login" ? (
				<Redirect to="/login" />
			) : null}
		</Fragment>
	);
}

const mapStateToProps = ({ auth, enums, permissionData }) => ({
	auth,
	enums,
	permissionData
});

export default compose(
	connect(
		mapStateToProps,
		actions
	),
	withRouter
)(All);
