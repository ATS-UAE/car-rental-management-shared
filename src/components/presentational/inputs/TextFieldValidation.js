import React, { useState } from "react";
import PropTypes from "prop-types";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

import { Validator } from "../../../utils";

export default function TextFieldValidation(props) {
	const {
		showErrors,
		errors,
		validators,
		onChange,
		value,
		label,
		id,
		TextFieldProps,
		onError,
		onValid,
		required
	} = props;
	let helperText = "";
	let errored = false;
	let validatorErrors = [];
	if (validators instanceof Array) {
		validatorErrors = Validator.runThroughValidators(validators, value);
	} else if (validators instanceof Validator) {
		validatorErrors = validators.test(value) ? [] : [validators];
	}
	if (validatorErrors.length > 0) {
		if (showErrors) {
			errored = true;
			helperText = validatorErrors[0].error;
		}
		onError && onError(validatorErrors.map(v => v.error));
	} else if (errors.length > 0) {
		if (showErrors) {
			errored = true;
			helperText = errors[0];
		}
	}
	const [showPassword, setShowPassword] = useState(false);
	function handleShowPassword() {
		setShowPassword(!showPassword);
	}
	const inputAdornment = TextFieldProps.type === "password" && (
		<InputAdornment position="end">
			<IconButton
				aria-label="Toggle password visibility"
				onClick={handleShowPassword}
			>
				{showPassword ? <Visibility /> : <VisibilityOff />}
			</IconButton>
		</InputAdornment>
	);
	return (
		<TextField
			id={id}
			onChange={e => {
				onChange && onChange(e);
				errored && onValid && onValid(e);
			}}
			value={value}
			error={value.length > 0 && errored}
			label={helperText && value && errored ? helperText : label}
			required={required}
			{...TextFieldProps}
			type={showPassword ? "text" : TextFieldProps.type}
			InputProps={{
				endAdornment: inputAdornment
			}}
		/>
	);
}

TextFieldValidation.propTypes = {
	showErrors: PropTypes.bool,
	errors: PropTypes.arrayOf(PropTypes.string),
	validators: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.instanceOf(Validator)),
		PropTypes.instanceOf(Validator)
	]),
	onChange: PropTypes.func,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	label: PropTypes.string,
	id: PropTypes.string,
	TextFieldProps: PropTypes.object,
	onError: PropTypes.func,
	onValid: PropTypes.func,
	required: PropTypes.bool
};

TextFieldValidation.defaultProps = {
	showErrors: true,
	errors: [],
	validators: [],
	required: false
};
