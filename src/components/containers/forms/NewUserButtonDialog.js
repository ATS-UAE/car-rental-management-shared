import React, { useState } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "redux";
import UserForm from "../../presentational/forms/UserForm";
import * as actions from "../../../actions";
import { api, toTitleWords } from "../../../utils";
import DialogButton from "../../presentational/forms/DialogButton";
import { ROLES } from "../../../variables";
import GuestInvite from "./GuestInvite";

function NewUserButtonDialog({ enums, fetchUsers, onSubmit, classes }) {
	const [newUser, setNewUser] = useState({});
	let [open, setOpen] = useState(false);
	let [errors, setErrors] = useState([]);
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
		<DialogButton
			open={open}
			onClick={() => setOpen(true)}
			onClose={() => setOpen(false)}
		>
			<div className={classes.invite}>
				<GuestInvite />
			</div>
			<UserForm
				title="Create User"
				buttonLabel="Create"
				values={newUser}
				onChange={data => setNewUser(data)}
				onSubmit={() => {
					api.createUser(newUser).then(() => {
						fetchUsers();
						setOpen(false);
						onSubmit && onSubmit();
					});
				}}
				errorNotes={errors}
				roleList={roles}
			/>
		</DialogButton>
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
