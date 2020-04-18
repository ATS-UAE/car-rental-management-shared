import React from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		flexWrap: "wrap"
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		maxWidth: 300
	},
	chips: {
		display: "flex",
		flexWrap: "wrap"
	},
	chip: {
		margin: 2
	},
	noLabel: {
		marginTop: theme.spacing(3)
	}
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250
		}
	}
};

function getStyles(name, personName, theme) {
	return {
		fontWeight:
			personName.indexOf(name) === -1
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightMedium
	};
}

export default function MultiSelect({
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
	InputProps,
	onError,
	disabled
}) {
	const classes = useStyles();
	const theme = useTheme();
	if (required && (value === undefined || value === "")) {
		onError && onError(value);
	}
	return (
		<FormControl
			required={required}
			fullWidth={fullWidth}
			{...FormControlProps}
		>
			{label && <InputLabel htmlFor={id}>{label}</InputLabel>}
			<Select
				multiple
				{...SelectProps}
				value={value || []}
				autoWidth
				onChange={e => {
					onChange && onChange(e);
				}}
				name={name}
				input={<Input {...InputProps} name={name} id={id} />}
				disabled={disabled}
				renderValue={selected => (
					<div className={classes.chips}>
						{items.reduce((acc, item) => {
							if (selected.indexOf(item.value) >= 0)
								acc.push(
									<Chip
										key={item.value}
										label={item.label}
										className={classes.chip}
									/>
								);
							return acc;
						}, [])}
					</div>
				)}
				MenuProps={MenuProps}
			>
				{haveNone && (
					<MenuItem value="">
						<em>None</em>
					</MenuItem>
				)}
				{items.map(item => (
					<MenuItem
						value={item.value}
						key={item.value}
						style={getStyles(item.value, value, theme)}
					>
						{item.label}
					</MenuItem>
				))}
			</Select>
			{helperText && <FormHelperText>{helperText}</FormHelperText>}
		</FormControl>
	);
}

MultiSelect.propTypes = {
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

MultiSelect.defaultProps = {
	required: false,
	haveNone: false,
	items: [],
	fullWidth: false
};
