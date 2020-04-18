import React, { FC, ReactType } from "react";
import { validators, Validator } from "../../../utils/helpers";
import Form, { FIELDS } from "./Form";

const { TEXT, SELECT, IMAGE, MULTI } = FIELDS;

interface Props {
	title: string;
	exclude: string[];
	errorNotes: string[];
	onChange?: (values: object) => void;
	values: object;
	footer: ReactType;
	errors: object;
	onError: () => void;
	readOnly: boolean | string[];
	hints: string[];
}

export interface Field {
	type: ReactType;
	name: string;
	id: string;
	persistEvent?: boolean;
	GridProps?: object;
	props?: object;
	validators?: (Validator | ((v) => boolean))[];
}

const ClientForm: FC<Props> = ({
	title,
	exclude,
	errorNotes,
	onChange,
	values,
	footer,
	errors,
	onError,
	hints,
	readOnly
}) => {
	const fields: Field[] = [
		{
			type: IMAGE,
			name: "name",
			id: "client-name",
			persistEvent: true,
			GridProps: {
				xs: 12,
				sm: 12,
				md: 12
			},
			props: {
				label: "Client name",
				main: true,
				icon: "DirectionsCar"
			}
		}
	];
	return (
		<Form
			title={title}
			fields={fields}
			exclude={exclude}
			errorNotes={errorNotes}
			onChange={onChange}
			values={values}
			footer={footer}
			errors={errors}
			onError={onError}
			hints={hints}
			readOnly={readOnly}
		/>
	);
};
