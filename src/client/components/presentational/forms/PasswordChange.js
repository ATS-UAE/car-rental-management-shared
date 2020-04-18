import React from "react";
import Form, { FIELDS } from "./Form";
import { Validator, validators } from "../../../utils/helpers";
const { PASSWORD } = FIELDS;

function PasswordChange({
	title,
	exclude,
	errorNotes,
	errors,
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
			type: PASSWORD,
			name: "password",
			id: "password",
			validators: [validators.password],
			props: {
				label: "New Password",
				required: true
			},
			GridProps: {
				sm: 12
			}
		},
		{
			type: PASSWORD,
			name: "passwordConfirm",
			id: "password-confirm",
			validators: [samePassword],
			GridProps: {
				sm: 12
			},
			props: {
				label: "Confirm New Password",
				required: true
			}
		},
		{
			type: PASSWORD,
			name: "passwordOld",
			id: "password-old",
			validators: [validators.password],
			props: {
				label: "Old Password",
				required: true
			},
			GridProps: {
				sm: 12
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
			onValid={onValid}
			onChange={onChange}
			onError={onError}
			values={values}
			buttonLabel={buttonLabel}
			footer={footer}
		/>
	);
}

export default PasswordChange;
