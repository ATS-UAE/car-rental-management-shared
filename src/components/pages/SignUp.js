import React from "react";
import { compose } from "recompose";
import { withRouter } from "react-router";
import { Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import GuestSignUp from "../containers/forms/GuestSignUp";

function SignUp({ classes, history }) {
	return (
		<Paper className={classes.root}>
			<GuestSignUp onSubmit={() => history.push("/login")} />
		</Paper>
	);
}

const styles = theme => ({
	root: {
		padding: theme.spacing.unit * 3,
		margin: theme.spacing.unit * 3
	}
});

export default compose(
	withRouter,
	withStyles(styles)
)(SignUp);
