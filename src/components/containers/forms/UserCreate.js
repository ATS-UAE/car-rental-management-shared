import React, { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import UserCreateForm from "../../presentational/forms/UserCreate";
import { api, toTitleWords } from "../../../utils";
import { ROLES } from "../../../variables";

function UserCreate({ enums, fetchUsers }) {
	let [newUser, setNewUser] = useState({
		username: "",
		password: "",
		email: "",
		passwordConfirm: "",
		firstName: "",
		lastName: "",
		mobileNumber: "",
		gender: "",
		roleId: ""
	});
	let [errors, setErrors] = useState([]);
	let roles = [
		{
			value: "",
			label: "Loading"
		}
	];
	if (enums && enums.data) {
		roles = enums.data.roles.reduce((acc, role) => {
			if (role.name !== ROLES.GUEST) {
				acc.push({ value: role.id, label: toTitleWords(role.name) });
			}
			return acc;
		}, []);
	}
	return (
		<UserCreateForm
			title={"Create User"}
			buttonLabel={"Create"}
			values={newUser}
			onChange={data => setNewUser(data)}
			onSubmit={() => {
				api.createUser(newUser).then(() => fetchUsers());
			}}
			errorNotes={errors}
			roleList={roles}
		/>
	);
}

const mapStateToProps = ({ enums }) => ({ enums });

export default connect(
	mapStateToProps,
	actions
)(UserCreate);
