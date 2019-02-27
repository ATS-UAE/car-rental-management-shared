import React from "react";
import PropTypes from "prop-types";
import { Paper, Button, Chip, withStyles, Typography } from "@material-ui/core";
import { Done } from "@material-ui/icons";
import { Link } from "react-router-dom";
import TextFieldValidation from "./TextFieldValidation";
import { validators } from "../../utils";

function LoginForm(props) {
	const {
		classes,
		value,
		onChange,
		onSubmit,
		errors,
		onError,
		showErrors,
		emailSent,
		loginPath
	} = props;
	const handleSubmit = event => {
		event.preventDefault();
		onSubmit && onSubmit();
	};
	return (
		<Paper className={classes.paper}>
			<form className={classes.form}>
				<Typography variant="h6" gutterBottom headlineMapping={{ h6: "h1" }}>
					Recover password
				</Typography>
				{emailSent && (
					<Chip
						icon={<Done />}
						label="Please check your email for further instructions."
						className={classes.chip}
						color="primary"
					/>
				)}
				<TextFieldValidation
					TextFieldProps={{
						className: classes.textFields,
						autoFocus: true,
						autoComplete: "email",
						fullWidth: true
					}}
					id="email"
					label="Email"
					errors={errors}
					showErrors={showErrors}
					validators={validators.email}
					value={value}
					onChange={onChange}
					onError={onError}
				/>
				<div className={classes.buttonContainer}>
					{emailSent ? (
						<Button
							type="submit"
							variant="contained"
							color="primary"
							onClick={e => e.preventDefault()}
						>
							<Link className={classes.link} to={loginPath}>
								Login
							</Link>
						</Button>
					) : (
						<Button
							type="submit"
							variant="contained"
							color="primary"
							onClick={handleSubmit}
						>
							Confirm
						</Button>
					)}
				</div>
			</form>
		</Paper>
	);
}

LoginForm.propTypes = {
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	onSubmit: PropTypes.func,
	errors: PropTypes.arrayOf(PropTypes.string),
	onError: PropTypes.func,
	showErrors: PropTypes.func,
	emailSent: PropTypes.bool,
	loginPath: PropTypes.string
};

LoginForm.defaultProps = {
	showErrors: true,
	errors: [],
	emailSent: false,
	loginPath: "/login"
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
		justifyContent: "space-between",
		flexDirection: "row-reverse"
	},
	paper: {
		padding: theme.spacing.unit * 3,
		borderRadius: "1rem"
	},
	form: {
		display: "flex",
		flexDirection: "column"
	},
	link: {
		color: theme.palette.primary.contrastText,
		textDecoration: "none"
	},
	chip: {
		alignSelf: "center"
	}
});

export default withStyles(styles)(LoginForm);
