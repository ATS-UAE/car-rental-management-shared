// import React, { useState, FC } from "react";
// import {
// 	TextField as MuiTextField,
// 	InputAdornment,
// 	IconButton
// } from "@material-ui/core";
// import { Visibility, VisibilityOff } from "@material-ui/icons";
// import { IBaseInputProps, IInputProps } from "../../../utils/typings";

// const TextField: FC<IBaseInputProps & IInputProps> = ({
// 	field,
// 	label,
// 	disabled,
// 	fullWidth,
// 	error,
// 	type
// }) => {
// 	const [showPassword, setShowPassword] = useState(false);
// 	function handleShowPassword() {
// 		setShowPassword(!showPassword);
// 	}

// 	return (
// 		<MuiTextField
// 			type={type}
// 			fullWidth={fullWidth}
// 			disabled={disabled}
// 			id={field.name}
// 			onBlur={field.onBlur}
// 			name={field.name}
// 			error={error}
// 			label={label}
// 			value={field.value}
// 			inputProps={{ onBlur: field.onBlur }}
// 			onChange={field.onChange}
// 			margin="normal"
// 			InputProps={{
// 				endAdornment: type === "password" && (
// 					<InputAdornment position="end">
// 						<IconButton
// 							aria-label="Toggle password visibility"
// 							onClick={handleShowPassword}
// 						>
// 							{showPassword ? <Visibility /> : <VisibilityOff />}
// 						</IconButton>
// 					</InputAdornment>
// 				)
// 			}}
// 		/>
// 	);
// };

// TextField.defaultProps = {
// 	type: "text"
// };

// export default TextField;
