import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Grid, Typography, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PasswordField from "../inputs/PasswordField";
import Select from "../inputs/SimpleSelect";
import ErrorChip from "../display/ErrorChip";
import Slider from "../inputs/Slider";
import DateTimePicker from "../inputs/DateTimePicker";
import { Validator } from "../../../utils/helpers";
import ImageInput from "../inputs/ImageInput";
import MultiSelect from "../inputs/MultiSelect";

export const FIELDS = {
	PASSWORD: PasswordField,
	TEXT: TextField,
	SELECT: Select,
	SLIDER: Slider,
	DATE_TIME_PICKER: DateTimePicker,
	IMAGE: ImageInput,
	MULTI: MultiSelect
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
	hints,
	onChangeEvent,
	gridContainerProps,
	wrapper
}) {
	const handleChange = (name, { persistEvent, passEvent }) => e => {
		persistEvent && e.persist();
		if (e && e.target && e.target.value !== undefined) {
			onChange &&
				onChange({ ...values, [name]: passEvent ? e : e.target.value });
			onChangeEvent &&
				onChangeEvent(
					{ ...values, [name]: passEvent ? e : e.target.value },
					name,
					e
				);
		} else {
			onChange && onChange({ ...values, [name]: e });
		}
	};
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
	let Wrapper = wrapper;
	return (
		<Wrapper className={classes.root}>
			{errorNotes.map((e, i) => (
				<ErrorChip key={i} label={e} className={classes.errorChip} />
			))}
			{title && (
				<Typography
					variant="h6"
					gutterBottom
					component="h1"
					className={classes.title}
				>
					{title}
				</Typography>
			)}
			<Grid
				container
				spacing={3}
				className={classes.gridContainer}
				{...gridContainerProps}
			>
				{formFields.map(field => {
					const Component = field.type;
					const { props = {}, name, id, GridProps, persistEvent } = field;
					let disabled;
					if (readOnly.length)
						disabled = readOnly.find(field => field === name || field === id)
							? true
							: false;
					else if (typeof readOnly === "boolean") disabled = readOnly;
					return (
						<Grid item xs={12} sm={6} key={name} {...GridProps}>
							<Component
								id={id}
								value={values[name] === undefined ? "" : values[name]}
								onChange={handleChange(name, { persistEvent })}
								disabled={disabled}
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
				{(hints || footer) && (
					<Grid item xs={12}>
						{hints && (
							<Grid item className={classes.hints}>
								<Typography>{hints}</Typography>
							</Grid>
						)}
						{footer}
					</Grid>
				)}
			</Grid>
		</Wrapper>
	);
}

Form.propTypes = {
	fields: PropTypes.arrayOf(
		PropTypes.shape({
			props: PropTypes.object,
			name: PropTypes.string.isRequired,
			id: PropTypes.string.isRequired
		})
	),
	errorNotes: PropTypes.arrayOf(PropTypes.string),
	onChange: PropTypes.func,
	onChangeEvent: PropTypes.func,
	onError: PropTypes.func,
	title: PropTypes.string,
	errors: PropTypes.object,
	values: PropTypes.object,
	exclude: PropTypes.arrayOf(PropTypes.string),
	readOnly: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.arrayOf(PropTypes.string)
	]),
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
	hints: "*Required",
	wrapper: "form"
};

const style = theme => ({
	root: {
		padding: theme.spacing(1),
		overflow: "visible"
	},
	hints: {
		float: "right"
	},
	title: {
		marginBottom: theme.spacing(3)
	},
	gridContainer: {
		overflow: "visible"
	},
	errorChip: {
		margin: `${theme.spacing(1)}px 0 ${theme.spacing(1)}px 0`
	}
});

export default withStyles(style)(Form);
