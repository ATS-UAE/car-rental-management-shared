import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

function Home({ auth }) {
	return null;
}

function renderPage() {}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Home);
