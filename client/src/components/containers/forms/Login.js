import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Grid, Button } from "@material-ui/core";
import LoginForm from "../../presentational/forms/LoginForm";
import * as actions from "../../../actions";
import { apiErrorHandler } from "../../../utils/helpers";

function Login({ authLogin, onLogin }) {
	let [auth, setAuth] = useState({});
	let [authErrors, setAuthErrors] = useState([]);
	let [disableButton, setDisabledButton] = useState(false);
	let [errors, setErrors] = useState({});
	useEffect(() => {
		let validForm = true;
		for (let key in errors) {
			if (errors[key].length) {
				validForm = false;
			}
		}
		setDisabledButton(!validForm);
	}, [errors]);
	const footer = (
		<Grid item>
			<Button
				fullWidth
				disabled={disableButton}
				type="submit"
				variant="contained"
				color="primary"
				onClick={e => {
					e.preventDefault();
					setDisabledButton(true);
					authLogin(auth.username, auth.password)
						.then(() => onLogin && onLogin())
						.catch(e => {
							setDisabledButton(false);
							setAuthErrors([apiErrorHandler(e).message]);
						});
				}}
			>
				Login
			</Button>
		</Grid>
	);
	return (
		<LoginForm
			values={auth}
			onChange={setAuth}
			onError={setErrors}
			errors={errors}
			title="Login"
			footer={footer}
			errorNotes={authErrors}
		/>
	);
}

export default connect(
	null,
	actions
)(Login);
