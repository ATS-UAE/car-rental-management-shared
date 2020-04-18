import React from "react";
import Form, { FIELDS } from "./Form";
import { validators } from "../../../utils/helpers";
const { TEXT } = FIELDS;

function ForgotPassword({
	title,
	exclude,
	errorNotes,
	onChange,
	values,
	footer,
	onError,
	errors
}) {
	const fields = [
		{
			type: TEXT,
			name: "email",
			id: "email",
			validators: [validators.email],
			props: {
				label: "Email Address",
				required: true
			},
			GridProps: {
				xs: 12,
				md: 12
			}
		}
	];
	return (
		<Form
			title={title}
			fields={fields}
			exclude={exclude}
			errorNotes={errorNotes}
			onChange={onChange}
			values={values}
			footer={footer}
			onError={onError}
			errors={errors}
		/>
	);
}

export default ForgotPassword;
