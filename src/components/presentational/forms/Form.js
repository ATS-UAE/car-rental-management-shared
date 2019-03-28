import React from "react";
import PropTypes from "prop-types";
import { Grid, Button, Paper, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import UsernameField from "../inputs/UsernameField";
import PasswordField from "../inputs/PasswordField";
import TextField from "../inputs/GenericTextField";
import Select from "../inputs/SimpleSelect";
import ErrorChip from "../display/ErrorChip";

export const FIELDS = {
	USERNAME: UsernameField,
	PASSWORD: PasswordField,
	TEXT: TextField,
	SELECT: Select
};

function Form({
	fields,
	classes,
	errorNotes,
	handleSubmit,
	title,
	onValid,
	values,
	onChange,
	onSubmit,
	errors,
	onError
}) {
	const handleChange = name => event =>
		onChange && onChange({ ...values, [name]: event.target.value });
	const handleError = name => () => onError && onError(name);
	const handleSubmit = event => {
		event.preventDefault();
		onSubmit && onSubmit();
	};
	const handleValid = name => event => {
		onValid && onValid({ ...values, [name]: event.target.value });
	};
	return (
		<Paper className={classes.paper}>
			<form>
				{errorNotes.map((e, i) => (
					<ErrorChip key={i} label={e} />
				))}
				{title && (
					<Typography variant="h6" gutterBottom headlineMapping={{ h6: "h1" }}>
						{title}
					</Typography>
				)}
				<Grid container spacing={24}>
					{fields.map(field => {
						const Component = field.type;
						const { props, name, id } = field;

						return (
							<Grid item xs={12} sm={6}>
								<Component
									{...props}
									key={name}
									id={id}
									value={values[name]}
									errors={errors[name]}
									onError={handleError(name)}
									onChange={handleChange(name)}
									onValid={handleValid(name)}
								/>
							</Grid>
						);
					})}
					<Grid item xs={12}>
						<Grid container justify="space-between">
							<Grid item>
								<Button
									type="submit"
									variant="contained"
									color="primary"
									onClick={handleSubmit}
								>
									Create
								</Button>
							</Grid>
							<Grid item>
								<Typography>*Required</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</form>
		</Paper>
	);
}

Form.propTypes = {
	fields: PropTypes.arrayOf(
		PropTypes.shape({
			type: PropTypes.func.isRequired,
			props: PropTypes.object,
			name: PropTypes.string.isRequired,
			id: PropTypes.string.isRequired
		})
	),
	errorNotes: PropTypes.arrayOf(PropTypes.string),
	handleSubmit: PropTypes.func,
	title: PropTypes.string,
	errors: PropTypes.arrayOf(PropTypes.string)
};

Form.defaultProps = {
	fields: [],
	errorNotes: []
};

const style = theme => ({
	paper: {
		padding: theme.spacing.unit * 3
	}
});

export default withStyles(style)(Form);
