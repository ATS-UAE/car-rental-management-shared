import React, { useState } from "react";
import PropTypes from "prop-types";
import TextFieldValidation from "./TextFieldValidation";
import { validators } from "../../../utils";

export default function PasswordField({
	errors,
	showErrors,
	value,
	onError,
	onChange,
	onValid,
	TextFieldProps,
	required,
	label
}) {
	const [stateValue, setStateValue] = useState("");
	return (
		<TextFieldValidation
			TextFieldProps={{
				autoComplete: "email",
				type: "text",
				...TextFieldProps
			}}
			required={required}
			id="email"
			label={label}
			errors={errors}
			showErrors={showErrors}
			validators={validators.email}
			value={value === undefined ? stateValue : value}
			onChange={e => (onChange && onChange(e)) || setStateValue(e.target.value)}
			onError={e => onError && onError(e)}
			onValid={e => onValid && onValid(e)}
		/>
	);
}

PasswordField.propTypes = {
	errors: PropTypes.arrayOf(PropTypes.string),
	showErrors: PropTypes.bool,
	value: PropTypes.string,
	onError: PropTypes.func,
	onValid: PropTypes.func,
	onChange: PropTypes.func,
	TextFieldProps: PropTypes.object,
	label: PropTypes.string
};

PasswordField.defaultProps = {
	label: "Email"
};
