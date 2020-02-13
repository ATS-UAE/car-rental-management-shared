import React from "react";
import {
	Checkbox,
	FormControlLabel,
	FormControl,
	FormLabel,
	FormGroup,
	FormHelperText
} from "@material-ui/core";
import { InputProps, Field } from ".";

type CheckboxItem<Values extends { [key: string]: boolean }> = {
	name: keyof Values;
	label: string;
};

export interface FieldCheckboxGroupProps<
	Values extends { [key: string]: boolean }
> extends InputProps<Values | boolean> {
	checkboxes?: Array<CheckboxItem<Values>>;
}

export const FieldCheckboxGroup = <Values extends { [key: string]: boolean }>({
	helperText,
	label,
	transformer,
	className,
	name,
	checkboxes
}: FieldCheckboxGroupProps<Values>) => {
	return (
		<Field<Values | boolean> name={name}>
			{({ setFieldValue, value, touched, error, onBlur }) => {
				const handleChange = (name: keyof Values) => (
					e: React.ChangeEvent<HTMLInputElement>
				) => {
					if (typeof value === "object") {
						const newValues: Values = { ...value, [name]: e.target.checked };
						transformer
							? setFieldValue(transformer(newValues))
							: setFieldValue(newValues);
					} else {
						transformer
							? setFieldValue(transformer(e.target.checked))
							: setFieldValue(e.target.checked);
					}
				};
				const multi = Array.isArray(checkboxes);
				return (
					<FormControl component="fieldset" className={className}>
						{multi && label && (
							<FormLabel component="legend">{label}</FormLabel>
						)}
						{multi && checkboxes ? (
							<FormGroup>
								{checkboxes.map(c => {
									let checked = false;

									if (typeof value === "object") {
										checked = value[c.name];
									} else {
										checked = value;
									}

									return (
										<FormControlLabel
											control={
												<Checkbox
													color="primary"
													checked={checked}
													onChange={handleChange(c.name)}
													value={c.name}
												/>
											}
											onBlur={onBlur}
											label={c.label}
										/>
									);
								})}
							</FormGroup>
						) : (
							<FormControlLabel
								control={
									<Checkbox
										color="primary"
										checked={(typeof value === "boolean" && value) || false}
										onChange={e => setFieldValue(e.target.checked)}
										value={name}
									/>
								}
								label={label}
								onBlur={onBlur}
							/>
						)}
						<FormHelperText>{(touched && error) || helperText}</FormHelperText>
					</FormControl>
				);
			}}
		</Field>
	);
};
