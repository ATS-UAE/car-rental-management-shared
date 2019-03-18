import React, { useState } from "react";
import PropTypes from "prop-types";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

import { Validator } from "../../utils";

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
		onValid
	} = props;
	let helperText = "";
	let errored = false;
	let validatorErrors = Validator.runThroughValidators(validators, value);
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
				errored && onValid && onValid();
			}}
			value={value}
			error={value.length > 0 && errored}
			label={helperText && value && errored ? helperText : label}
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
	validators: PropTypes.arrayOf(PropTypes.instanceOf(Validator)),
	onChange: PropTypes.func,
	value: PropTypes.string,
	label: PropTypes.string,
	id: PropTypes.string,
	TextFieldProps: PropTypes.object,
	onError: PropTypes.func,
	onValid: PropTypes.func
};

TextFieldValidation.defaultProps = {
	showErrors: true,
	errors: [],
	validators: []
};
