import React, { Component, useState, useEffect, Fragment } from "react";
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
import { bookingTypes } from "../../../../variables/enums";
import CardList from "../../../presentational/display/CardList";
import LocationMapSelectForm from "../../../presentational/forms/LocationMapSelectForm";
import BookingForm from "../../../presentational/forms/BookingForm";
import BookingVehicleListForm from "../../../presentational/forms/BookingVehicleListForm";
import VehicleFormReplacement from "../../../presentational/forms/VehicleForm";

function BookingFormCreateStepper({
	fetchBookings,
	fetchVehicles,
	vehicles,
	locations,
	classes,
	history,
	enums
}) {
	const [errorNotes, setErrorNotes] = useState([]);
	const [steps, setSteps] = useState([
		{
			label: "Select a booking schedule & type",
			disabled: false,
			completed: false
		},
		{
			label: "Specify replaced vehicle",
			disabled: true,
			completed: false
		},
		{
			label: "Select pickup location",
			disabled: false,
			completed: false
		},
		{
			label: "Select a vehicle",
			disabled: false,
			completed: false
		}
	]);

	const [values, setValues] = useState([
		{
			from: moment()
				.add(30, "minutes")
				.unix(),
			to: moment()
				.endOf("day")
				.unix()
		},
		{},
		{},
		{}
	]);
	const [errors, setErrors] = useState([{}, {}, {}, {}]);
	const [loading, setLoading] = useState(false);
	const [disabled, setDisabledButton] = useState(false);

	const [activeStep, setActiveStep] = useState(0);
	const [availableVehicles, setAvailableVehicles] = useState([]);
	const [bookingTypeList, setBookingTypeList] = useState([]);

	useEffect(() => {
		const newSteps = [...steps];
		if (values[0].bookingTypeId) {
			let bookingType = bookingTypeList.find(
				type => type.id === values[0].bookingTypeId
			);
			if (bookingType.name === bookingTypes.REPLACEMENT) {
				newSteps[1].disabled = false;
			} else {
				newSteps[1].disabled = true;
			}
		}
		setSteps(newSteps);
	}, [values, bookingTypeList]);

	useEffect(() => {
		let availableVehicles =
			vehicles &&
			vehicles.data &&
			vehicles.data.reduce((acc, vehicle) => {
				if (
					isVehicleAvailableForBooking(values[0].from, values[0].to, vehicle) &&
					vehicle.locationId === values[2].locationId
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
			setBookingTypeList(enums.data.bookingTypes);
		}
	}, [enums]);

	useEffect(() => {
		let isButtonDisabled = false;
		for (const error of Object.values(errors[activeStep])) {
			if (error.length) {
				isButtonDisabled = true;
			}
		}
		if (values[0].bookingTypeId === undefined) {
			isButtonDisabled = true;
		}
		setDisabledButton(isButtonDisabled);
	}, [activeStep, errors, values]);

	const availableSteps = steps.filter(step => !step.disabled);
	let skippedSteps = 0;
	for (let i = 0; i < activeStep; i++) {
		if (steps[i].disabled) skippedSteps++;
	}

	function getStepContent(step) {
		switch (step) {
			case 0:
				return (
					<Fragment>
						<BookingForm
							errors={errors[step]}
							allowBefore={false}
							exclude={["userId", "vehicleId", "bookingTypeId"]}
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
							errorNotes={errorNotes}
							values={values[step]}
							vehicles={vehicles && vehicles.data ? vehicles.data : []}
							onChange={dates => {
								let newValues = [...values];
								newValues[step] = { ...newValues[step], ...dates };
								setValues(newValues);
							}}
							onError={e => {
								let newErrors = [...errors];
								newErrors[step] = { ...newErrors[step], ...e };
								setErrors([...newErrors]);
							}}
							hints=""
						/>
						<CardList
							classes={{ root: classes.bookingListGridContainer }}
							showAll
							cards={bookingTypeList.reduce((acc, type) => {
								let iconName;
								switch (type.name) {
									case bookingTypes.PRIVATE:
										iconName = "Map";
										break;
									case bookingTypes.BUSINESS:
										iconName = "Work";
										break;
									case bookingTypes.REPLACEMENT:
										iconName = "Repeat";
										break;
									default:
										return acc;
								}
								acc.push({
									gridItemProps: {
										xs: 4,
										sm: 4,
										md: 4,
										lg: 4
									},
									title: toTitleWords(type.name),
									id: type.id,
									props: {
										iconName,
										selected: values[step].bookingTypeId === type.id,
										onClick: () => {
											if (type.name === bookingTypes.REPLACEMENT) {
												const newSteps = [...steps];
												newSteps[1].disabled = false;
												setSteps(newSteps);
											}
											let newValues = [...values];
											newValues[step] = {
												...newValues[step],
												bookingTypeId: type.id
											};
											setValues(newValues);
										},
										classes: {
											card: classes.bookingListCard
										},
										cardContentProps: {
											classes: {
												root: classes.bookingListCardContent
											}
										},
										titleProps: {
											classes: {
												root: classes.bookingListCardTitle
											}
										}
									}
								});
								return acc;
							}, [])}
						/>
					</Fragment>
				);
			case 1:
				return (
					<VehicleFormReplacement
						title="Specify vehicle to be replaced"
						values={values[step]}
						onChangeEvent={(data, name, event) => {
							let newValues = [...values];
							newValues[step] = {
								...newValues[step],
								...data
							};
							setValues(newValues);
						}}
						errors={errors[step]}
						onError={e => {
							let newErrors = [...errors];
							newErrors[step] = { ...newErrors[step], ...e };
							setErrors([...newErrors]);
						}}
						exclude={[
							"vehicleImageSrc",
							"objectId",
							"parkingLocation",
							"locationId",
							"categories"
						]}
						showFooter={false}
					/>
				);
			case 2:
				return (
					<LocationMapSelectForm
						errors={errors[step]}
						errorNotes={errorNotes}
						values={values[step]}
						locations={locations && locations.data}
						onMarkerClick={locationId => {
							let newValues = [...values];
							newValues[step] = {
								...newValues[step],
								locationId,
								vehicleId: undefined
							};
							setValues(newValues);
						}}
						onError={e => {
							let newErrors = [...errors];
							newErrors[step] = { ...newErrors[step], ...e };
							setErrors([...newErrors]);
						}}
					/>
				);

			case 3:
				return availableVehicles.length > 0 ? (
					<BookingVehicleListForm
						errors={errors[step]}
						errorNotes={errorNotes}
						values={values[step]}
						vehicles={availableVehicles}
						onError={e => {
							let newErrors = [...errors];
							newErrors[step] = { ...newErrors[step], ...e };
							setErrors([...newErrors]);
						}}
						hints=""
						onClick={vehicle => {
							let newValues = [...values];
							newValues[step] = {
								...newValues[step],
								...vehicle
							};
							setValues(newValues);
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
				<Stepper
					alternativeLabel
					nonLinear
					activeStep={activeStep - skippedSteps}
				>
					{steps
						.filter(step => !step.disabled)
						.map(step => (
							<Step key={step.label} completed={step.completed}>
								<StepLabel>{step.label}</StepLabel>
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
							let prevStep;
							for (let i = activeStep - 1; i >= 0; i--) {
								if (!steps[i].disabled) {
									prevStep = i;
									break;
								}
							}
							setActiveStep(prevStep);
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
					disabled={disabled || loading}
					onClick={() => {
						let last = activeStep - skippedSteps >= availableSteps.length - 1;
						if (!last) {
							let nextStep;
							for (let i = activeStep + 1; i < steps.length; i++) {
								if (!steps[i].disabled) {
									nextStep = i;
									break;
								}
							}
							setActiveStep(nextStep);
						} else {
							setLoading(true);
							let bookingData = {};

							for (const data of values) {
								for (const key in data) {
									bookingData[key] = data[key];
								}
							}
							api
								.createBooking(bookingData)
								.then(() => {
									setLoading(false);
									fetchBookings();
									history.push("/bookings");
								})
								.catch(e => {
									setErrorNotes([e]);
									fetchBookings();
									fetchVehicles();
									setLoading(false);
								});
						}
					}}
				>
					{activeStep - skippedSteps < availableSteps.length - 1
						? "Next"
						: "Finish"}
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
		flexGrow: 1,
		overflowY: "auto",
		overflowX: "hidden"
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
	bookingListCard: {
		flexDirection: "column",
		height: "120px"
	},
	bookingListGridContainer: {
		width: "100%",
		maxWidth: "450px",
		margin: "auto"
	},
	bookingListCardContent: {
		padding: theme.spacing(1),
		"&:last-child": {
			paddingBottom: theme.spacing(1)
		}
	},
	bookingListCardTitle: {
		fontSize: "1rem"
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
)(BookingFormCreateStepper);
