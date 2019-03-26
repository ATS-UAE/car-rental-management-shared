import React, { useState, useEffect } from "react";
import GuestSignUp from "../../presentational/forms/GuestSignUp";
import { api } from "../../../utils";

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
	let inviteToken;
	useEffect(() => {
		// Get token from url.
		const urlParams = new URLSearchParams(window.location.search);
		inviteToken = urlParams.get("inviteToken");
	}, []);
	return (
		<GuestSignUp
			values={newUser}
			onChange={newUser => setNewUser(newUser)}
			onSubmit={() => api.GuestSignUp({ inviteToken, ...newUser })}
		/>
	);
}
