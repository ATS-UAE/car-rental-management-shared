import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Grid, Button } from "@material-ui/core";
import BookingForm from "../../presentational/forms/BookingForm";
import * as actions from "../../../actions";
import { api } from "../../../utils";
import { ROLES } from "../../../variables";
import DialogButton from "../../presentational/forms/DialogButton";

function NewBookingButtonDialog({
	fetchBookings,
	onSubmit,
	enums,
	vehicles,
	fetchEnums,
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

		if (!vehicles) {
			fetchVehicles();
		}
	}, []);

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
	if (vehicles && vehicles.data) {
		let $vehicleList = vehicles.data.map(vehicle => ({
			value: vehicle.id,
			label: `${vehicle.brand} ${vehicle.model} - ${vehicle.plateNumber}`
		}));
		if ($vehicleList.length) {
			vehicleList = $vehicleList;
		}
	}
	let footer = (
		<Grid item>
			<Button
				type="submit"
				variant="contained"
				color="secondary"
				onClick={e => {
					e.preventDefault();
					api.createBooking(newBooking).then(() => {
						fetchBookings();
						setOpen(false);
						onSubmit && onSubmit();
					});
				}}
			>
				Confirm
			</Button>
		</Grid>
	);

	return (
		<DialogButton
			open={open}
			onClick={() => setOpen(true)}
			onClose={() => setOpen(false)}
		>
			<BookingForm
				values={newBooking}
				exclude={["userId"]}
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
				title="Book a Vehicle"
				footer={footer}
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
