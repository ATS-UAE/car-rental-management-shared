import React, { useState } from "react";
import PropTypes from "prop-types";
import { Paper, Button, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import TextFieldValidation from "./TextFieldValidation";
import { validators } from "../../utils";
import ErrorChip from "./ErrorChip";

function LoginForm(props) {
	const {
		classes,
		values,
		onChange,
		onLogin,
		errors,
		onError,
		showErrors,
		onValid,
		errorNotes
	} = props;
	const [validFields, setValidFields] = useState({
		username: false,
		password: false
	});
	const handleChange = name => event =>
		onChange && onChange({ ...values, [name]: event.target.value });

	const handleError = name => () => {
		if (validFields[name]) {
			setValidFields({ ...validFields, [name]: false });
			onError && onError(name);
		}
	};

	const handleValid = name => () => {
		setValidFields({ ...validFields, [name]: true });
		onValid && onValid(name);
	};

	const handleSubmit = event => {
		event.preventDefault();
		onLogin && onLogin();
	};

	const isSubmitDisabled = Object.values(validFields).includes(false);

	return (
		<Paper className={classes.paper}>
			{errorNotes.map((e, i) => (
				<ErrorChip key={i} label={e} className={classes.errorNotes} />
			))}
			<form>
				<Typography variant="h6" gutterBottom headlineMapping={{ h6: "h1" }}>
					Login
				</Typography>
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
					onValid={handleValid("username")}
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
					onValid={handleValid("password")}
				/>
				<Typography align="right">*Required</Typography>
				<div className={classes.buttonContainer}>
					<Button size="small">Forgot your password?</Button>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						onClick={handleSubmit}
						disabled={isSubmitDisabled}
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
	errorNotes: PropTypes.arrayOf(PropTypes.string),
	onChange: PropTypes.func,
	onLogin: PropTypes.func,
	errors: PropTypes.arrayOf(PropTypes.string),
	onError: PropTypes.func,
	showErrors: PropTypes.bool,
	onValid: PropTypes.func
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
	},
	errorNotes: {
		margin: theme.spacing.unit
	}
});

export default withStyles(styles)(LoginForm);
