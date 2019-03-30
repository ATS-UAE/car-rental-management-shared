import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import BookingForm from "../../presentational/forms/BookingForm";
import * as actions from "../../../actions";
import { api } from "../../../utils";

function BookingCreateContainer({
	fetchBookings,
	enums,
	users,
	fetchEnums,
	fetchUsers
}) {
	const [newBooking, setNewBooking] = useState({});
	useEffect(() => {
		if (!enums) {
			fetchEnums();
		}
		if (!users) {
			fetchUsers();
		}
	}, []);
	let bookingStatusList = [];
	let userList = [];
	let bookingTypeList = [];
	if (enums && enums.data) {
		bookingStatusList = enums.data.bookingStatus;
		bookingTypeList = enums.data.bookingTypes;
	}
	if (users && users.data) {
		userList = users.data;
	}
	return (
		<BookingForm
			values={newBooking}
			onChange={setNewBooking}
			onSubmit={() =>
				api.createBooking(newBooking).then(() => {
					fetchBookings();
				})
			}
			buttonLabel="Create"
			title="Create Booking"
			users={userList}
			bookingStatusList={bookingStatusList}
			bookingTypeList={bookingTypeList}
		/>
	);
}

const mapStateToProps = ({ users, enums }) => ({ users, enums });

export default connect(
	mapStateToProps,
	actions
)(BookingCreateContainer);
