import React from "react";
import moment from "moment";

import Form, { FIELDS } from "./Form";
import { validators, Validator } from "../../../utils";
const { SELECT, DATE_TIME_PICKER, TEXT } = FIELDS;

function BookingFinalizeForm({
	title,
	exclude,
	errorNotes,
	errors,
	onError,
	values,
	userList,
	bookingTypeList,
	vehicleList,
	footer,
	hints,
	onChange,
	readOnly
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
			validators: [validators.requiredField, notBefore],
			props: {
				label: "Book Start"
			}
		},
		{
			type: DATE_TIME_PICKER,
			id: "to",
			name: "to",
			validators: [validators.requiredField],
			props: {
				label: "Book End"
			}
		},
		{
			type: SELECT,
			id: "user-id",
			name: "userId",
			validators: [validators.requiredField],
			props: {
				label: "User",
				items: userList,
				required: true
			}
		},
		{
			type: TEXT,
			id: "amount",
			name: "amount",
			validators: [validators.requiredField],
			props: {
				label: "Payment Amount	",
				items: userList,
				required: true,
				type: "number"
			}
		},
		{
			type: SELECT,
			id: "booking-type-id",
			name: "bookingTypeId",
			validators: [validators.requiredField],
			props: {
				label: "Booking Type",
				items: bookingTypeList,
				fullWidth: true,
				required: true
			}
		},
		{
			type: SELECT,
			id: "vehicle-id",
			name: "vehicleId",
			validators: [validators.requiredField],
			props: {
				label: "Vehicle",
				items: vehicleList,
				fullWidth: true,
				required: true
			}
		}
	];
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

export default BookingFinalizeForm;
