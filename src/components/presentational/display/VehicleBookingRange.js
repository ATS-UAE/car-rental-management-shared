import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import DateTimePicker from "../inputs/DateTimePicker";
import { Paper, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import BarRange from "./BarRange";
import DateRuler from "./DateRuler";

const normalize = (value, min, max) => ((value - min) * 100) / (max - min);

function VehicleBookingRange({
	classes,
	vehicles,
	dateRange,
	onDateChange,
	onClick
}) {
	return (
		<Paper className={classes.root}>
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
			<div className={classes.graphContainer}>
				<div className={classes.graph}>
					<DateRuler dateRange={dateRange} />
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
		</Paper>
	);
}

VehicleBookingRange.propTypes = {
	vehicles: PropTypes.array,
	dateRange: PropTypes.shape({
		from: PropTypes.number.isRequired,
		to: PropTypes.number.isRequired
	}).isRequired
};

VehicleBookingRange.defaultProps = {
	vehicles: []
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
	}
});

export default withStyles(styles)(VehicleBookingRange);
