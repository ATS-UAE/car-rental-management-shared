import React from "react";
import Form, { FIELDS } from "./Form";
import { validators, Validator } from "../../../utils/helpers";
const { SELECT, PASSWORD, TEXT, IMAGE, MULTI } = FIELDS;

function UserForm({
	title,
	exclude,
	errorNotes,
	onChange,
	onChangeEvent,
	values,
	roleList,
	footer,
	onError,
	errors,
	readOnly,
	hints,
	ticksMap,
	categoryList,
	classes
}) {
	let samePassword = new Validator(
		password => password === values.password,
		"Password does not match."
	);
	const fields = [
		{
			type: IMAGE,
			name: "userImageSrc",
			id: "profile-picture",
			persistEvent: true,
			GridProps: {
				xs: 12,
				sm: 12,
				md: 12
			},
			props: {
				label: "Select profile picture",
				main: true,
				icon: "Face"
			}
		},
		{
			type: TEXT,
			name: "username",
			id: "username",
			validators: [validators.username, validators.usernameCharacters],
			props: {
				label: "Username",
				required: true
			}
		},
		{
			type: TEXT,
			id: "email",
			name: "email",
			validators: [validators.email],
			props: {
				label: "Email",
				required: true
			}
		},
		{
			type: PASSWORD,
			name: "password",
			id: "password",
			validators: [validators.password],
			props: {
				label: "Password",
				required: true,
				type: "password"
			}
		},
		{
			type: PASSWORD,
			name: "passwordConfirm",
			id: "password-confirm",
			validators: [samePassword],
			props: {
				label: "Confirm Password",
				required: true
			}
		},
		{
			type: TEXT,
			id: "first-name",
			name: "firstName",
			validators: [validators.requiredField],
			props: {
				label: "First Name",
				required: true
			}
		},
		{
			type: TEXT,
			id: "last-name",
			name: "lastName",
			validators: [validators.requiredField],
			props: {
				label: "Last Name",
				required: true
			}
		},
		{
			type: TEXT,
			id: "mobile-number",
			name: "mobileNumber",
			validators: [validators.requiredField],
			props: {
				label: "Mobile Number",
				required: true
			}
		},
		{
			type: SELECT,
			id: "role-id",
			name: "roleId",
			validators: [validators.requiredField],
			props: {
				label: "Role",
				fullWidth: true,
				items: roleList,
				required: true
			}
		},
		{
			type: MULTI,
			id: "categories",
			name: "categories",
			props: {
				label: "Vehicle Categories",
				items: categoryList
			}
		}
	];
	return (
		<Form
			classes={classes}
			title={title}
			fields={fields}
			exclude={exclude}
			errorNotes={errorNotes}
			onChange={onChange}
			values={values}
			footer={footer}
			onError={onError}
			errors={errors}
			readOnly={readOnly}
			hints={hints}
			onChangeEvent={onChangeEvent}
			ticksMap={ticksMap}
		/>
	);
}

export default UserForm;
