import React, { useState, useEffect } from "react";
import GuestInvite from "../../presentational/forms/GuestInvite";
import { Grid, Button } from "@material-ui/core";
import { api, apiErrorHandler } from "../../../utils/helpers";
import { Resource, Action } from "../../../../shared/typings";
import DialogButton from "../../presentational/forms/DialogButton";

export default function InviteGuestButtonDialog({ onSubmit }) {
	let [formData, setFormData] = useState({});
	let [errorNotes, setErrorNotes] = useState([]);
	let [disableButton, setDisabledButton] = useState(false);
	let [errors, setErrors] = useState({});
	let [open, setOpen] = useState(false);
	useEffect(() => {
		let validForm = true;
		for (let key in errors) {
			if (errors[key].length) {
				validForm = false;
			}
		}
		setDisabledButton(!validForm);
	}, [errors]);
	const footer = (
		<Grid item>
			<Button
				fullWidth
				disabled={disableButton}
				type="submit"
				variant="contained"
				color="primary"
				onClick={e => {
					e.preventDefault();
					setDisabledButton(true);
					api
						.inviteGuest({
							...formData,
							url: `${process.env.REACT_APP_CAR_BOOKING_CLIENT_DOMAIN}/signup`
						})
						.then(() => {
							setOpen(false);
							onSubmit && onSubmit();
						})
						.catch(e => {
							setDisabledButton(false);
							setErrorNotes([apiErrorHandler(e).message]);
						});
				}}
			>
				Invite
			</Button>
		</Grid>
	);
	return (
		<DialogButton
			open={open}
			onClick={() => setOpen(true)}
			onClose={() => setOpen(false)}
			buttonText="Invite Customer"
		>
			<GuestInvite
				value={formData}
				title="Invite Customer"
				onSubmit={() => {}}
				values={formData}
				onChange={setFormData}
				errors={errors}
				onError={setErrors}
				footer={footer}
				errorNotes={errorNotes}
			/>
		</DialogButton>
	);
}
