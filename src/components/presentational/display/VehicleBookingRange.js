import React, { Fragment } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import DateTimePicker from "../inputs/DateTimePicker";
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
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
	ticks
}) {
	return (
		<div className={classes.root}>
			{title && (
				<Typography
					variant="h6"
					gutterBottom
					headlineMapping={{ h6: "h1" }}
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
			<div className={classes.graphContainer}>
				<div className={classes.graph}>
					<DateRuler dateRange={dateRange} ticks={ticks} />
					{vehicles.map(vehicle => {
						let values = vehicle.bookings.map(booking => {
							let min = normalize(booking.from, dateRange.from, dateRange.to);
							let max = normalize(booking.to, dateRange.from, dateRange.to);
							return {
								min: min < 0 ? 0 : min > 100 ? 100 : min,
								max: max < 0 ? 0 : max > 100 ? 100 : max,
								label: `${moment(booking.from, "X").format("lll")} - ${moment(
									booking.to,
									"X"
								).format("lll")}`
							};
						});
						return (
							<div key={vehicle.id} onClick={() => onClick && onClick(vehicle)}>
								<Typography>{`${vehicle.brand} ${vehicle.model}`}</Typography>
								<BarRange values={values} />
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

VehicleBookingRange.propTypes = {
	vehicles: PropTypes.array,
	dateRange: PropTypes.shape({
		from: PropTypes.number.isRequired,
		to: PropTypes.number.isRequired
	}).isRequired,
	includeDatePicker: PropTypes.bool
};

VehicleBookingRange.defaultProps = {
	vehicles: [],
	includeDatePicker: true
};

const styles = theme => ({
	root: {
		padding: theme.spacing.unit * 3
	},
	graph: {
		display: "inline-block",
		minWidth: "100%"
	},
	graphContainer: {
		overflowX: "auto",
		paddingLeft: theme.spacing.unit * 10,
		paddingRight: theme.spacing.unit * 10
	},
	title: {
		marginBottom: theme.spacing.unit * 3
	}
});

export default withStyles(styles)(VehicleBookingRange);
