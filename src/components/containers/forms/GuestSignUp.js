import React, { useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import GuestSignUp from "../../presentational/forms/GuestSignUp";
import { api } from "../../../utils";

function GuestSignUpContainer() {
	let [newUser, setNewUser] = useState({
		username: "",
		password: "",
		email: "",
		passwordConfirm: "",
		firstName: "",
		lastName: "",
		mobileNumber: "",
		gender: ""
	});
	let [errors] = useState([]);
	let inviteToken = new URLSearchParams(window.location.search).get("token");

	return (
		<GuestSignUp
			title={"Sign Up"}
			buttonLabel={"Confirm"}
			values={newUser}
			onChange={data => setNewUser(data)}
			onSubmit={() => {
				api.createUser({ ...newUser, inviteToken });
			}}
			errorNotes={errors}
		/>
	);
}

const mapStateToProps = ({ enums }) => ({ enums });

export default compose(
	connect(mapStateToProps),
	withRouter
)(GuestSignUpContainer);
