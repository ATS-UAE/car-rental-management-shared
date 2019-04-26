import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Grid, Button } from "@material-ui/core";
import UserForm from "../../presentational/forms/UserForm";
import * as actions from "../../../actions";
import { api, toTitleWords } from "../../../utils";
import DialogButton from "../../presentational/forms/DialogButton";
import { ROLES, ACTIONS, RESOURCES } from "../../../variables";
import Can from "../layout/Can";
function NewUserButtonDialog({ enums, fetchUsers, onSubmit }) {
	const [newUser, setNewUser] = useState({});
	let [open, setOpen] = useState(false);
	let [disableButton, setDisabledButton] = useState(true);
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
		<Can
			action={ACTIONS.CREATE}
			resource={RESOURCES.USERS}
			params={{ role: { name: ROLES.ADMIN } }}
			yes={access => {
				const footer = (
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
									.createUser(newUser)
									.then(() => {
										fetchUsers();
										setNewUser({});
										setDisabledButton(false);
										setOpen(false);
										onSubmit && onSubmit();
									})
									.catch(e => {
										setErrorNotes([e]);
										setDisabledButton(false);
									});
							}}
						>
							Create
						</Button>
					</Grid>
				);
				return (
					<DialogButton
						open={open}
						onClick={() => setOpen(true)}
						onClose={() => setOpen(false)}
					>
						<UserForm
							exclude={access.excludedFields}
							title="Create User"
							values={newUser}
							onChange={data => setNewUser(data)}
							errorNotes={errorNotes}
							roleList={roles}
							footer={footer}
							onError={errors => setErrors(errors)}
							errors={errors}
						/>
					</DialogButton>
				);
			}}
		/>
	);
}

const mapStateToProps = ({ enums }) => ({ enums });

export default connect(
	mapStateToProps,
	actions
)(NewUserButtonDialog);
