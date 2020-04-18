import React from "react";
import moment from "moment";
import Form, { FIELDS } from "./Form";
import { validators, Validator } from "../../../utils/helpers";
const { DATE_TIME_PICKER } = FIELDS;

function BookingTimeRangeForm({
	title,
	exclude,
	errorNotes,
	errors,
	onError,
	values,

	footer,
	hints,
	onChange,
	readOnly,
	allowBefore
}) {
	const notBefore = new Validator(
		() => values.from > moment().unix(),
		"Value should not be before current date."
	);
	const fields = [
		{
			type: DATE_TIME_PICKER,
			id: "from",
			name: "from",
			validators: [validators.requiredField],
			GridProps: {
				xs: 12,
				sm: 12
			},
			props: {
				label: "Book Start",
				fullWidth: true
			}
		},
		{
			type: DATE_TIME_PICKER,
			id: "to",
			name: "to",
			validators: [validators.requiredField],
			GridProps: {
				xs: 12,
				sm: 12
			},
			props: {
				label: "Book End",
				fullWidth: true
			}
		}
	];
	if (!allowBefore) fields[0].validators.push(notBefore);

	return (
		<Form
			title={title}
			fields={fields}
			exclude={exclude}
			errorNotes={errorNotes}
			errors={errors}
			onError={onError}
			values={values}
			footer={footer}
			hints={hints}
			onChange={onChange}
			readOnly={readOnly}
		/>
	);
}

export default BookingTimeRangeForm;
