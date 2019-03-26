import React, { useState } from "react";
import GuestSignUp from "../../presentational/forms/GuestSignUp";
import { api } from "../../../";

export default function GuestSignUpContainer() {
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
	return (
		<GuestSignUp
			values={newUser}
			onChange={newUser => setNewUser(newUser)}
			onSubmit={() => api.GuestSignUp(newUser)}
		/>
	);
}
