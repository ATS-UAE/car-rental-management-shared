import React from "react";
import Form, { FIELDS } from "./Form";
import { Validator, validators } from "../../../utils";
const { SELECT, PASSWORD, TEXT } = FIELDS;

function GuestSignUp({
	title,
	exclude,
	errorNotes,
	errors,
	onSubmit,
	onValid,
	onChange,
	onError,
	values,
	buttonLabel,
	footer
}) {
	let samePassword = new Validator(
		password => password === values.password,
		"Password does not match."
	);
	const fields = [
		{
			type: TEXT,
			name: "username",
			id: "username",
			validators: [validators.username],
			props: {
				label: "Username",
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
				required: true
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
			id: "gender",
			name: "gender",
			validators: [validators.requiredField],
			props: {
				label: "Gender",
				fullWidth: true,
				items: [{ value: "m", label: "Male" }, { value: "f", label: "Female" }],
				required: true
			}
		}
	];
	return (
		<Form
			title={title}
			fields={fields}
			exclude={exclude}
			errorNotes={errorNotes}
			errors={errors}
			onSubmit={onSubmit}
			onValid={onValid}
			onChange={onChange}
			onError={onError}
			values={values}
			buttonLabel={buttonLabel}
			footer={footer}
		/>
	);
}

export default GuestSignUp;
