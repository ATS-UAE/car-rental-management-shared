import React, { ReactNode, FC } from "react";
import { Formik, Form as FormikForm, Field } from "formik";
import { IFormProps, IFormFieldProps } from "../../../utils/typings/forms";

const Form: FC<IFormProps> = ({
	exclude,
	readOnly,
	fields,
	initialValues,
	validationSchema,
	onSubmit
}) => {
	const renderFields = (fields: IFormFieldProps[]): ReactNode[] => {
		return fields.reduce(
			(
				accumulator: Array<React.ReactNode>,
				field: IFormFieldProps
			): Array<ReactNode> => {
				const excluded = exclude.includes(field.name);
				if (excluded) {
					return accumulator;
				}
				const disabled =
					readOnly === true ||
					(Array.isArray(readOnly) && readOnly.includes(field.name));

				accumulator.push(
					<Field
						key={field.name}
						name={field.name}
						component={field.component}
						disabled={disabled}
						{...field.props}
					/>
				);

				return accumulator;
			},
			[]
		);
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
		>
			{() => <FormikForm>{renderFields(fields)}</FormikForm>}
		</Formik>
	);
};

export default Form;
