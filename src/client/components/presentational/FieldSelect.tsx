import React, { FC, ReactNode } from "react";
import {
	Select,
	FormControl,
	MenuItem,
	FormHelperText,
	InputLabel,
	Input,
	SelectProps,
	FormControlProps,
	ListSubheader
} from "@material-ui/core";
import { InputProps, Field } from ".";

export interface FieldSelectProps extends InputProps<FieldSelectItemValue> {
	haveNone?: boolean;
	FormControlProps?: FormControlProps;
	items: FieldSelectItems;
	fullWidth?: boolean;
	SelectProps?: Omit<SelectProps, keyof FieldSelectProps>;
}

export type FieldSelectItemValue = string | number;

export type FieldSelectItem = { label: string; value: FieldSelectItemValue };

export type FieldSelectItems = Array<{
	label: string;
	value: FieldSelectItemValue | FieldSelectItem[];
}>;

export const FieldSelect: FC<FieldSelectProps> = ({
	haveNone,
	items,
	label,
	name,
	helperText,
	fullWidth,
	FormControlProps,
	SelectProps,
	transformer
}) => {
	return (
		<Field<FieldSelectItemValue> name={name} defaultValue="">
			{({ value, error, setFieldValue, touched, onBlur }) => (
				<FormControl
					fullWidth={fullWidth}
					{...FormControlProps}
					error={Boolean(touched && error)}
				>
					{label && <InputLabel htmlFor={name}>{label}</InputLabel>}
					<Select
						{...SelectProps}
						onBlur={onBlur}
						value={value}
						error={Boolean(touched && error)}
						onChange={e =>
							transformer
								? setFieldValue(
										transformer(e.target.value as FieldSelectItemValue)
								  )
								: setFieldValue(e.target.value as FieldSelectItemValue)
						}
						input={<Input name={name} id={name} />}
						autoWidth
					>
						{haveNone && (
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
						)}
						{items.reduce<Array<ReactNode>>((acc, item, index) => {
							if (Array.isArray(item.value)) {
								acc.push(
									<ListSubheader key={item.label}>{item.label}</ListSubheader>
								);
								item.value.forEach(item => {
									acc.push(
										<MenuItem value={item.value} key={item.value}>
											{item.label}
										</MenuItem>
									);
								});
							} else {
								acc.push(
									<MenuItem value={item.value} key={item.value}>
										{item.label}
									</MenuItem>
								);
							}

							return acc;
						}, [])}
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
