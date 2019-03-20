import React, { useState } from "react";
import PropTypes from "prop-types";
import TextFieldValidation from "./TextFieldValidation";
import { validators } from "../../../utils";

export default function UsernameField(props) {
	const {
		errors,
		showErrors,
		value,
		onError,
		onValid,
		onChange,
		TextFieldProps,
		required,
		label
	} = props;
	const [stateValue, setStateValue] = useState("");
	return (
		<TextFieldValidation
			TextFieldProps={{
				autoComplete: "username",
				...TextFieldProps
			}}
			required={required}
			id="username"
			label={label}
			errors={errors}
			showErrors={showErrors}
			validators={validators.username}
			value={value === undefined ? stateValue : value}
			onChange={e => (onChange && onChange(e)) || setStateValue(e.target.value)}
			onError={e => onError && onError(e)}
			onValid={e => onValid && onValid(e)}
		/>
	);
}

UsernameField.propTypes = {
	errors: PropTypes.arrayOf(PropTypes.string),
	showErrors: PropTypes.bool,
	value: PropTypes.string,
	onError: PropTypes.func,
	onValid: PropTypes.func,
	onChange: PropTypes.func,
	TextFieldProps: PropTypes.object,
	required: PropTypes.bool,
	label: PropTypes.string
};

UsernameField.defaultProps = {
	label: "Username"
};
