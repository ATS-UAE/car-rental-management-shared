import React, { Fragment } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Typography, withWidth } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";

import DateTimePicker from "../inputs/DateTimePicker";
import BarRange from "./BarRange";
import DateRuler from "./DateRuler";

const normalize = (value, min, max) => ((value - min) * 100) / (max - min);

function VehicleBookingRange({
	classes,
	vehicles,
	dateRange,
	onDateChange,
	onClick,
	title,
	includeDatePicker,
	ticksMap,
	width
}) {
	let currentTime = moment();
	return (
		<div className={classes.root}>
			{title && (
				<Typography
					variant="h6"
					gutterBottom
					component="h1"
					className={classes.title}
				>
					{title}
				</Typography>
			)}
			{includeDatePicker && (
				<Fragment>
					<DateTimePicker
						value={dateRange.from}
						label="Bookings From"
						onChange={e => {
							onDateChange({ ...dateRange, from: e.target.value });
						}}
					/>
					<DateTimePicker
						value={dateRange.to}
						label="Bookings To"
						onChange={e => {
							onDateChange({ ...dateRange, to: e.target.value });
						}}
					/>
				</Fragment>
			)}
			{ticksMap && (
				<div className={classes.graphContainer}>
					<div className={classes.graph}>
						<DateRuler dateRange={dateRange} ticks={ticksMap[width]} />
						{vehicles.reduce((vehicleAcc, vehicle) => {
							if (vehicle.bookings.length) {
								let values = vehicle.bookings.reduce((acc, booking) => {
									if (
										booking.approved === true ||
										(booking.approved === null &&
											booking.from > currentTime.unix())
									) {
										let min = normalize(
											booking.from,
											dateRange.from,
											dateRange.to
										);
										let max = normalize(
											booking.to,
											dateRange.from,
											dateRange.to
										);
										acc.push({
											min: min < 0 ? 0 : min > 100 ? 100 : min,
											max: max < 0 ? 0 : max > 100 ? 100 : max,
											label: `${moment(booking.from, "X").format(
												"lll"
											)} - ${moment(booking.to, "X").format("lll")}`
										});
									}
									return acc;
								}, []);
								vehicleAcc.push(
									<div
										key={vehicle.id}
										onClick={() => onClick && onClick(vehicle)}
									>
										<Typography>{`${vehicle.brand} ${
											vehicle.model
										}`}</Typography>
										<BarRange values={values} />
									</div>
								);
							}
							return vehicleAcc;
						}, [])}
					</div>
				</div>
			)}
		</div>
	);
}

VehicleBookingRange.propTypes = {
	vehicles: PropTypes.array,
	dateRange: PropTypes.shape({
		from: PropTypes.number.isRequired,
		to: PropTypes.number.isRequired
	}).isRequired,
	includeDatePicker: PropTypes.bool,
	ticksMap: PropTypes.object
};

VehicleBookingRange.defaultProps = {
	vehicles: [],
	includeDatePicker: true,
	ticksMap: {
		xs: 3,
		sm: 4,
		md: 6,
		lg: 10,
		xl: 12
	}
};

const styles = theme => ({
	root: {
		padding: theme.spacing(3)
	},
	graph: {
		display: "inline-block",
		minWidth: "100%"
	},
	graphContainer: {
		overflowX: "auto",
		paddingLeft: theme.spacing(6),
		paddingRight: theme.spacing(6)
	},
	title: {
		marginBottom: theme.spacing(3)
	}
});

export default compose(
	withWidth(),
	withStyles(styles)
)(VehicleBookingRange);
