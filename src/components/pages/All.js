import React, { Fragment, useState } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import AppBarWithDrawer from "../presentational/layout/AppBarWithDrawer";

function All({ auth, enums, history }) {
	return (
		<Fragment>
			<AppBarWithDrawer
				onLogoClick={() => {
					history.push("/");
				}}
				showMenu={auth === null ? false : true}
			/>
			{auth === null && history.location.pathname !== "/login" ? (
				<Redirect to="/login" />
			) : (
				renderPage()
			)}
		</Fragment>
	);
}

function renderPage() {}

const mapStateToProps = ({ auth, enums }) => ({ auth, enums });

export default compose(
	connect(mapStateToProps),
	withRouter
)(All);
