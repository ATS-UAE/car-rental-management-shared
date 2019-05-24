import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Grid, Button } from "@material-ui/core";
import AccidentForm from "../../../presentational/forms/AccidentForm";

function AccidentFormContainer({
	onSubmit,
	values,
	readOnly,
	exclude,
	title,
	loading,
	hints,
	onChangeEvent,
	errorNotes,
	users,
	vehicles,
	bookings,
	showFooter
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

	let currentTime = moment();

	let userList = [{ value: "", label: "Loading..." }];
	let bookingList = [{ value: "", label: "Loading..." }];
	let vehicleList = [{ value: "", label: "Loading..." }];

	if (bookings && vehicles) {
		let $userList = users
			? users.map(({ id, firstName, lastName, username }) => ({
					value: id,
					label: `${firstName} ${lastName} - ${username}`
			  }))
			: [];
		userList = $userList.length
			? $userList
			: [{ value: "", label: "No users found..." }];

		let $bookingList = bookings.map(({ id }) => ({
			value: id,
			label: id
		}));
		bookingList = $bookingList.length
			? $bookingList
			: [{ value: "", label: "No bookings found..." }];

		let $vehicleList = values.userId
			? vehicles.reduce((acc, { id, brand, model, plateNumber }) => {
					let activeVehicle = bookings.find(
						booking =>
							booking.approved === true &&
							booking.finished === false &&
							booking.vehicleId === id &&
							booking.from <= currentTime.unix() &&
							booking.to >= currentTime.unix()
					);

					if (activeVehicle)
						acc.push({
							value: id,
							label: `${brand} ${model} - ${plateNumber}`
						});

					return acc;
			  }, [])
			: [{ value: "", label: "Please select a user..." }];
		vehicleList = $vehicleList.length
			? $vehicleList
			: [{ value: "", label: "No vehicles found..." }];
	}

	let footer = showFooter && (
		<Fragment>
			<Grid item>
				<Button
					disabled={loading || disableButton}
					type="submit"
					variant="contained"
					color="primary"
					onClick={e => {
						e.preventDefault();
						onSubmit(e);
					}}
				>
					Confirm
				</Button>
			</Grid>
		</Fragment>
	);
	return (
		<AccidentForm
			userList={userList}
			bookingList={bookingList}
			vehicleList={vehicleList}
			exclude={exclude}
			title={title}
			values={values}
			onChangeEvent={onChangeEvent}
			errorNotes={errorNotes}
			footer={footer}
			onError={setErrors}
			errors={errors}
			hints={hints}
			readOnly={readOnly}
		/>
	);
}

const mapStateToProps = ({ users, vehicles, bookings }) => {
	let userList = null;
	let vehicleList = null;
	let bookingList = null;

	if (users && users.data) userList = users.data;
	if (vehicles && vehicles.data) vehicleList = vehicles.data;
	if (bookings && bookings.data) bookingList = bookings.data;

	return { users: userList, vehicles: vehicleList, bookings: bookingList };
};

export default connect(mapStateToProps)(AccidentFormContainer);
