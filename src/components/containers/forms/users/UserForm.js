import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Grid, Button } from "@material-ui/core";
import UserForm from "../../../presentational/forms/UserForm";
import * as reduxActions from "../../../../actions";
import { toTitleWords } from "../../../../utils";

import { roles } from "../../../../variables/enums";

function UserFormContainer({
	enums,
	fetchEnums,
	onSubmit,
	values,
	readOnly,
	exclude,
	title,
	loading,
	hints,
	onChangeEvent,
	errorNotes,
	ticksMap,
	showFooter
}) {
	let [errors, setErrors] = useState({});
	let [disableButton, setDisabledButton] = useState(false);
	useEffect(() => {
		let validForm = true;
		for (let key in errors) {
			if (errors[key].length) {
				validForm = false;
			}
		}
		setDisabledButton(!validForm);
	}, [errors, values]);
	useEffect(() => {
		fetchEnums();
	}, []);
	let roleList = [
		{
			value: "",
			label: "Loading"
		}
	];
	if (enums && enums.data) {
		roleList = enums.data.roles.reduce((acc, role) => {
			if (role.name !== roles.GUEST || readOnly === true) {
				acc.push({ value: role.id, label: toTitleWords(role.name) });
			}
			return acc;
		}, []);
	}
	let footer = showFooter && (
		<Fragment>
			<Grid item>
				<Button
					disabled={loading || disableButton}
					type="submit"
					variant="contained"
					color="primary"
					onClick={e => {
						e.preventDefault();
						onSubmit(e);
					}}
				>
					Confirm
				</Button>
			</Grid>
		</Fragment>
	);
	return (
		<UserForm
			exclude={exclude}
			title={title}
			values={values}
			onChangeEvent={onChangeEvent}
			errorNotes={errorNotes}
			roleList={roleList}
			footer={footer}
			onError={errors => setErrors(errors)}
			errors={errors}
			ticksMap={ticksMap}
			hints={hints}
			readOnly={readOnly}
		/>
	);
}
const mapStateToProps = ({ users, enums, vehicles, locations }) => ({
	users,
	enums,
	vehicles,
	locations
});

export default connect(
	mapStateToProps,
	reduxActions
)(UserFormContainer);
