import React from "react";
import { validators, Validator } from "../../../utils/helpers";
import Form, { FIELDS } from "./Form";
const { TEXT, SELECT, IMAGE } = FIELDS;

function AccidentForm({
	title,
	exclude,
	errorNotes,
	onChangeEvent,
	values,
	userList,
	vehicleList,
	bookingList,
	footer,
	onError,
	errors,
	readOnly,
	hints
}) {
	const fields = [
		{
			type: IMAGE,
			name: "accidentImageSrc",
			id: "accident-image",
			persistEvent: true,
			validators: [validators.requiredField],
			props: {
				label: "Select picture",
				required: true
			}
		},
		{
			type: SELECT,
			id: "user-id",
			name: "userId",
			props: {
				label: "User",
				fullWidth: true,
				items: userList
			}
		},
		{
			type: SELECT,
			id: "vehicle-id",
			name: "vehicleId",
			validators: [validators.requiredField],
			props: {
				label: "Vehicle",
				fullWidth: true,
				items: vehicleList
			}
		},
		{
			type: SELECT,
			id: "booking-id",
			name: "bookingId",
			props: {
				label: "Booking ID",
				fullWidth: true,
				items: bookingList
			}
		},
		{
			type: TEXT,
			id: "message",
			name: "message",
			validators: [
				validators.requiredField,
				new Validator(v => v && v.length <= 500)
			],
			GridProps: {
				xs: 12,
				sm: 12
			},
			props: {
				multiline: true,
				variant: "filled",
				fullWidth: true,
				rowsMax: 6,
				label: "Message",
				required: true,
				inputProps: {
					maxLength: 500
				}
			}
		}
	];

	return (
		<Form
			title={title}
			fields={fields}
			exclude={exclude}
			errorNotes={errorNotes}
			onChangeEvent={onChangeEvent}
			values={values}
			footer={footer}
			errors={errors}
			onError={onError}
			hints={hints}
			readOnly={readOnly}
		/>
	);
}

export default AccidentForm;
