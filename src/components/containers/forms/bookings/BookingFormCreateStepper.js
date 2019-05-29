import React, { useState, useEffect, Fragment } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import moment from "moment";
import { compose } from "recompose";
import {
	Stepper,
	Step,
	StepLabel,
	Button,
	withStyles,
	Paper,
	Typography
} from "@material-ui/core";

import * as reduxActions from "../../../../actions";
import {
	api,
	isVehicleAvailableForBooking,
	toTitleWords
} from "../../../../utils";
import { bookingTypes } from "../../../../variables";

import LocationMapSelectForm from "../../../presentational/forms/LocationMapSelectForm";
import BookingForm from "../../../presentational/forms/BookingForm";
import BookingVehicleListForm from "../../../presentational/forms/BookingVehicleListForm";

const steps = [
	"Select a booking schedule & type",
	"Select pickup location",
	"Select a vehicle"
];

function BookingFromCreate({
	fetchBookings,
	vehicles,
	locations,
	classes,
	history,
	enums
}) {
	const [errorNotes, setErrorNotes] = useState([]);
	const [activeStep, setActiveStep] = useState(0);
	const [step, setStep] = useState(
		steps.map(label => ({ completed: false, error: false }))
	);
	const [availableVehicles, setAvailableVehicles] = useState([]);
	const [values, setValues] = useState({
		from: moment()
			.add(30, "minutes")
			.unix(),
		to: moment()
			.endOf("day")
			.unix()
	});
	let [loading, setLoading] = useState(false);
	let [bookingTypeList, setBookingTypeList] = useState([
		{ value: "", label: "Loading..." }
	]);

	useEffect(() => {
		let availableVehicles =
			vehicles &&
			vehicles.data &&
			vehicles.data.reduce((acc, vehicle) => {
				if (
					isVehicleAvailableForBooking(values.from, values.to, vehicle) &&
					vehicle.locationId === values.locationId
				)
					acc.push(vehicle);
				return acc;
			}, []);
		if (availableVehicles) {
			setAvailableVehicles(availableVehicles);
		}
	}, [vehicles, values]);

	useEffect(() => {
		if (enums && enums.data) {
			let bookingTypeList = enums.data.bookingTypes.map(item => ({
				value: item.id,
				label: toTitleWords(item.name)
			}));
			if (bookingTypeList.length) {
				setBookingTypeList(bookingTypeList);
			}
		}
	}, [enums]);

	const checkCompletionAndResetNextSteps = (currentPage, errors) => {
		let newStep = [...step];
		for (let startPage = currentPage + 1; startPage < steps.length; startPage++)
			newStep[startPage].completed = false;
		if (errors) {
			let errored = false;
			for (let key in errors) if (errors[key].length) errored = true;

			newStep[currentPage].completed = true;
			newStep[currentPage].error = errored;
		}
		setStep(newStep);
	};
	function getStepContent(step) {
		switch (step) {
			case 0:
				return (
					<Fragment>
						<BookingForm
							allowBefore={false}
							exclude={["userId", "vehicleId"]}
							fieldProps={{
								from: {
									GridProps: {
										xs: 12,
										sm: 12
									}
								},
								to: {
									GridProps: {
										xs: 12,
										sm: 12
									}
								},
								bookingTypeId: {
									GridProps: {
										xs: 12,
										sm: 12
									}
								}
							}}
							bookingTypeList={bookingTypeList}
							errorNotes={errorNotes}
							values={values}
							vehicles={vehicles && vehicles.data ? vehicles.data : []}
							onChange={dates => {
								setValues({ ...values, ...dates, locationId: undefined });
								checkCompletionAndResetNextSteps(step);
							}}
							onError={e => checkCompletionAndResetNextSteps(step, e)}
							hints=""
						/>
					</Fragment>
				);
			case 1:
				return (
					<LocationMapSelectForm
						errorNotes={errorNotes}
						values={values}
						locations={locations && locations.data}
						onMarkerClick={locationId => {
							setValues({ ...values, locationId, vehicleId: undefined });
							checkCompletionAndResetNextSteps(step);
						}}
						onError={e => checkCompletionAndResetNextSteps(step, e)}
					/>
				);
			case 2:
				return availableVehicles.length > 0 ? (
					<BookingVehicleListForm
						errorNotes={errorNotes}
						values={values}
						vehicles={availableVehicles}
						onError={e => checkCompletionAndResetNextSteps(step, e)}
						hints=""
						onClick={vehicle => {
							setValues({ ...values, ...vehicle });
							checkCompletionAndResetNextSteps(step);
						}}
					/>
				) : (
					<div className={classes.noVehicles}>
						<Paper className={classes.noVehiclePaper}>
							<Typography variant="h5" component="h1">
								Sorry. There are no available vehicles.
							</Typography>
							<Typography component="p">
								Please change your pickup location or schedule.
							</Typography>
						</Paper>
					</div>
				);
			default:
				return null;
		}
	}
	return (
		<div className={classes.root}>
			<div className={classes.stepper}>
				<Stepper alternativeLabel nonLinear activeStep={activeStep}>
					{steps.map((label, index) => (
						<Step key={label} completed={step[index].completed}>
							<StepLabel>{label}</StepLabel>
						</Step>
					))}
				</Stepper>
			</div>
			<div className={classes.form}>{getStepContent(activeStep)}</div>
			<div className={classes.actions}>
				<Button
					variant="contained"
					color="primary"
					disabled={loading}
					onClick={() => {
						let beginning = activeStep > 0;
						if (beginning) {
							setActiveStep(activeStep - 1);
						} else {
							history.push("/bookings");
						}
					}}
				>
					{activeStep <= 0 ? "Cancel" : "Back"}
				</Button>
				<Button
					variant="contained"
					color="primary"
					disabled={
						!step[activeStep].completed || step[activeStep].error || loading
					}
					onClick={() => {
						let last = activeStep < step.length - 1;
						if (last) {
							setActiveStep(activeStep + 1);
						} else {
							setLoading(true);
							api
								.createBooking(values)
								.then(() => {
									setLoading(false);
									fetchBookings();
									history.push("/bookings");
								})
								.catch(e => {
									setErrorNotes([e]);
									setLoading(false);
								});
						}
					}}
				>
					{activeStep < step.length - 1 ? "Next" : "Finish"}
				</Button>
			</div>
		</div>
	);
}

const mapStateToProps = ({ vehicles, locations, enums }) => ({
	vehicles,
	locations,
	enums
});

const styles = theme => ({
	root: {
		display: "flex",
		flexDirection: "column",
		height: "100%"
	},
	map: {
		height: "100%"
	},
	form: {
		flexGrow: 1
	},
	actions: {
		"& > *": {
			margin: theme.spacing(1)
		}
	},
	noVehiclePaper: {
		padding: theme.spacing(3, 2)
	},
	noVehicles: {
		margin: theme.spacing(3)
	},
	card: {
		minHeight: "200px"
	}
});

export default compose(
	withRouter,
	withStyles(styles),
	connect(
		mapStateToProps,
		reduxActions
	)
)(BookingFromCreate);
