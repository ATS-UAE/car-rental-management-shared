import React, { useState, useEffect } from "react";
import { Button, Grid } from "@material-ui/core";

import PasswordChange from "../../presentational/forms/PasswordChange";
import DialogButton from "../../presentational/forms/DialogButton";
import { api } from "../../../utils";

export default function PasswordChangeButtonDialog() {
	let [open, setOpen] = useState(false);
	let [values, setValues] = useState({});
	let [disableButton, setDisabledButton] = useState({});
	let [errorNotes, setErrorNotes] = useState([]);
	let [errors, setErrors] = useState({});

	useEffect(() => {
		let validForm = true;
		for (let key in errors) {
			if (errors[key].length) {
				validForm = false;
			}
		}
		setDisabledButton(!validForm);
	}, [errors]);
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
						.updateMe(values)
						.then(() => {
							setOpen(false);
							setValues({});
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
		<DialogButton
			open={open}
			onClick={() => setOpen(true)}
			onClose={() => setOpen(false)}
			buttonText="Change Password"
		>
			<PasswordChange
				title="Change your password."
				footer={footer}
				values={values}
				onChange={setValues}
				errorNotes={errorNotes}
				errors={errors}
				onError={setErrors}
			/>
		</DialogButton>
	);
}
