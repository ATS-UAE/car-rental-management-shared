import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import * as reduxActions from "../../../../actions";
import BookingFinalizeForm from "../../../presentational/forms/BookingFinalizeForm";
import { toTitleWords } from "../../../../utils";

function BookingFinalizeFormContainer({
	fetchUsers,
	fetchEnums,
	fetchVehicles,
	fetchLocations,
	vehicles,
	enums,
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
		fetchEnums();
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
			onClick={e => {
				e.preventDefault();
				onSubmit();
			}}
		>
			Finalize
		</Button>
	);

	let bookingTypeList = [{ value: "", label: "Loading..." }];
	let vehicleList = values.locationId
		? [{ value: "", label: "No vehicles available." }]
		: [{ value: "", label: "Please select a location." }];
	let userList = [{ value: "", label: "Loading..." }];

	if (enums && enums.data) {
		let $bookingTypeList = enums.data.bookingTypes.map(item => ({
			value: item.id,
			label: toTitleWords(item.name)
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

const mapStateToProps = ({ users, vehicles, enums }) => ({
	users,
	vehicles,
	enums
});

export default connect(
	mapStateToProps,
	reduxActions
)(BookingFinalizeFormContainer);
