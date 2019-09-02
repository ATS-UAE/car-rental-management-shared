import { FormikConfig, FormikValues, FormikActions } from "formik";
import { IField } from "./inputs";

export interface IFormFieldProps {
	component: import("react").ElementType;
	props: object;
	name: string;
}

export interface IFormProps<Values = FormikValues>
	extends FormikConfig<Values> {
	fields: IField[];
	errorNotes: string[];
	hints: string;
	exclude: string[];
	readOnly: string[] | boolean;
	footer: import("react").ElementType;
	initialValues: Values;
	validationSchema:
		| import("yup").ObjectSchema
		| (() => import("yup").ObjectSchema);
}
