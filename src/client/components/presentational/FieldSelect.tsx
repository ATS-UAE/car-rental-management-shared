import React, { FC } from "react";
import {
	Select,
	FormControl,
	MenuItem,
	FormHelperText,
	InputLabel,
	Input,
	SelectProps,
	FormControlProps
} from "@material-ui/core";
import { InputProps, Field } from ".";

export interface FieldSelectProps extends InputProps<FieldSelectItem> {
	haveNone?: boolean;
	FormControlProps?: FormControlProps;
	items: FieldSelectItems;
	fullWidth?: boolean;
	SelectProps?: Omit<SelectProps, keyof FieldSelectProps>;
}

export type FieldSelectItem = string | number;

export type FieldSelectItems = Array<{ label: string; value: FieldSelectItem }>;

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
		<Field<FieldSelectItem> name={name} defaultValue="">
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
								? setFieldValue(transformer(e.target.value as FieldSelectItem))
								: setFieldValue(e.target.value as FieldSelectItem)
						}
						input={<Input name={name} id={name} />}
						autoWidth
					>
						{haveNone && (
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
						)}
						{items.map((item, index) => (
							<MenuItem value={item.value} key={item.value}>
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
