import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

import GMaps from "../presentational/display/GMaps";
function Home({ auth }) {
	return <GMaps />;
}

const mapStateToProps = ({ auth }) => ({ auth });

export default compose(
	withRouter,
	connect(mapStateToProps)
)(Home);
