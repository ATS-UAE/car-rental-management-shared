import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { Loading } from "../presentational";

const LoginRequiredPage = ({ auth, children }) => {
	if (auth === null) {
		return <Loading />;
	}
	return auth === false ? <Redirect to="/login" /> : children;
};

const mapStateToProps = ({ auth }) => ({
	auth
});

export default compose(connect(mapStateToProps))(LoginRequiredPage);
