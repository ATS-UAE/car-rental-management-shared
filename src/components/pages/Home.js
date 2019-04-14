import React from "react";
import { withRouter } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "redux";

function Home({ auth }) {
	return <Typography>Home Page</Typography>;
}

const mapStateToProps = ({ auth }) => ({ auth });

export default compose(
	withRouter,
	connect(mapStateToProps)
)(Home);
