import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Grid, Button } from "@material-ui/core";
import UserForm from "../../../presentational/forms/UserForm";
import * as reduxActions from "../../../../actions";
import { toTitleWords } from "../../../../utils/helpers";

import { Role } from "../../../../variables/enums";

function UserFormContainer({
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
	showFooter,
	fetchCurrentUserDetails,
	auth,
	categories,
	classes
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
		fetchCurrentUserDetails();
	}, []);
	let roleList = [
		{
			value: "",
			label: "Loading"
		}
	];
	let categoryList = [
		{
			value: "",
			label: "Loading"
		}
	];
	if (auth && auth.data) {
		roleList = Object.values(Role).reduce((acc, role) => {
			const userRole = auth.data.role;

			if (readOnly === false || userRole !== Role.MASTER) {
				if (userRole === Role.ADMIN && role === Role.Master) {
					return acc;
				} else if (
					userRole === Role.KEY_MANAGER &&
					(role === Role.ADMIN || role === Role.Master)
				) {
					return acc;
				}
			}

			acc.push({
				value: role.id,
				label: toTitleWords(role)
			});

			return acc;
		}, []);
	}

	if (categories && categories.data) {
		categoryList = categories.data.map(({ id, name }) => ({
			value: id,
			label: name
		}));
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
			categoryList={categoryList}
			exclude={exclude}
			title={title}
			values={values}
			onChangeEvent={onChangeEvent}
			errorNotes={errorNotes}
			roleList={roleList}
			footer={footer}
			onError={setErrors}
			errors={errors}
			ticksMap={ticksMap}
			hints={hints}
			readOnly={readOnly}
			classes={classes}
		/>
	);
}
const mapStateToProps = ({ users, vehicles, locations, auth, categories }) => ({
	users,
	vehicles,
	locations,
	auth,
	categories
});

export default connect(mapStateToProps, reduxActions)(UserFormContainer);
