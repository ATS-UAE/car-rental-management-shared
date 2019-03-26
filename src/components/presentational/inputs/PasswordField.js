import React, { useState } from "react";
import PropTypes from "prop-types";
import TextFieldValidation from "./TextFieldValidation";
import { validators, Validator } from "../../../utils";

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
		id
	} = props;
	return (
		<TextFieldValidation
			TextFieldProps={{
				autoComplete: "password",
				type: "password",
				...TextFieldProps
			}}
			required={required}
			id={id}
			label={label}
			errors={errors}
			showErrors={showErrors}
			validators={[validators.password, ...props.validators]}
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
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	onError: PropTypes.func,
	onValid: PropTypes.func,
	onChange: PropTypes.func,
	TextFieldProps: PropTypes.object,
	label: PropTypes.string,
	validators: PropTypes.arrayOf(PropTypes.instanceOf(Validator))
};

PasswordField.defaultProps = {
	id: "password",
	label: "Password",
	validators: []
};
