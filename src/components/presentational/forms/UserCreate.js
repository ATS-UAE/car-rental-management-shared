import React, { useState } from "react";
import PropTypes from "prop-types";
import { Paper, Button, Typography, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import UsernameField from "../inputs/UsernameField";
import PasswordField from "../inputs/PasswordField";
import GenericTextField from "../inputs/GenericTextField";
import GenderSelect from "../inputs/GenderSelect";
import ErrorChip from "../display/ErrorChip";
import EmailField from "../inputs/EmailField";
import { Validator } from "../../../utils";
import RoleSelect from "../../containers/inputs/RoleSelect";

function UserCreate({
	classes,
	values,
	onChange,
	onCreate,
	errors,
	onError,
	showErrors,
	onValid,
	errorNotes
}) {
	const [validFields, setValidFields] = useState({
		username: false,
		password: false
	});
	const handleChange = name => event =>
		onChange && onChange({ ...values, [name]: event.target.value });
	const handleError = name => () => onError && onError(name);
	const handleSubmit = event => {
		event.preventDefault();
		onCreate && onCreate();
	};

	const handleValid = name => event => {
		setValidFields({ ...validFields, [name]: true });
		onValid && onValid({ ...values, [name]: event.target.value });
	};
	let samePassword = new Validator(
		password => password === values.password,
		"Password does not match."
	);
	return (
		<Paper className={classes.paper}>
			{errorNotes.map((e, i) => (
				<ErrorChip key={i} label={e} className={classes.errorNotes} />
			))}
			<form>
				<Typography variant="h6" gutterBottom headlineMapping={{ h6: "h1" }}>
					User Create
				</Typography>
				<Grid container spacing={24}>
					<Grid item sm={6} xs={12}>
						<UsernameField
							TextFieldProps={{
								className: classes.textFields
							}}
							required
							value={values.username}
							errors={errors.username}
							showErrors={showErrors}
							onError={handleError("username")}
							onChange={handleChange("username")}
							onValid={handleValid("username")}
							TextFieldProps={{ fullWidth: true }}
						/>
					</Grid>
					<Grid item sm={6} xs={12}>
						<PasswordField
							TextFieldProps={{
								className: classes.textFields
							}}
							required
							value={values.password}
							errors={errors.password}
							showErrors={showErrors}
							onError={handleError("password")}
							onChange={handleChange("password")}
							onValid={handleValid("password")}
							TextFieldProps={{ fullWidth: true }}
						/>
					</Grid>
					<Grid item sm={6} xs={12}>
						<PasswordField
							TextFieldProps={{
								className: classes.textFields
							}}
							id="password-confirm"
							validators={[samePassword]}
							required
							label="Validate Password"
							value={values.password}
							errors={errors.password}
							showErrors={showErrors}
							onError={handleError("password")}
							onChange={handleChange("password")}
							onValid={handleValid("password")}
							TextFieldProps={{ fullWidth: true }}
						/>
					</Grid>
					<Grid item sm={6} xs={12}>
						<GenericTextField
							id="first-name"
							label="First name"
							errors={errors.firstName}
							value={values.firstName}
							showErrors={showErrors}
							onError={handleError("firstName")}
							onChange={handleChange("firstName")}
							onValid={handleValid("firstName")}
							TextFieldProps={{ fullWidth: true }}
						/>
					</Grid>
					<Grid item sm={6} xs={12}>
						<GenericTextField
							id="last-name"
							label="Last name"
							errors={errors.lastName}
							value={values.lastName}
							showErrors={showErrors}
							onError={handleError("lastName")}
							onChange={handleChange("lastName")}
							onValid={handleValid("lastName")}
							TextFieldProps={{ fullWidth: true }}
						/>
					</Grid>
					<Grid item sm={6} xs={12}>
						<EmailField
							required
							errors={errors.email}
							value={values.email}
							showErrors={showErrors}
							onError={handleError("email")}
							onChange={handleChange("email")}
							onValid={handleValid("email")}
							TextFieldProps={{ fullWidth: true }}
						/>
					</Grid>
					<Grid item sm={6} xs={12}>
						<GenericTextField
							id="mobile-number"
							label="Mobile Number"
							errors={errors.mobileNumber}
							value={values.mobileNumber}
							showErrors={showErrors}
							onError={handleError("mobileNumber")}
							onChange={handleChange("mobileNumber")}
							onValid={handleValid("mobileNumber")}
							TextFieldProps={{ fullWidth: true }}
						/>
					</Grid>

					<Grid item sm={6} xs={12}>
						<GenderSelect
							required
							fullWidth
							onChange={handleChange("mobileNumber")}
						/>
					</Grid>
					<Grid item sm={6} xs={12}>
						<RoleSelect
							required
							fullWidth
							onChange={handleChange("mobileNumber")}
						/>
					</Grid>
				</Grid>
				<Typography align="right">*Required</Typography>
				<div className={classes.buttonContainer}>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						onClick={handleSubmit}
					>
						Create
					</Button>
				</div>
			</form>
		</Paper>
	);
}

UserCreate.propTypes = {
	values: PropTypes.shape({
		username: PropTypes.string.isRequired,
		password: PropTypes.string.isRequired
	}).isRequired,
	errorNotes: PropTypes.arrayOf(PropTypes.string),
	onChange: PropTypes.func,
	onLogin: PropTypes.func,
	errors: PropTypes.arrayOf(PropTypes.string),
	onError: PropTypes.func,
	showErrors: PropTypes.func
};

UserCreate.defaultProps = {
	showErrors: true,
	errors: {},
	values: {}
};

const styles = theme => ({
	textFields: {
		"&:not(:last-child)": {
			marginBottom: theme.spacing.unit
		}
	},
	buttonContainer: {
		marginTop: theme.spacing.unit,
		display: "flex",
		justifyContent: "space-between"
	},
	paper: {
		padding: theme.spacing.unit * 3,
		borderRadius: "1rem"
	}
});

export default withStyles(styles)(UserCreate);
