import React from "react";
import { compose } from "recompose";
import { withRouter } from "react-router";
import { Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import UserFormGuestSignUp from "../containers/forms/users/UserFormGuestSignUp";

function SignUp({ classes, history }) {
	return (
		<Paper className={classes.root}>
			<UserFormGuestSignUp onSubmit={() => history.push("/login")} />
		</Paper>
	);
}

const styles = theme => ({
	root: {
		padding: theme.spacing.unit * 3,
		[theme.breakpoints.down("sm")]: {
			padding: theme.spacing.unit * 2
		},
		height: "100%",
		overflow: "auto"
	}
});

export default compose(
	withRouter,
	withStyles(styles)
)(SignUp);
