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
import { bookingTypes } from "../../../../variables/enums";
import CardList from "../../../presentational/display/CardList";
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
	const [errors, setErrors] = useState({});
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
	let [bookingTypeList, setBookingTypeList] = useState([]);

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
			setBookingTypeList(enums.data.bookingTypes);
		}
	}, [enums]);

	const checkCompletionAndResetNextSteps = (currentPage, errors) => {
		let newStep = [...step];

		for (let startPage = currentPage + 1; startPage < steps.length; startPage++)
			newStep[startPage].completed = false;
		if (errors) {
			let errored = false;
			for (let key in errors) if (errors[key].length) errored = true;
			newStep[currentPage].completed = !errored;
			newStep[currentPage].error = errored;
		}
		// TODO: move validations to a form.
		if (!values.bookingTypeId) {
			newStep[0].error = true;
		}
		setStep(newStep);
	};
	function getStepContent(step) {
		switch (step) {
			case 0:
				return (
					<Fragment>
						<BookingForm
							errors={errors}
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
							values={values}
							vehicles={vehicles && vehicles.data ? vehicles.data : []}
							onChange={dates => {
								setValues({ ...values, ...dates, locationId: undefined });
								checkCompletionAndResetNextSteps(step);
							}}
							onError={e => {
								setErrors({ ...errors, ...e });
								checkCompletionAndResetNextSteps(step, e);
							}}
							hints=""
						/>
						<CardList
							classes={{ root: classes.bookingListGridContainer }}
							cards={bookingTypeList.map(type => {
								let iconName;
								switch (type.name) {
									case bookingTypes.PRIVATE:
										iconName = "Map";
										break;
									case bookingTypes.BUSINESS:
										iconName = "Work";
										break;
									case bookingTypes.SERVICE:
										iconName = "Build";
										break;
									default:
										iconName = null;
								}
								return {
									gridItemProps: {
										xs: 4,
										sm: 4,
										md: 4,
										lg: 4
									},
									title: toTitleWords(type.name),
									onClick: () => setValues({ ...values, locationId: type.id }),
									id: type.id,
									props: {
										iconName,
										selected: values.bookingTypeId === type.id,
										onClick: () =>
											setValues({ ...values, bookingTypeId: type.id }),
										classes: {
											card: classes.bookingListCard
										},
										cardContentProps: {
											classes: { root: classes.bookingListCardContent }
										},
										titleProps: {
											classes: {
												root: classes.bookingListCardTitle
											}
										}
									}
								};
							})}
						/>
					</Fragment>
				);
			case 1:
				return (
					<LocationMapSelectForm
						errors={errors}
						errorNotes={errorNotes}
						values={values}
						locations={locations && locations.data}
						onMarkerClick={locationId => {
							setValues({ ...values, locationId, vehicleId: undefined });
							checkCompletionAndResetNextSteps(step);
						}}
						onError={e => {
							setErrors({ ...errors, ...e });
							checkCompletionAndResetNextSteps(step, e);
						}}
					/>
				);
			case 2:
				return availableVehicles.length > 0 ? (
					<BookingVehicleListForm
						errors={errors}
						errorNotes={errorNotes}
						values={values}
						vehicles={availableVehicles}
						onError={e => {
							setErrors({ ...errors, ...e });
							checkCompletionAndResetNextSteps(step, e);
						}}
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
)(BookingFromCreate);
