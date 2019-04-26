import React from "react";
import Form, { FIELDS } from "./Form";
import { validators } from "../../../utils";
const { PASSWORD, TEXT } = FIELDS;

function LoginForm({ title, exclude, errorNotes, onChange, values, footer }) {
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
				required: true,
				type: "password"
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
		/>
	);
}

export default LoginForm;
