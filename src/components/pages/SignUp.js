import React from "react";
import { Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import GuestSignUp from "../containers/forms/GuestSignUp";

function SignUp({ classes }) {
	return (
		<Paper className={classes.root}>
			<GuestSignUp />
		</Paper>
	);
}

const styles = theme => ({
	root: {
		padding: theme.spacing.unit * 3,
		margin: theme.spacing.unit * 3
	}
});

export default withStyles(styles)(SignUp);
