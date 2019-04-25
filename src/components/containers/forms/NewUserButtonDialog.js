import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Grid, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "redux";
import UserForm from "../../presentational/forms/UserForm";
import * as actions from "../../../actions";
import { api, toTitleWords } from "../../../utils";
import DialogButton from "../../presentational/forms/DialogButton";
import { ROLES, ACTIONS, RESOURCES } from "../../../variables";
import Can from "../layout/Can";
function NewUserButtonDialog({ enums, fetchUsers, onSubmit, classes }) {
	const [newUser, setNewUser] = useState({});
	let [open, setOpen] = useState(false);
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
			yes={() => {
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
							Confirm
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
							title="Create User"
							buttonLabel="Create"
							values={newUser}
							onChange={(data, name, errors) => {
								setNewUser(data);
								setFieldErrors({ ...fieldErrors, [name]: errors });
							}}
							errorNotes={errorNotes}
							roleList={roles}
							footer={footer}
						/>
					</DialogButton>
				);
			}}
		/>
	);
}

const mapStateToProps = ({ enums }) => ({ enums });

const styles = theme => ({
	invite: {
		marginBottom: theme.spacing.unit * 3
	}
});

export default compose(
	withStyles(styles),
	connect(
		mapStateToProps,
		actions
	)
)(NewUserButtonDialog);
