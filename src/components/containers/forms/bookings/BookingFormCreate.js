import React, { useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import BookingForm from "./BookingForm";
import * as reduxActions from "../../../../actions";
import { api } from "../../../../utils";

function BookingFromCreate({ fetchBookings, exclude, onSubmit, ticksMap }) {
	let [errorNotes, setErrorNotes] = useState([]);
	const [values, setValues] = useState({
		from: moment()
			.add(30, "minutes")
			.unix(),
		to: moment()
			.endOf("day")
			.unix()
	});
	let [loading, setLoading] = useState(false);
	return (
		<BookingForm
			values={values}
			exclude={exclude}
			errorNotes={errorNotes}
			title="Book a Vehicle"
			onChange={setValues}
			loading={loading}
			onSubmit={() => {
				setLoading(true);
				api
					.createBooking(values)
					.then(() => {
						fetchBookings();
						setLoading(false);
						setValues({
							from: moment()
								.startOf("day")
								.unix(),
							to: moment()
								.endOf("day")
								.unix()
						});
						onSubmit && onSubmit();
					})
					.catch(e => {
						setErrorNotes([e]);
						setLoading(false);
					});
			}}
			ticksMap={ticksMap}
		/>
	);
}

export default connect(
	null,
	reduxActions
)(BookingFromCreate);
