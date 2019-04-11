import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

function Home({ auth, history }) {
	return auth === false && history.location.pathname !== "/login" ? (
		<Redirect to="/login" />
	) : (
		renderPage()
	);
}

function renderPage() {
	return null;
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(
	mapStateToProps,
	withRouter
)(Home);
