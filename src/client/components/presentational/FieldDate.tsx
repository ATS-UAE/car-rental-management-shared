import React, { FC } from "react";
import { DateTimePicker, DateTimePickerProps } from "@material-ui/pickers";
import { InputProps, Field } from ".";

export interface FieldDateProps extends InputProps<FieldDateValue> {
	fullWidth?: boolean;
	DateTimePickerProps?: Omit<DateTimePickerProps, keyof FieldDateProps>;
}

export type FieldDateValue = Date | null;

export const FieldDate: FC<FieldDateProps> = ({
	helperText,
	DateTimePickerProps = {},
	className,
	label,
	fullWidth,
	transformer,
	name
}) => {
	return (
		<Field<FieldDateValue> name={name} defaultValue={null}>
			{({ setFieldValue, value, touched, error, onBlur }) => (
				<DateTimePicker
					fullWidth={fullWidth}
					onBlur={onBlur}
					label={label}
					{...DateTimePickerProps}
					className={className}
					value={value}
					onChange={date => {
						const newDate = date?.toDate() || null;

						transformer
							? setFieldValue(transformer(newDate))
							: setFieldValue(newDate);
					}}
					error={Boolean(touched && error)}
					helperText={(touched && error) || helperText}
					showTodayButton
				/>
			)}
		</Field>
	);
};
