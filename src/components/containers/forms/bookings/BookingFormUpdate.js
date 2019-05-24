import React, { useState } from "react";
import { connect } from "react-redux";
import BookingForm from "./BookingForm";
import * as reduxActions from "../../../../actions";
import { api } from "../../../../utils";

function BookingFormUpdate({
	fetchBookings,
	exclude,
	onSubmit,
	values,
	onChange,
	readOnly,
	allowBefore
}) {
	let [errorNotes, setErrorNotes] = useState([]);
	let [loading, setLoading] = useState(false);

	return (
		<BookingForm
			values={values}
			exclude={exclude}
			errorNotes={errorNotes}
			title="Update Booking"
			onChange={onChange}
			loading={loading}
			readOnly={readOnly}
			onSubmit={() => {
				setLoading(true);
				api
					.updateBooking(values)
					.then(() => {
						fetchBookings();
						setLoading(false);
						onSubmit && onSubmit();
					})
					.catch(e => {
						setErrorNotes([e]);
						setLoading(false);
					});
			}}
			allowBefore={allowBefore}
			ticksMap={{
				xs: 3,
				sm: 4,
				md: 4,
				lg: 4,
				xl: 4
			}}
		/>
	);
}

export default connect(
	null,
	reduxActions
)(BookingFormUpdate);
