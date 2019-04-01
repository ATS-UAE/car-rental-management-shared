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
	fetchUsers,
	vehicles,
	fetchVehicles
}) {
	const [newBooking, setNewBooking] = useState({});
	useEffect(() => {
		if (!enums) {
			fetchEnums();
		}
		if (!users) {
			fetchUsers();
		}
		if (!vehicles) {
			fetchVehicles();
		}
	}, []);
	let bookingStatusList = [];
	let userList = [];
	let bookingTypeList = [];
	let vehicleList = [];
	if (enums && enums.data) {
		bookingStatusList = enums.data.bookingStatus.map(item => ({
			value: item.id,
			label: item.name
		}));
		bookingTypeList = enums.data.bookingTypes.map(item => ({
			value: item.id,
			label: item.name
		}));
	}
	if (users && users.data) {
		userList = users.data.map(user => ({
			value: user.id,
			label: `${user.firstName} ${user.lastName} - ${user.username}`
		}));
	}
	if (vehicles && vehicles.data) {
		vehicleList = vehicles.data.map(vehicle => ({
			value: vehicle.id,
			label: `${vehicle.brand} ${vehicle.model} - ${vehicle.plateNumber}`
		}));
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
			userList={userList}
			bookingStatusList={bookingStatusList}
			bookingTypeList={bookingTypeList}
			vehicleList={vehicleList}
		/>
	);
}

const mapStateToProps = ({ users, enums, vehicles }) => ({
	users,
	enums,
	vehicles
});

export default connect(
	mapStateToProps,
	actions
)(BookingCreateContainer);
