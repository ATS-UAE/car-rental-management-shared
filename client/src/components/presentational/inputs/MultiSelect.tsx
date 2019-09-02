import React from "react";
import { makeStyles, useTheme, Theme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import { InputValue, IMultiSelectInputProps } from "../../../utils/typings";

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

function getStyles(name: InputValue, value: Array<InputValue>, theme: Theme) {
	return {
		fontWeight:
			value.indexOf(name) === -1
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightMedium
	};
}

const MultiSelect: React.FC<IMultiSelectInputProps> = ({
	field,
	haveNone,
	items,
	label,
	fullWidth,
	disabled
}) => {
	const classes = useStyles();
	const theme = useTheme();

	return (
		<FormControl fullWidth={fullWidth}>
			{label && <InputLabel htmlFor={field.name}>{label}</InputLabel>}
			<Select
				multiple
				onBlur={field.onBlur}
				value={field.value}
				autoWidth
				onChange={field.onChange}
				input={<Input id={field.name} />}
				disabled={disabled}
				renderValue={selected => (
					<div className={classes.chips}>
						{items.reduce(
							(acc, item) => {
								if ((selected as Array<InputValue>).indexOf(item.value) >= 0) {
									acc.push(
										<Chip
											key={item.value}
											label={item.label}
											className={classes.chip}
										/>
									);
								}
								return acc;
							},
							[] as Array<React.ReactNode>
						)}
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
						style={getStyles(item.value, field.value, theme)}
					>
						{item.label}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default MultiSelect;
