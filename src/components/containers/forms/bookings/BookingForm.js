import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Grid, Button } from "@material-ui/core";
import BookingForm from "../../../presentational/forms/BookingForm";
import * as reduxActions from "../../../../actions";
import { toTitleWords, isVehicleAvailableForBooking } from "../../../../utils";

import VehicleBookingRange from "../../../presentational/display/VehicleBookingRange";

function BookingFormContainer({
	enums,
	locations,
	vehicles,
	onSubmit,
	errorNotes,
	exclude,
	title,
	values,
	onChange,
	loading,
	readOnly,
	ticksMap,
	allowBefore,
	users
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
	if (users && users.data) {
		let $userList = users.data.map(user => ({
			value: user.id,
			label: `${user.firstName} ${user.lastName} - ${user.username}`
		}));
		if ($userList.length) {
			userList = $userList;
		}
	}
	if (vehicles && vehicles.data) {
		let $vehicleList = vehicles.data.reduce((acc, vehicle) => {
			const { from, to } = values;
			let available = false;
			let inLocation = false;
			if (values.locationId) {
				inLocation = vehicle.locationId === values.locationId;
			}
			if (inLocation) {
				available = isVehicleAvailableForBooking(from, to, vehicle, values.id);
			}
			if (available && inLocation) {
				acc.push({
					value: vehicle.id,
					label: `${vehicle.brand} ${vehicle.model} - ${vehicle.plateNumber}`
				});
			}
			return acc;
		}, []);
		if ($vehicleList.length) {
			vehicleList = $vehicleList;
		}
	}
	let footer = readOnly !== false && (
		<Fragment>
			<Grid item>
				<VehicleBookingRange
					includeDatePicker={false}
					dateRange={{ from: values.from, to: values.to }}
					vehicles={vehicles && vehicles.data ? vehicles.data : []}
					ticksMap={ticksMap}
				/>
			</Grid>
			<Grid item>
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
					Confirm
				</Button>
			</Grid>
		</Fragment>
	);
	return (
		<BookingForm
			showMap={true}
			userList={userList}
			values={values}
			exclude={exclude}
			bookingTypeList={bookingTypeList}
			vehicleList={vehicleList}
			readOnly={readOnly}
			allowBefore={allowBefore}
			onChange={values => {
				let from = values.from;
				let to = values.to;
				if (to < from) {
					let temp = to;
					to = from;
					from = temp;
				}
				onChange({ ...values, from, to });
			}}
			errorNotes={errorNotes}
			errors={errors}
			onError={setErrors}
			title={title}
			footer={footer}
			locations={locations && locations.data ? locations.data : []}
			onLocationClick={({ id: locationId }) =>
				onChange({ ...values, locationId })
			}
		/>
	);
}

const mapStateToProps = ({ users, enums, vehicles, locations }) => ({
	users,
	enums,
	vehicles,
	locations
});

export default connect(
	mapStateToProps,
	reduxActions
)(BookingFormContainer);
