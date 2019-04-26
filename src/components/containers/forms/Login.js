import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Grid, Button } from "@material-ui/core";
import LoginForm from "../../presentational/forms/LoginForm";
import * as actions from "../../../actions";

function Login({ authLogin, onLogin }) {
	let [auth, setAuth] = useState({});
	let [authErrors, setAuthErrors] = useState([]);
	let [disableButton, setDisabledButton] = useState(false);
	let [fieldErrors, setFieldErrors] = useState({});
	useEffect(() => {
		let validForm = true;
		for (let key in fieldErrors) {
			if (fieldErrors[key].length) {
				validForm = false;
			}
		}
		setDisabledButton(!validForm);
	}, [fieldErrors]);
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
							setAuthErrors([e]);
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
			onChange={(data, name, errors) => {
				setAuth(data);
				setFieldErrors({ ...fieldErrors, [name]: errors });
			}}
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
