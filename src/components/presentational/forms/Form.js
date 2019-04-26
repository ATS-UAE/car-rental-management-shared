import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Grid, Typography, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PasswordField from "../inputs/PasswordField";
import Select from "../inputs/SimpleSelect";
import ErrorChip from "../display/ErrorChip";
import Slider from "../inputs/Slider";
import DateTimePicker from "../inputs/DateTimePicker";
import { Validator } from "../../../utils";

export const FIELDS = {
	PASSWORD: PasswordField,
	TEXT: TextField,
	SELECT: Select,
	SLIDER: Slider,
	DATE_TIME_PICKER: DateTimePicker
};

function Form({
	fields,
	classes,
	errorNotes,
	title,
	values,
	onChange,

	exclude,
	children,
	footer
}) {
	const handleChange = (name, errors) => e =>
		onChange && onChange({ ...values, [name]: e.target.value }, name, errors);
	const formFields = fields.filter(field => !exclude.includes(field.name));
	return (
		<Fragment>
			<form>
				{errorNotes.map((e, i) => (
					<ErrorChip key={i} label={e} />
				))}
				{title && (
					<Typography
						variant="h6"
						gutterBottom
						headlineMapping={{ h6: "h1" }}
						className={classes.title}
					>
						{title}
					</Typography>
				)}
				<Grid container spacing={24}>
					{formFields.map(field => {
						const Component = field.type;
						const { props = {}, name, id, GridProps } = field;
						const errors = Validator.runThroughValidators(
							field.validators,
							values[name]
						).map(error => error.error);
						useEffect(() => {
							handleChange(name, errors)({ target: { value: values[name] } });
						}, []);
						return (
							<Grid item xs={12} sm={6} key={name} {...GridProps}>
								<Component
									id={id}
									value={values[name] || ""}
									onChange={e => {
										const errors = Validator.runThroughValidators(
											field.validators,
											e.target.value
										).map(error => error.error);
										handleChange(name, errors)(e);
									}}
									{...props}
									label={errors[0] && values[name] ? errors[0] : props.label}
									error={
										errors.length && values[name] !== undefined ? true : false
									}
									fullWidth
								/>
							</Grid>
						);
					})}
					{children}
					<Grid item xs={12}>
						<Grid item className={classes.notes}>
							<Typography>*Required</Typography>
						</Grid>
						{footer}
					</Grid>
				</Grid>
			</form>
		</Fragment>
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
	buttonLabel: PropTypes.string,
	errorNotes: PropTypes.arrayOf(PropTypes.string),
	onSubmit: PropTypes.func,
	onChange: PropTypes.func,
	onError: PropTypes.func,
	onValid: PropTypes.func,
	title: PropTypes.string,
	errors: PropTypes.arrayOf(PropTypes.string),
	exclude: PropTypes.arrayOf(PropTypes.string),
	readOnly: PropTypes.bool,
	footer: PropTypes.node
};

Form.defaultProps = {
	fields: [],
	exclude: [],
	values: {},
	errors: [],
	errorNotes: [],
	buttonLabel: "Confirm",
	readOnly: false
};

const style = theme => ({
	paper: {
		padding: theme.spacing.unit * 3
	},
	notes: {
		float: "right"
	},
	title: {
		marginBottom: theme.spacing.unit * 3
	}
});

export default withStyles(style)(Form);
