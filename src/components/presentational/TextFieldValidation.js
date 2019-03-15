import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@material-ui/core";

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
		onError
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

	return (
		<TextField
			id={id}
			onChange={e => {
				onChange && onChange(e);
			}}
			value={value}
			helperText={helperText}
			error={errored}
			label={label}
			{...TextFieldProps}
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
	onError: PropTypes.func
};

TextFieldValidation.defaultProps = {
	showErrors: true,
	errors: [],
	validators: []
};
