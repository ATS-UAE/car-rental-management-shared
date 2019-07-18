import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { withRouter, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { Paper, Dialog, Link as MuiLink } from "@material-ui/core";
import LoginContainer from "../containers/forms/Login";
import * as actions from "../../actions";
import ForgotPassword from "../containers/forms/ForgotPassword";

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
			<MuiLink component={Link} to="/login/forgot" className={classes.forgot}>
				Forgot password?
			</MuiLink>
			<Route
				path="/login/forgot"
				render={({ location }) => {
					const searchParams = new URLSearchParams(location.search);
					const token = searchParams.get("token");
					return (
						<Dialog
							classes={{ paper: classes.forgotDialog }}
							open={true}
							onClose={() => history.push("/login")}
						>
							<ForgotPassword
								onExit={() => history.push("/login")}
								token={token}
								onPasswordReset={() => history.push("/login")}
							/>
						</Dialog>
					);
				}}
			/>
		</Paper>
	);
}

const styles = theme => ({
	root: {
		padding: theme.spacing(3),
		width: "80%",
		maxWidth: "500px",
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)"
	},
	forgot: {
		margin: theme.spacing(1),
		float: "right"
	},
	forgotDialog: {
		padding: theme.spacing(3)
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
