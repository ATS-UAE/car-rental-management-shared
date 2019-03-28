import React, { useState } from "react";
import PropTypes from "prop-types";
import TextFieldValidation from "./TextFieldValidation";

export default function GenericTextField({
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
}) {
	const [stateValue, setStateValue] = useState("");
	return (
		<TextFieldValidation
			TextFieldProps={{
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

GenericTextField.propTypes = {
	errors: PropTypes.arrayOf(PropTypes.string),
	id: PropTypes.string.isRequired,
	showErrors: PropTypes.bool,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	onError: PropTypes.func,
	onValid: PropTypes.func,
	onChange: PropTypes.func,
	TextFieldProps: PropTypes.object,
	label: PropTypes.string
};
