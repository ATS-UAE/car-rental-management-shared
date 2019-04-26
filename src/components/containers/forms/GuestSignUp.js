import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { Button, Grid } from "@material-ui/core";
import GuestSignUp from "../../presentational/forms/GuestSignUp";
import { api } from "../../../utils";

function GuestSignUpContainer({ onSubmit, history }) {
	let [newUser, setNewUser] = useState({});
	let [disableButton, setDisabledButton] = useState(false);
	let [errorNotes, setErrorNotes] = useState([]);
	let [fieldErrors, setFieldErrors] = useState({});
	useEffect(() => {
		let validForm = true;
		for (let key in fieldErrors) {
			if (fieldErrors[key].length) {
				validForm = false;
			}
		}
		setDisabledButton(!validForm);
	}, [fieldErrors]);
	let inviteToken = new URLSearchParams(window.location.search).get("token");

	let footer = (
		<Grid item>
			<Button
				disabled={disableButton}
				type="submit"
				variant="contained"
				color="primary"
				onClick={e => {
					e.preventDefault();
					setDisabledButton(true);
					api
						.createUser({ ...newUser, inviteToken })
						.then(() => {
							history.push("/");
							onSubmit && onSubmit();
						})
						.catch(e => {
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
			onChange={(data, name, errors) => {
				setNewUser(data);
				setFieldErrors({ ...fieldErrors, [name]: errors });
			}}
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
