import React, { useState } from "react";
import { connect } from "react-redux";
import UserForm from "./UserForm";
import { api, apiErrorHandler } from "../../../../utils/helpers";

function UserFormGuestSignUp({ onSubmit, classes }) {
	let [newUser, setNewUser] = useState({});
	let [loading, setLoading] = useState(false);
	let [errorNotes, setErrorNotes] = useState([]);
	let [errors, setErrors] = useState({});

	let inviteToken = new URLSearchParams(window.location.search).get("token");

	return (
		<UserForm
			classes={classes}
			title="Sign Up"
			values={newUser}
			onChangeEvent={(data, name, event) =>
				event.target.files
					? setNewUser({ ...data, [name]: event.target.files[0] || "" })
					: setNewUser(data)
			}
			onError={setErrors}
			errors={errors}
			exclude={["role", "email", "categories"]}
			showFooter={true}
			onSubmit={() => {
				setLoading(true);
				api
					.createUser({ ...newUser, inviteToken })
					.then(() => onSubmit && onSubmit())
					.catch(e => {
						setErrorNotes([apiErrorHandler(e).message]);
						setLoading(false);
					});
			}}
			loading={loading}
			errorNotes={errorNotes}
		/>
	);
}

export default UserFormGuestSignUp;
