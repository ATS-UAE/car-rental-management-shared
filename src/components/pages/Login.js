import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { Paper } from "@material-ui/core";
import LoginContainer from "../containers/forms/Login";
import * as actions from "../../actions";

function Login({ classes, history, fetchEnums, fetchCurrentUserDetails }) {
	return (
		<Paper className={classes.root}>
			<LoginContainer
				onLogin={async () => {
					await fetchEnums();
					await fetchCurrentUserDetails();
					history.push("/");
				}}
			/>
		</Paper>
	);
}

const styles = (theme) => ({
	root: {
		padding: theme.spacing(3),
		width: "80%",
		maxWidth: "500px",
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)"
	}
});

export default compose(
	connect(
		null,
		actions
	),
	withRouter,
	withStyles(styles)
)(Login);
