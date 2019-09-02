import React from "react";
import {
	Select as MuiSelect,
	FormControl,
	MenuItem,
	InputLabel,
	Input
} from "@material-ui/core";
import { IBaseInputProps, ISelectInputProps } from "../../../utils/typings";

const Select: React.FC<IBaseInputProps & ISelectInputProps> = ({
	haveNone,
	items,
	label,
	fullWidth,
	disabled,
	field,
	error
}) => {
	return (
		<FormControl fullWidth={fullWidth} error={error}>
			{label && <InputLabel htmlFor={field.name}>{label}</InputLabel>}
			<MuiSelect
				value={field.value}
				autoWidth
				onBlur={field.onBlur}
				onChange={field.onChange}
				name={name}
				input={<Input name={name} id={field.name} />}
				disabled={disabled}
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
			</MuiSelect>
		</FormControl>
	);
};

export default Select;
