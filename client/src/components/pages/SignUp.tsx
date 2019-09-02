import React, { FC } from "react";
import { compose } from "recompose";
import { withRouter } from "react-router";
import { Paper, createStyles, Theme, withStyles } from "@material-ui/core";
import UserFormGuestSignUp from "../containers.deprecated/forms.deprecated/users/UserFormGuestSignUp";

const SignUp: FC<any> = ({ classes, history }) => {
	return (
		<div className={classes.root}>
			<Paper className={classes.signUpWrapper}>
				<UserFormGuestSignUp
					classes={{ root: classes.signUp }}
					onSubmit={() => history.push("/login")}
				/>
			</Paper>
		</div>
	);
};

const styles = (theme: Theme) =>
	createStyles({
		root: {
			padding: theme.spacing(3),
			[theme.breakpoints.down("sm")]: {
				padding: theme.spacing(2)
			},
			height: "100%",
			overflow: "auto",
			display: "flex"
		},
		signUpWrapper: {
			padding: theme.spacing(1),
			margin: "auto"
		},
		signUp: { maxWidth: "500px" }
	});

export default compose(
	withRouter,
	withStyles(styles)
)(SignUp);
