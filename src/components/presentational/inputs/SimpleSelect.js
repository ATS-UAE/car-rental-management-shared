import React from "react";
import PropTypes from "prop-types";
import {
	Select,
	FormControl,
	MenuItem,
	FormHelperText,
	InputLabel,
	Input
} from "@material-ui/core";

export default function SimpleSelect({
	value,
	onChange,
	required,
	haveNone,
	items,
	helperText,
	id,
	label,
	name,
	fullWidth,
	FormControlProps,
	SelectProps,
	InputProps
}) {
	return (
		<FormControl
			required={required}
			fullWidth={fullWidth}
			{...FormControlProps}
		>
			{label && <InputLabel htmlFor={id}>{label}</InputLabel>}
			<Select
				{...SelectProps}
				value={value}
				onChange={onChange}
				displayEmpty
				name={name}
				input={<Input {...InputProps} name={name} id={id} />}
			>
				{haveNone && (
					<MenuItem value="">
						<em>None</em>
					</MenuItem>
				)}
				{items.map(item => (
					<MenuItem value={item.value} key={item.value}>
						{item.label}
					</MenuItem>
				))}
			</Select>
			{helperText && <FormHelperText>{helperText}</FormHelperText>}
		</FormControl>
	);
}

SimpleSelect.propTypes = {
	haveNone: PropTypes.bool,
	items: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.any,
			label: PropTypes.string
		})
	),
	onChange: PropTypes.func,
	required: PropTypes.bool,
	id: PropTypes.string.isRequired,
	label: PropTypes.string,
	helperText: PropTypes.string,
	fullWidth: PropTypes.bool,
	SelectProps: PropTypes.object,
	InputProps: PropTypes.object,
	FormControlProps: PropTypes.object
};

SimpleSelect.defaultProps = {
	required: false,
	haveNone: false,
	items: [],
	fullWidth: false
};
