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
	footer,
	onError,
	errors,
	readOnly,
	hints
}) {
	const handleChange = name => e =>
		onChange && onChange({ ...values, [name]: e.target.value });
	// const handleError = name => e => onError && onError({ ...errors, [name]: e });
	const formFields = fields.filter(field => !exclude.includes(field.name));
	useEffect(() => {
		let fieldErrors = {};
		for (let field of formFields) {
			if (field.validators) {
				let errors = Validator.runThroughValidators(
					field.validators,
					values[field.name]
				).map(validator => validator.error);
				fieldErrors[field.name] = errors;
			}
		}
		onError && onError(fieldErrors);
	}, [values]);
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

						return (
							<Grid item xs={12} sm={6} key={name} {...GridProps}>
								<Component
									id={id}
									value={values[name] === undefined ? "" : values[name]}
									onChange={handleChange(name)}
									disabled={readOnly ? true : false}
									{...props}
									label={
										errors[name] && errors[name][0] && values[name]
											? errors[name][0]
											: props.label
									}
									error={
										errors[name] &&
										errors[name].length &&
										values[name] !== undefined
											? true
											: false
									}
									fullWidth
								/>
							</Grid>
						);
					})}
					{children}
					<Grid item xs={12}>
						{hints && (
							<Grid item className={classes.hints}>
								<Typography>{hints}</Typography>
							</Grid>
						)}
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
	errorNotes: PropTypes.arrayOf(PropTypes.string),
	onChange: PropTypes.func,
	onError: PropTypes.func,
	title: PropTypes.string,
	errors: PropTypes.object,
	values: PropTypes.object,
	exclude: PropTypes.arrayOf(PropTypes.string),
	readOnly: PropTypes.bool,
	footer: PropTypes.node,
	hints: PropTypes.string
};

Form.defaultProps = {
	fields: [],
	exclude: [],
	values: {},
	errors: {},
	errorNotes: [],
	buttonLabel: "Confirm",
	readOnly: false,
	hints: "*Required"
};

const style = theme => ({
	paper: {
		padding: theme.spacing.unit * 3
	},
	hints: {
		float: "right"
	},
	title: {
		marginBottom: theme.spacing.unit * 3
	}
});

export default withStyles(style)(Form);
