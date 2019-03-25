import React, { useState } from "react";
import PropTypes from "prop-types";
import { Paper, Button, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import ErrorChip from "../display/ErrorChip";
import UsernameField from "../inputs/UsernameField";
import PasswordField from "../inputs/PasswordField";

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

	const handleError = name => e => {
		if (validFields[name]) {
			setValidFields({ ...validFields, [name]: false });
			onError && onError(name, e);
		}
	};

	const handleValid = name => event => {
		setValidFields({ ...validFields, [name]: true });
		onValid && onValid({ ...values, [name]: event.target.value });
	};

	const handleSubmit = event => {
		event.preventDefault();
		onLogin && onLogin();
	};

	const isSubmitDisabled = Object.values(validFields).includes(false);

	return (
		<Paper className={classes.paper}>
			<form>
				{errorNotes.map((e, i) => (
					<ErrorChip key={i} label={e} className={classes.errorNotes} />
				))}
				<Typography variant="h6" gutterBottom headlineMapping={{ h6: "h1" }}>
					Login
				</Typography>
				<UsernameField
					TextFieldProps={{
						className: classes.textFields,
						fullWidth: true
					}}
					required
					value={values.username}
					errors={errors.username}
					showErrors={showErrors}
					onError={handleError("username")}
					onChange={handleChange("username")}
					onValid={handleValid("username")}
				/>
				<PasswordField
					TextFieldProps={{
						className: classes.textFields,
						fullWidth: true
					}}
					required
					value={values.password}
					errors={errors.password}
					showErrors={showErrors}
					onError={handleError("password")}
					onChange={handleChange("password")}
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
	errors: PropTypes.object,
	onError: PropTypes.func,
	showErrors: PropTypes.bool,
	onValid: PropTypes.func
};

LoginForm.defaultProps = {
	showErrors: true,
	errors: {
		username: [],
		password: []
	}
};

const styles = theme => ({
	paper: {
		padding: theme.spacing.unit * 3
	},
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
	errorNotes: {
		margin: theme.spacing.unit
	}
});

export default withStyles(styles)(LoginForm);
