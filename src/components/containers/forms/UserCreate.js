import React, { useState } from "react";
import { connect } from "react-redux";
import UserCreateForm from "../../presentational/forms/UserCreate";
import * as actions from "../../../actions";

function UserCreate({ createUser }) {
	let [newUser, setNewUser] = useState({
		username: "",
		password: "",
		passwordConfirm: "",
		firstName: "",
		lastName: "",
		email: "",
		mobileNumber: "",
		gender: "",
		role: ""
	});
	let [errors, setErrors] = useState([]);
	return (
		<UserCreateForm
			values={newUser}
			onChange={data => setNewUser(data)}
			onCreate={() => {
				createUser(newUser);
			}}
			errorNotes={errors}
		/>
	);
}

export default connect(
	null,
	actions
)(UserCreate);
