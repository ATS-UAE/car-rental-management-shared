import React, { useState } from "react";
import { connect } from "react-redux";

import UserForm from "./UserForm";
import { api } from "../../../../utils";

function UserFormGuestSignUp({ onSubmit, history }) {
	let [newUser, setNewUser] = useState({});
	let [loading, setLoading] = useState(false);
	let [errorNotes, setErrorNotes] = useState([]);
	let [errors, setErrors] = useState({});

	let inviteToken = new URLSearchParams(window.location.search).get("token");

	return (
		<UserForm
			title="Sign Up"
			values={newUser}
			onChangeEvent={(data, name, event) =>
				event.target.files
					? setNewUser({ ...data, [name]: event.target.files[0] || "" })
					: setNewUser(data)
			}
			onError={setErrors}
			errors={errors}
			exclude={["roleId", "email"]}
			showFooter={true}
			onSubmit={() => {
				setLoading(true);
				api
					.createUser({ ...newUser, inviteToken })
					.then(() => onSubmit && onSubmit())
					.catch(e => {
						setErrorNotes([e]);
						setLoading(false);
					});
			}}
			loading={loading}
			errorNotes={errorNotes}
		/>
	);
}

const mapStateToProps = ({ enums }) => ({ enums });

export default connect(mapStateToProps)(UserFormGuestSignUp);
