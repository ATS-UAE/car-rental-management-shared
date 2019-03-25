import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Typography, Grid, withStyles, Paper } from "@material-ui/core";
import UsernameField from "../inputs/UsernameField";
import GenericTextField from "../inputs/GenericTextField";
import GenderSelect from "../inputs/GenderSelect";
import ErrorChip from "../display/ErrorChip";
import EmailField from "../inputs/EmailField";
import RoleSelect from "../../containers/inputs/RoleSelect";

function UserCreate({
	classes,
	values,
	onChange,
	onSubmit,
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
		onSubmit && onSubmit();
	};

	const handleValid = name => event => {
		setValidFields({ ...validFields, [name]: true });
		onValid && onValid({ ...values, [name]: event.target.value });
	};
	return (
		<Paper className={classes.paper}>
			<form>
				{errorNotes.map((e, i) => (
					<ErrorChip key={i} label={e} />
				))}
				<Typography variant="h6" gutterBottom headlineMapping={{ h6: "h1" }}>
					User Update
				</Typography>
				<Grid container spacing={24}>
					<Grid item sm={6} xs={12}>
						<GenericTextField
							id="user-id"
							label="ID"
							errors={errors.userId}
							value={values.userId}
							showErrors={showErrors}
							onError={handleError("userId")}
							onChange={handleChange("userId")}
							onValid={handleValid("userId")}
							TextFieldProps={{ fullWidth: true, disabled: true }}
						/>
					</Grid>
					<Grid item sm={6} xs={12}>
						<UsernameField
							TextFieldProps={{
								fullWidth: true
							}}
							value={values.username}
							errors={errors.username}
							showErrors={showErrors}
							onError={handleError("username")}
							onChange={handleChange("username")}
							onValid={handleValid("username")}
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
							value={values.gender}
							fullWidth
							onChange={handleChange("gender")}
						/>
					</Grid>
					<Grid item sm={6} xs={12}>
						<RoleSelect
							value={values.roleId}
							fullWidth
							onChange={handleChange("roleId")}
						/>
					</Grid>
					<Grid item sm={12}>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							onClick={handleSubmit}
						>
							Update
						</Button>
					</Grid>
				</Grid>
			</form>
		</Paper>
	);
}

UserCreate.propTypes = {
	values: PropTypes.shape({
		userId: PropTypes.string.isRequired,
		username: PropTypes.string.isRequired,
		firstName: PropTypes.string.isRequired,
		lastName: PropTypes.string.isRequired,
		email: PropTypes.string.isRequired,
		mobileNumber: PropTypes.string.isRequired,
		gender: PropTypes.string.isRequired,
		roleId: PropTypes.string.isRequired
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
	values: {},
	errorNotes: []
};

const style = theme => ({
	paper: {
		padding: theme.spacing.unit * 3
	}
});

export default withStyles(style)(UserCreate);
