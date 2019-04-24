import React from "react";
import Form, { FIELDS } from "./Form";
import { Validator } from "../../../utils";
const { SELECT, USERNAME, PASSWORD, TEXT, EMAIL } = FIELDS;

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
			type: USERNAME,
			name: "username",
			id: "username",
			props: {
				required: true
			}
		},
		{
			type: PASSWORD,
			name: "password",
			id: "password",
			props: {
				label: "Password",
				required: true
			}
		},
		{
			type: PASSWORD,
			name: "passwordConfirm",
			id: "password-confirm",
			props: {
				label: "Confirm Password",
				required: true,
				validators: [samePassword]
			}
		},
		{
			type: TEXT,
			id: "first-name",
			name: "firstName",
			props: {
				label: "First Name",
				required: true
			}
		},
		{
			type: TEXT,
			id: "last-name",
			name: "lastName",
			props: {
				label: "Last Name",
				required: true
			}
		},
		{
			type: TEXT,
			id: "mobile-number",
			name: "mobileNumber",
			props: {
				label: "Mobile Number",
				required: true
			}
		},
		{
			type: SELECT,
			id: "gender",
			name: "gender",
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
