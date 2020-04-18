import React, { FC, ReactNode, ChangeEvent } from "react";
import {
	Input,
	InputLabel,
	MenuItem,
	FormControl,
	FormHelperText,
	Select,
	Chip,
	SelectProps,
	FormControlProps,
	Theme,
	createStyles,
	withStyles,
	WithStyles
} from "@material-ui/core";

import { InputProps, FieldSelectItemValue, Field } from ".";

export interface FieldSelectMultiProps
	extends InputProps<FieldSelectItemValue[]>,
		WithStyles<typeof styles> {
	haveNone?: boolean;
	FormControlProps?: FormControlProps;
	items: Array<{ label: string; value: FieldSelectItemValue }>;
	fullWidth: boolean;
	SelectProps?: Omit<SelectProps, keyof FieldSelectMultiProps>;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const isSelected = (
	items: FieldSelectItemValue[],
	value: FieldSelectItemValue
): boolean => Boolean(items.find(item => item === value));

const getNewValues = (
	event: ChangeEvent<{ value: unknown }>
): FieldSelectItemValue[] => {
	const { options } = event.target as HTMLSelectElement;
	const values: FieldSelectItemValue[] = [];
	for (let i = 0, l = options.length; i < l; i += 1) {
		if (options[i].selected) {
			values.push(options[i].value);
		}
	}
	return values;
};

const FieldSelectMultiBase: FC<FieldSelectMultiProps> = ({
	haveNone,
	items,
	label,
	helperText,
	fullWidth,
	FormControlProps,
	SelectProps,
	className,
	classes,
	name,
	transformer
}) => {
	return (
		<Field<FieldSelectItemValue[]> name={name} defaultValue={[]}>
			{({ setFieldValue, error, touched, onBlur, value }) => (
				<FormControl
					fullWidth={fullWidth}
					{...FormControlProps}
					error={Boolean(touched && error)}
					className={className}
				>
					{label && <InputLabel htmlFor={name}>{label}</InputLabel>}
					<Select
						{...SelectProps}
						onBlur={onBlur}
						onChange={e =>
							transformer
								? setFieldValue(transformer(getNewValues(e)))
								: setFieldValue(getNewValues(e))
						}
						autoWidth
						multiple
						name={name}
						input={<Input name={name} id={name} />}
						renderValue={selected => {
							const cast = selected as FieldSelectItemValue[];
							return (
								<div className={classes.chips}>
									{items.reduce<ReactNode[]>((acc, item) => {
										if (cast.indexOf(item.value) >= 0)
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
							);
						}}
						MenuProps={{
							PaperProps: {
								style: {
									maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
									width: 250
								}
							}
						}}
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
								classes={{
									root: isSelected(value, item.value)
										? classes.selected
										: classes.unselected
								}}
							>
								{item.label}
							</MenuItem>
						))}
					</Select>
					{helperText ||
						(touched && error && (
							<FormHelperText>
								{(touched && error) || helperText}
							</FormHelperText>
						))}
				</FormControl>
			)}
		</Field>
	);
};

const styles = (theme: Theme) =>
	createStyles({
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
		},
		selected: {
			fontWeight: theme.typography.fontWeightRegular
		},
		unselected: {
			fontWeight: theme.typography.fontWeightMedium
		}
	});

export const FieldSelectMulti = withStyles(styles)(FieldSelectMultiBase);
