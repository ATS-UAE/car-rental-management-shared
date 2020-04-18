import React, { FC, useState } from "react";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import { StandardTextFieldProps } from "@material-ui/core/TextField";
import { Visibility, VisibilityOff } from "@material-ui/icons";

import { InputProps, Field } from ".";

export interface FieldTextProps extends InputProps<FieldTextValue> {
	type?: string;
	fullWidth?: boolean;
	TextFieldProps?: Omit<StandardTextFieldProps, keyof FieldTextProps>;
}

export type FieldTextValue = string;

export const FieldText: FC<FieldTextProps> = ({
	helperText,
	className,
	type,
	TextFieldProps = {},
	label,
	name,
	fullWidth,
	transformer
}) => {
	const [isPasswordHidden, hidePassword] = useState<boolean>(false);
	const handleShowPassword = () => {
		hidePassword(!isPasswordHidden);
	};

	return (
		<Field<FieldTextValue> name={name} defaultValue="">
			{({ onBlur, setFieldValue, value, touched, error }) => (
				<TextField
					type={type}
					{...TextFieldProps}
					fullWidth={fullWidth}
					onBlur={onBlur}
					value={value}
					onChange={e =>
						transformer
							? setFieldValue(transformer(e.target.value as FieldTextValue))
							: setFieldValue(e.target.value as FieldTextValue)
					}
					label={label}
					InputProps={{
						endAdornment:
							type === "password" ? (
								<InputAdornment position="end">
									<IconButton
										aria-label="Toggle password visibility"
										onClick={handleShowPassword}
									>
										{isPasswordHidden ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
							) : null
					}}
					className={className}
					error={Boolean(touched && error)}
					helperText={(touched && error) || helperText}
				/>
			)}
		</Field>
	);
};
