import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Grid, Button } from "@material-ui/core";
import BookingForm from "../../presentational/forms/BookingForm";
import * as actions from "../../../actions";
import { api, toTitleWords, rangeOverlap } from "../../../utils";
import { ACTIONS, RESOURCES } from "../../../variables";
import Can from "../layout/Can";
import DialogButton from "../../presentational/forms/DialogButton";
import VehicleBookingRange from "../../presentational/display/VehicleBookingRange";

function NewBookingButtonDialog({
	fetchBookings,
	onSubmit,
	enums,
	locations,
	vehicles,
	fetchEnums,
	fetchVehicles,
	fetchLocations
}) {
	const [newBooking, setNewBooking] = useState({
		from: moment()
			.startOf("day")
			.unix(),
		to: moment()
			.endOf("day")
			.unix()
	});
	let [selectedLocation, setSelectedLocation] = useState(null);
	let [open, setOpen] = useState(false);
	let [errors, setErrors] = useState({});
	let [errorNotes, setErrorNotes] = useState([]);
	let [disableButton, setDisabledButton] = useState(false);
	useEffect(() => {
		let validForm = true;
		for (let key in errors) {
			if (errors[key].length) {
				validForm = false;
			}
		}
		setDisabledButton(!validForm);
	}, [errors, newBooking]);
	useEffect(() => {
		if (!enums) {
			fetchEnums();
		}

		if (!vehicles) {
			fetchVehicles();
		}
		if (!locations) {
			fetchLocations();
		}
	}, []);

	let bookingTypeList = [{ value: "", label: "Loading..." }];
	let vehicleList = selectedLocation
		? [{ value: "", label: "No vehicles available." }]
		: [{ value: "", label: "Please select a location." }];

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
		let $vehicleList = vehicles.data.reduce((acc, vehicle) => {
			const { from, to } = newBooking;
			let available = false;
			let inLocation = false;
			if (selectedLocation) {
				inLocation = vehicle.locationId === selectedLocation.id;
			}
			if (inLocation) {
				available = vehicle.bookings.every(booking => {
					if (rangeOverlap(from, to, booking.to, booking.to)) {
						return false;
					}
					return true;
				});
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
	let footer = (
		<Fragment>
			<Grid item>
				<VehicleBookingRange
					includeDatePicker={false}
					dateRange={{ from: newBooking.from, to: newBooking.to }}
					vehicles={vehicles && vehicles.data ? vehicles.data : []}
					ticks={4}
				/>
			</Grid>
			<Grid item>
				<Button
					disabled={disableButton}
					type="submit"
					variant="contained"
					color="primary"
					onClick={e => {
						e.preventDefault();
						api
							.createBooking(newBooking)
							.then(() => {
								fetchBookings();
								setDisabledButton(false);
								setNewBooking({
									from: moment()
										.startOf("day")
										.unix(),
									to: moment()
										.endOf("day")
										.unix()
								});
								setOpen(false);
								onSubmit && onSubmit();
							})
							.catch(e => {
								setErrorNotes([e]);
								setDisabledButton(false);
							});
					}}
				>
					Confirm
				</Button>
			</Grid>
		</Fragment>
	);
	return (
		<Can
			action={ACTIONS.CREATE}
			resource={RESOURCES.BOOKINGS}
			yes={access => (
				<DialogButton
					open={open}
					onClick={() => setOpen(true)}
					onClose={() => setOpen(false)}
				>
					<BookingForm
						values={newBooking}
						exclude={access.excludedFields}
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
						errorNotes={errorNotes}
						errors={errors}
						onError={setErrors}
						title="Book a Vehicle"
						footer={footer}
						locations={locations && locations.data ? locations.data : []}
						onLocationClick={setSelectedLocation}
					/>
				</DialogButton>
			)}
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
	actions
)(NewBookingButtonDialog);
