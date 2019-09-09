import React, { useState } from "react";
import PropTypes from "prop-types";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

export default function PasswordField({
	value,
	onChange,
	error,
	required,
	label,
	id,
	fullWidth
}) {
	const [showPassword, setShowPassword] = useState(false);
	function handleShowPassword() {
		setShowPassword(!showPassword);
	}

	return (
		<TextField
			id={id}
			onChange={onChange}
			value={value}
			error={error}
			label={label}
			required={required}
			fullWidth={fullWidth}
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<IconButton
							aria-label="Toggle password visibility"
							onClick={handleShowPassword}
						>
							{showPassword ? <Visibility /> : <VisibilityOff />}
						</IconButton>
					</InputAdornment>
				)
			}}
			type={showPassword ? "text" : "password"}
		/>
	);
}

PasswordField.propTypes = {
	onChange: PropTypes.func,
	required: PropTypes.bool,
	label: PropTypes.string,
	id: PropTypes.string
};
