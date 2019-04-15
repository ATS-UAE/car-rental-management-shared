import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";
import BookingForm from "../../presentational/forms/BookingForm";
import * as actions from "../../../actions";
import { api } from "../../../utils";
import { ROLES } from "../../../variables";
import DialogButton from "../../presentational/forms/DialogButton";

function NewBookingButtonDialog({
	fetchBookings,
	onSubmit,
	enums,
	users,
	vehicles,
	fetchEnums,
	fetchUsers,
	fetchVehicles
}) {
	const [newBooking, setNewBooking] = useState({
		from: moment()
			.startOf("day")
			.unix(),
		to: moment()
			.endOf("day")
			.unix()
	});
	let [open, setOpen] = useState(false);
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

	let userList = [{ value: "", label: "No users available..." }];
	let bookingTypeList = [{ value: "", label: "Loading..." }];
	let vehicleList = [{ value: "", label: "No vehicles available" }];

	if (enums && enums.data) {
		let $bookingTypeList = enums.data.bookingTypes.map(item => ({
			value: item.id,
			label: item.name
		}));
		if ($bookingTypeList.length) {
			bookingTypeList = $bookingTypeList;
		}
	}
	if (users && users.data) {
		let $userList = users.data.reduce((acc, user) => {
			if (user.role.name === ROLES.GUEST) {
				acc.push({
					value: user.id,
					label: `${user.firstName} ${user.lastName} - ${user.username}`
				});
			}
			return acc;
		}, []);
		if ($userList.length) {
			userList = $userList.length;
		}
	}
	if (vehicles && vehicles.data) {
		let $vehicleList = vehicles.data.map(vehicle => ({
			value: vehicle.id,
			label: `${vehicle.brand} ${vehicle.model} - ${vehicle.plateNumber}`
		}));
		if ($vehicleList.length) {
			vehicleList = $vehicleList;
		}
	}

	return (
		<DialogButton
			open={open}
			onClick={() => setOpen(true)}
			onClose={() => setOpen(false)}
		>
			<BookingForm
				values={newBooking}
				userList={userList}
				bookingTypeList={bookingTypeList}
				vehicleList={vehicleList}
				onChange={newBooking => {
					let from = newBooking.from;
					let to = newBooking.to;
					if (to < from) {
						let temp = to;
						to = from;
						from = temp;
					}
					setNewBooking({ ...newBooking, from, to });
				}}
				onSubmit={() =>
					api.createBooking(newBooking).then(() => {
						fetchBookings();
						setOpen(false);
						onSubmit && onSubmit();
					})
				}
				buttonLabel="Create"
				title="Create Booking"
				include={["from", "to", "userId", "bookingTypeId", "vehicleId"]}
			/>
		</DialogButton>
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
)(NewBookingButtonDialog);
