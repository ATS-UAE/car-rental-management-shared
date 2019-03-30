import React from "react";
import moment from "moment";
import Form, { FIELDS } from "./Form";
const { TEXT, SELECT } = FIELDS;

function BookingForm({
	title,
	include,
	errorNotes,
	errors,
	onSubmit,
	onValid,
	onChange,
	onError,
	values,
	buttonLabel,
	users,
	bookingStatusList,
	bookingTypeList
}) {
	const fields = [
		{
			type: TEXT,
			id: "time-from",
			name: "from",
			props: {
				label: "From",
				required: true
			}
		},
		{
			type: TEXT,
			id: "time-to",
			name: "to",
			props: {
				label: "To",
				required: true
			}
		},
		{
			type: SELECT,
			id: "payment-status",
			name: "paid",
			props: {
				label: "Payment Status",
				items: [
					{ value: true, label: "Paid" },
					{ value: false, label: "Unpaid" }
				],
				fullWidth: true,
				required: true
			}
		},
		{
			type: SELECT,
			id: "user-id",
			name: "userId",
			props: {
				label: "User",
				items: users.map(user => ({ value: user.id, label: user.username })),
				fullWidth: true,
				required: true
			}
		},
		{
			type: SELECT,
			id: "booking-status-id",
			name: "bookingStatusId",
			props: {
				label: "Booking Status",
				items: bookingStatusList.map(item => ({
					value: item.id,
					label: item.name
				})),
				fullWidth: true,
				required: true
			}
		},
		{
			type: SELECT,
			id: "booking-type-id",
			name: "bookingTypeId",
			props: {
				label: "Booking Type",
				items: bookingTypeList.map(item => ({
					value: item.id,
					label: item.name
				})),
				fullWidth: true,
				required: true
			}
		}
	];
	return (
		<Form
			title={title}
			fields={fields}
			include={include}
			errorNotes={errorNotes}
			errors={errors}
			onSubmit={onSubmit}
			onValid={onValid}
			onChange={onChange}
			onError={onError}
			values={values}
			buttonLabel={buttonLabel}
		/>
	);
}

export default BookingForm;
