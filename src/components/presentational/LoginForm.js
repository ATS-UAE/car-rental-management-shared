import React from "react";
import PropTypes from "prop-types";
import { Paper, Button, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import TextFieldValidation from "./TextFieldValidation";
import { validators } from "../../utils";

function LoginForm(props) {
	const {
		classes,
		values,
		onChange,
		onLogin,
		errors,
		onError,
		showErrors
	} = props;
	const handleChange = name => event =>
		onChange && onChange({ ...values, [name]: event.target.value });
	const handleError = name => () => onError && onError(name);
	const handleSubmit = event => {
		event.preventDefault();
		onLogin && onLogin();
	};
	return (
		<Paper className={classes.paper}>
			<form>
				<TextFieldValidation
					TextFieldProps={{
						className: classes.textFields,
						autoFocus: true,
						autoComplete: "username",
						fullWidth: true,
						required: true
					}}
					id="username"
					label="Username"
					errors={errors}
					showErrors={showErrors}
					validators={validators.username}
					value={values.username}
					onChange={handleChange("username")}
					onError={handleError("username")}
				/>
				<TextFieldValidation
					TextFieldProps={{
						className: classes.textFields,
						autoComplete: "password",
						type: "password",
						fullWidth: true,
						required: true
					}}
					id="password"
					label="Password"
					errors={errors}
					showErrors={showErrors}
					validators={validators.password}
					value={values.password}
					onChange={handleChange("password")}
					onError={handleError("password")}
				/>
				<Typography align="right">*Required</Typography>
				<div className={classes.buttonContainer}>
					<Button size="small">Forgot your password?</Button>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						onClick={handleSubmit}
					>
						Login
					</Button>
				</div>
			</form>
		</Paper>
	);
}

LoginForm.propTypes = {
	values: PropTypes.shape({
		username: PropTypes.string.isRequired,
		password: PropTypes.string.isRequired
	}).isRequired,
	onChange: PropTypes.func,
	onLogin: PropTypes.func,
	errors: PropTypes.arrayOf(PropTypes.string),
	onError: PropTypes.func,
	showErrors: PropTypes.func
};

LoginForm.defaultProps = {
	showErrors: true,
	errors: []
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

export default withStyles(styles)(LoginForm);
