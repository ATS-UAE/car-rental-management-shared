import React, { useState } from "react";
import { connect } from "react-redux";
import BookingForm from "./BookingForm";
import * as reduxActions from "../../../../actions";
import { api, apiErrorHandler } from "../../../../utils/helpers";

function BookingFormUpdate({
	fetchBookings,
	exclude,
	onSubmit,
	values,
	onChange,
	readOnly,
	allowBefore,
	showMap,
	available,
	inLocation,
	checkTimeSlot,
	showReplacementVehicleForm
}) {
	let [errorNotes, setErrorNotes] = useState([]);
	let [loading, setLoading] = useState(false);

	return (
		<BookingForm
			showReplaceVehicleForm={showReplacementVehicleForm}
			values={values}
			exclude={exclude}
			available={available}
			inLocation={inLocation}
			checkTimeSlot={checkTimeSlot}
			errorNotes={errorNotes}
			title="Update Booking"
			onChange={onChange}
			loading={loading}
			readOnly={readOnly}
			showMap={showMap}
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
						setErrorNotes([apiErrorHandler(e).message]);
						setLoading(false);
					});
			}}
			allowBefore={allowBefore}
		/>
	);
}

export default connect(null, reduxActions)(BookingFormUpdate);
