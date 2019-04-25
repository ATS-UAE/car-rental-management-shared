import React from "react";
import { Grid } from "@material-ui/core";
import LocationsView from "../../containers/display/LocationsView";
import Form, { FIELDS } from "./Form";
const { SELECT, DATE_TIME_PICKER, TEXT } = FIELDS;

function BookingForm({
	title,
	exclude,
	errorNotes,
	errors,
	onSubmit,
	onValid,
	onChange,
	onError,
	values,
	buttonLabel,
	userList,
	bookingTypeList,
	vehicleList,
	footer
}) {
	const fields = [
		{
			type: DATE_TIME_PICKER,
			id: "from",
			name: "from",
			props: {
				label: "Book Start"
			}
		},
		{
			type: DATE_TIME_PICKER,
			id: "to",
			name: "to",
			props: {
				label: "Book End"
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
			type: TEXT,
			id: "user-id",
			name: "userId",
			props: {
				label: "User",
				items: userList,
				required: true
			}
		},
		{
			type: SELECT,
			id: "booking-type-id",
			name: "bookingTypeId",
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
			onSubmit={onSubmit}
			onValid={onValid}
			onChange={onChange}
			onError={onError}
			values={values}
			buttonLabel={buttonLabel}
			footer={footer}
		>
			<Grid item xs={12}>
				<LocationsView />
			</Grid>
		</Form>
	);
}

export default BookingForm;
