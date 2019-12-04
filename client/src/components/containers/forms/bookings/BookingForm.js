import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Grid, Button } from "@material-ui/core";
import BookingForm from "../../../presentational/forms/BookingForm";
import VehicleForm from "../../../presentational/forms/VehicleForm";
import * as reduxActions from "../../../../actions";
import {
	toTitleWords,
	hasActiveBooking,
	isBookingTimeSlotTaken
} from "../../../../utils/helpers";
import { BookingType } from "../../../variables/enums";
import VehicleBookingRange from "../../../presentational/display/VehicleBookingRange";

function BookingFormContainer({
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
	showReplaceVehicleForm,
	showDefleeted
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

	let bookingTypeList = Object.values(BookingType).map(type => ({
		value: type,
		label: type
	}));
	let vehicleList = values.locationId
		? [{ value: "", label: "No vehicles available." }]
		: [{ value: "", label: "Please select a location." }];
	let userList = [{ value: "", label: "Loading..." }];

	let $bookingTypeList = enums.data.bookingTypes.map(item => ({
		value: item.id,
		label: toTitleWords(item.name)
	}));

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

			if (!inLocationProp) {
				inLocation = true;
			} else if (values.locationId) {
				inLocation = vehicle.locationId === values.locationId;
			}

			if (availableProp) {
				available = !hasActiveBooking(vehicle, values.id);
			}

			if (checkTimeSlot) {
				available = !isBookingTimeSlotTaken(vehicle, from, to, values.id);
			}
			if (available && inLocation && (!vehicle.defleeted || showDefleeted)) {
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
			onChangeEvent={data => {
				onChange({
					...values,
					replaceVehicle: data
				});
			}}
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
	showMap: PropTypes.bool,
	showDefleeted: PropTypes.bool
};

BookingFormContainer.defaultProps = {
	inLocation: true,
	available: true,
	showMap: true,
	checkTimeSlot: false,
	showDefleeted: false
};

const mapStateToProps = ({ users, vehicles, locations }) => ({
	users,
	vehicles,
	locations
});

export default connect(mapStateToProps, reduxActions)(BookingFormContainer);
