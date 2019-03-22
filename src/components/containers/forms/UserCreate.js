import React, { useState } from "react";
import { connect } from "react-redux";
import UserCreateForm from "../../presentational/forms/UserCreate";
import * as actions from "../../../actions";

function UserCreate({ createUser }) {
	let [newUser, setNewUser] = useState({ username: "", password: "" });
	let [errors, setErrors] = useState([]);
	return (
		<UserCreateForm
			values={newUser}
			onChange={data => setNewUser(data).catch(e => setErrors([e]))}
			onCreate={createUser}
			errorNotes={errors}
		/>
	);
}

export default connect(
	null,
	actions
)(UserCreate);
