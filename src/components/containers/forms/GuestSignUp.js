import React, { useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { Button, Grid } from "@material-ui/core";
import GuestSignUp from "../../presentational/forms/GuestSignUp";
import { api } from "../../../utils";

function GuestSignUpContainer({ onSubmit }) {
	let [newUser, setNewUser] = useState({
		username: "",
		password: "",
		passwordConfirm: "",
		firstName: "",
		lastName: "",
		mobileNumber: "",
		gender: ""
	});
	let [disableButton, setDisabledButton] = useState(false);
	let [errorNotes, setErrorNotes] = useState([]);
	let inviteToken = new URLSearchParams(window.location.search).get("token");

	let footer = (
		<Grid item>
			<Button
				disabled={disableButton}
				type="submit"
				variant="contained"
				color="secondary"
				onClick={e => {
					e.preventDefault();
					setDisabledButton(true);
					api
						.createUser({ ...newUser, inviteToken })
						.then(() => {
							onSubmit && onSubmit();
						})
						.catch(e => {
							console.log(e);
							setErrorNotes([e]);
							setDisabledButton(false);
						});
				}}
			>
				Confirm
			</Button>
		</Grid>
	);

	return (
		<GuestSignUp
			title={"Sign Up"}
			buttonLabel={"Confirm"}
			values={newUser}
			onChange={data => setNewUser(data)}
			footer={footer}
			errorNotes={errorNotes}
		/>
	);
}

const mapStateToProps = ({ enums }) => ({ enums });

export default compose(
	connect(mapStateToProps),
	withRouter
)(GuestSignUpContainer);
