import React, { FC } from "react";
import Form from "./Form";
import { IFormProps, IFormFieldProps } from "../../../utils/typings";
import { object, ObjectSchema } from "yup";
import { TextField } from "../../presentational/inputs";

const Client: FC<Omit<IFormProps, "fields" | "validationSchema">> = props => {
	const fields: Array<IFormFieldProps> = [
		{
			component: TextField,
			props: {},
			name: "name"
		}
	];
	const validationSchema: ObjectSchema = object().shape({});

	return (
		<Form fields={fields} validationSchema={validationSchema} {...props} />
	);
};

export default Client;
