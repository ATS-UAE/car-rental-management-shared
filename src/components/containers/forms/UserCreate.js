import React, { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import UserCreateForm from "../../presentational/forms/UserCreate";
import { api } from "../../../utils";

function UserCreate() {
	let [newUser, setNewUser] = useState({
		username: "",
		password: "",
		passwordConfirm: "",
		firstName: "",
		lastName: "",
		email: "",
		mobileNumber: "",
		gender: "",
		roleId: ""
	});
	let [errors, setErrors] = useState([]);
	return (
		<UserCreateForm
			values={newUser}
			onChange={data => setNewUser(data)}
			onCreate={() => {
				api.createUser(newUser);
			}}
			errorNotes={errors}
		/>
	);
}

export default connect(
	null,
	actions
)(UserCreate);
