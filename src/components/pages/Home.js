import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

function Home({ auth, history }) {
	return auth === false ? <Redirect to="/login" /> : renderPage();
}

function renderPage() {
	return null;
}

const mapStateToProps = ({ auth }) => ({ auth });

export default compose(
	withRouter,
	connect(mapStateToProps)
)(Home);
