import React, { useState, useEffect } from "react";
import GuestInvite from "../../presentational/forms/GuestInvite";
import PasswordChange from "../../presentational/forms/PasswordChange";
import { Grid, Button, Typography } from "@material-ui/core";
import { api } from "../../../utils/helpers";

export default function InviteGuestButtonDialog({
	onSubmit,
	onExit,
	token,
	onPasswordReset
}) {
	const [formData, setFormData] = useState({});
	const [errorNotes, setErrorNotes] = useState([]);
	const [disableButton, setDisabledButton] = useState(false);
	const [errors, setErrors] = useState({});
	const [page, setPage] = useState(0);
	useEffect(() => {
		let validForm = true;
		for (let key in errors) {
			if (errors[key].length) {
				validForm = false;
			}
		}
		setDisabledButton(!validForm);
	}, [errors]);

	const getPage = page => {
		switch (page) {
			// Provide email
			case 0: {
				return (
					<GuestInvite
						value={formData}
						title="Enter your email."
						values={formData}
						onChange={setFormData}
						errors={errors}
						onError={setErrors}
						footer={
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
											.resetPassword(formData)
											.then(() => {
												onSubmit && onSubmit();
												setFormData({});
												setPage(page + 1);
											})
											.catch(e => {
												setDisabledButton(false);
												setErrorNotes([e]);
											});
									}}
								>
									Confirm
								</Button>
							</Grid>
						}
						errorNotes={errorNotes}
					/>
				);
			}
			// Email reset token has been sent
			case 1: {
				return (
					<div>
						<Typography gutterBottom>
							An email has been sent! Please follow the instructions within.
						</Typography>
						<Button
							fullWidth
							type="submit"
							variant="contained"
							color="primary"
							onClick={e => onExit && onExit()}
						>
							OK
						</Button>
					</div>
				);
			}
			// New password
			case 2: {
				return (
					<PasswordChange
						title="Provide a new password"
						values={formData}
						onChange={setFormData}
						errorNotes={errorNotes}
						errors={errors}
						onError={setErrors}
						exclude={["passwordOld"]}
						footer={
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
											.resetPassword({
												...formData,
												token
											})
											.then(() => {
												setFormData({});
												onPasswordReset && onPasswordReset();
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
						}
					/>
				);
			}
			default:
				return null;
		}
	};
	return getPage(token ? 2 : page);
}
