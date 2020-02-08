import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import { BookingType } from "../../../../../shared/typings";
import * as reduxActions from "../../../../actions";
import BookingFinalizeForm from "../../../presentational/forms/BookingFinalizeForm";
import { api } from "../../../../utils/helpers";

function BookingFinalizeFormContainer({
	fetchUsers,
	fetchVehicles,
	fetchLocations,
	vehicles,
	users,
	values,
	onChange,
	loading,
	onSubmit
}) {
	let [errors, setErrors] = useState({});
	let [disableButton, setDisabledButton] = useState(false);
	useEffect(() => {
		let validForm = true;
		for (let key in errors) {
			if (errors[key].length) {
				validForm = false;
			}
		}
		setDisabledButton(!validForm);
	}, [errors, values]);
	useEffect(() => {
		fetchVehicles();
		fetchUsers();
		fetchLocations();
	}, []);
	let footer = (
		<Button
			disabled={loading || disableButton}
			type="submit"
			variant="contained"
			color="primary"
			onClick={async e => {
				e.preventDefault();
				await api.updateBooking(values);
				onSubmit();
			}}
		>
			Finalize
		</Button>
	);

	let bookingTypeList = Object.values(BookingType).map(type => ({
		value: type,
		label: type
	}));
	let vehicleList = values.locationId
		? [{ value: "", label: "No vehicles available." }]
		: [{ value: "", label: "Please select a location." }];
	let userList = [{ value: "", label: "Loading..." }];

	if (vehicles && vehicles.data) {
		let $vehicleList = vehicles.data.map(vehicle => ({
			value: vehicle.id,
			label: `${vehicle.brand} ${vehicle.model} - ${vehicle.plateNumber}`
		}));
		if ($vehicleList.length) {
			vehicleList = $vehicleList;
		}
	}
	if (users && users.data) {
		let $userList = users.data.map(user => ({
			value: user.id,
			label: `${user.firstName} ${user.lastName} - ${user.username}`
		}));
		if ($userList.length) {
			userList = $userList;
		}
	}
	return (
		<BookingFinalizeForm
			title={"Finalize Booking"}
			values={values}
			footer={footer}
			onChange={onChange}
			readOnly={["userId", "vehicleId"]}
			userList={userList}
			onError={setErrors}
			vehicleList={vehicleList}
			bookingTypeList={bookingTypeList}
		/>
	);
}

const mapStateToProps = ({ users, vehicles }) => ({
	users,
	vehicles
});

export default connect(
	mapStateToProps,
	reduxActions
)(BookingFinalizeFormContainer);
