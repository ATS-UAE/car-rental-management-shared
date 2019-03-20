import React, { useState } from "react";
import PropTypes from "prop-types";
import TextFieldValidation from "./TextFieldValidation";

export default function PasswordField(props) {
	const [stateValue, setStateValue] = useState("");
	const {
		errors,
		showErrors,
		value,
		onError,
		onChange,
		onValid,
		TextFieldProps,
		required,
		label,
		id,
		validators
	} = props;
	return (
		<TextFieldValidation
			TextFieldProps={{
				autoComplete: "text",
				type: "text",
				...TextFieldProps
			}}
			required={required}
			id={id}
			label={label}
			errors={errors}
			showErrors={showErrors}
			validators={validators}
			value={value === undefined ? stateValue : value}
			onChange={e => (onChange && onChange(e)) || setStateValue(e.target.value)}
			onError={e => onError && onError(e)}
			onValid={e => onValid && onValid(e)}
		/>
	);
}

PasswordField.propTypes = {
	errors: PropTypes.arrayOf(PropTypes.string),
	id: PropTypes.string.isRequired,
	showErrors: PropTypes.bool,
	value: PropTypes.string,
	onError: PropTypes.func,
	onValid: PropTypes.func,
	onChange: PropTypes.func,
	TextFieldProps: PropTypes.object,
	label: PropTypes.string
};
