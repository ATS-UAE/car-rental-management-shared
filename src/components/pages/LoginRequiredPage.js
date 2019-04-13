import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

function LoginRequiredPage({ auth, children, match }) {
	console.log("Login required");
	return children;
}

const mapStateToProps = ({ auth }) => ({
	auth
});

export default compose(connect(mapStateToProps))(LoginRequiredPage);
