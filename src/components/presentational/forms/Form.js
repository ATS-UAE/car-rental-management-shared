import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Grid, Button, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import UsernameField from "../inputs/UsernameField";
import PasswordField from "../inputs/PasswordField";
import TextField from "../inputs/GenericTextField";
import Select from "../inputs/SimpleSelect";
import ErrorChip from "../display/ErrorChip";
import Slider from "../inputs/Slider";
import DateTimePicker from "../inputs/DateTimePicker";
import EmailField from "../inputs/EmailField";

export const FIELDS = {
	USERNAME: UsernameField,
	PASSWORD: PasswordField,
	TEXT: TextField,
	SELECT: Select,
	SLIDER: Slider,
	DATE_TIME_PICKER: DateTimePicker,
	EMAIL: EmailField
};

function Form({
	fields,
	classes,
	errorNotes,
	title,
	onValid,
	values,
	onChange,
	onSubmit,
	errors,
	onError,
	include,
	buttonLabel
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
	const formFields = include.length
		? fields.filter(
				field => include.includes(field.name) || include.includes(field.id)
		  )
		: fields;
	return (
		<Fragment>
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
					{formFields.map(field => {
						const Component = field.type;
						const { props = {}, name, id } = field;
						const { TextFieldProps = {} } = props;
						return (
							<Grid item xs={12} sm={6} key={name}>
								<Component
									id={id}
									value={values[name]}
									errors={errors[name]}
									onError={handleError(name)}
									onChange={handleChange(name)}
									onValid={handleValid(name)}
									{...props}
									TextFieldProps={{
										fullWidth: true,
										...TextFieldProps
									}}
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
									{buttonLabel}
								</Button>
							</Grid>
							<Grid item>
								<Typography>*Required</Typography>
							</Grid>
						</Grid>
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
	errors: PropTypes.arrayOf(PropTypes.string)
};

Form.defaultProps = {
	fields: [],
	include: [],
	values: {},
	errors: [],
	errorNotes: [],
	buttonLabel: "Confirm"
};

const style = theme => ({
	paper: {
		padding: theme.spacing.unit * 3
	}
});

export default withStyles(style)(Form);
