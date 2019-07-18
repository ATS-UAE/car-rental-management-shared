import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Grid, Button } from "@material-ui/core";
import BookingForm from "../../../presentational/forms/BookingForm";
import VehicleForm from "../../../presentational/forms/VehicleForm";
import * as reduxActions from "../../../../actions";
import {
	toTitleWords,
	isVehicleAvailableForBooking,
	isBookingTimeSlotTaken
} from "../../../../utils";

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
	users,
	inLocation: inLocationProp,
	available: availableProp,
	checkTimeSlot,
	hints,
	showMap,
	unavailableVehicleErrorText,
	showReplaceVehicleForm
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
			const { from, to, id } = values;
			let available = false;
			let inLocation = false;
			if (values.locationId) {
				inLocation = vehicle.locationId === values.locationId;
			}
			if (inLocation) {
				available = isVehicleAvailableForBooking(from, to, vehicle, values.id);
			}
			if (!inLocationProp) {
				inLocation = true;
			}
			if (availableProp && !inLocationProp) {
				available = isVehicleAvailableForBooking(from, to, vehicle, values.id);
			}
			if (checkTimeSlot) {
				available = !isBookingTimeSlotTaken(vehicle, from, to, id);
			}
			if (!availableProp) {
				available = true;
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
	let footer = readOnly !== true && (
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

	let replaceVehicleForm = showReplaceVehicleForm && (
		<VehicleForm
			title="Specify vehicle to be replaced"
			values={values.replaceVehicle}
			onChangeEvent={data =>
				onChange({
					...values,
					replaceVehicle: { ...values.replaceVehicle, ...data }
				})
			}
			errors={errors}
			onError={e => {
				setErrors(errors => ({ ...errors, ...e }));
			}}
			exclude={[
				"vehicleImageSrc",
				"objectId",
				"parkingLocation",
				"locationId",
				"categories"
			]}
			wrapper="div"
			showFooter={false}
		/>
	);

	return (
		<BookingForm
			unavailableVehicleErrorText={unavailableVehicleErrorText}
			showMap={showMap}
			userList={userList}
			values={values}
			exclude={exclude}
			bookingTypeList={bookingTypeList}
			vehicleList={vehicleList}
			readOnly={readOnly}
			allowBefore={allowBefore}
			onChange={values => {
				const { from, to } = values;
				onChange && onChange({ ...values, from, to });
			}}
			errorNotes={errorNotes}
			errors={errors}
			onError={e => setErrors(errors => ({ ...errors, ...e }))}
			title={title}
			footer={footer}
			locations={locations && locations.data ? locations.data : []}
			onLocationClick={({ id: locationId }) =>
				onChange && onChange({ ...values, locationId })
			}
			children={replaceVehicleForm}
			hints={hints}
		/>
	);
}

BookingFormContainer.propTypes = {
	inLocation: PropTypes.bool,
	available: PropTypes.bool,
	showMap: PropTypes.bool
};

BookingFormContainer.defaultProps = {
	inLocation: true,
	available: true,
	showMap: true,
	checkTimeSlot: false
};

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
