import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import LoginContainer from "../containers/forms/Login";

function Login({ classes, auth, history }) {
	return (
		<div className={classes.root}>
			<LoginContainer
				onLogin={() => {
					history.push("/");
				}}
			/>
		</div>
	);
}

const styles = {
	root: {
		width: "80%",
		maxWidth: "500px",
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)"
	}
};

const mapStateToProps = ({ auth }) => ({ auth });
export default compose(
	connect(mapStateToProps),
	withRouter,
	withStyles(styles)
)(Login);
