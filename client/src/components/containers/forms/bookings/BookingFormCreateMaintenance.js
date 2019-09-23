import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";
import BookingForm from "./BookingForm";
import * as reduxActions from "../../../../actions";
import { api, apiErrorHandler } from "../../../../utils/helpers";
import { BookingType } from "../../../../variables/enums";

function BookingFromCreate({
	fetchBookings,
	exclude,
	onSubmit,
	ticksMap,
	vehicle,
	enums,
	auth,
	children
}) {
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
	useEffect(() => {
		if (enums && enums.data && auth && auth.data) {
			const replacementType = enums.data.bookingTypes.find(
				type => type.name === BookingType.SERVICE
			);
			setValues(prev => ({
				...prev,
				bookingTypeId: replacementType.id,
				vehicleId: vehicle.id,
				userId: auth.data.id
			}));
		}
	}, [enums, vehicle, auth]);
	return (
		<BookingForm
			children={children}
			showMap={false}
			values={values}
			exclude={[exclude]}
			readOnly={["userId", "bookingTypeId", "vehicleId", "locationId"]}
			errorNotes={errorNotes}
			title="Book a vehicle for maintenance"
			onChange={setValues}
			loading={loading}
			inLocation={false}
			checkTimeSlot={true}
			unavailableVehicleErrorText="Vehicle is currently booked during this time."
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
						setErrorNotes([apiErrorHandler(e).message]);
						setLoading(false);
					});
			}}
			ticksMap={ticksMap}
		/>
	);
}

const mapStateToProps = ({ enums, auth }) => ({ enums, auth });

export default connect(
	mapStateToProps,
	reduxActions
)(BookingFromCreate);
