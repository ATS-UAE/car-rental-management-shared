import React, { useState } from "react";
import { connect } from "react-redux";
import LoginForm from "../../presentational/forms/LoginForm";
import * as actions from "../../../actions";

function Login({ authLogin, onLogin }) {
	let [auth, setAuth] = useState({ username: "", password: "" });
	let [authErrors, setAuthErrors] = useState([]);
	return (
		<LoginForm
			values={auth}
			onChange={data => setAuth(data)}
			onLogin={() =>
				authLogin(auth.username, auth.password)
					.then(() => onLogin && onLogin())
					.catch(e => setAuthErrors([e]))
			}
			errorNotes={authErrors}
		/>
	);
}

export default connect(
	null,
	actions
)(Login);
