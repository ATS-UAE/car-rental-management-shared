import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";
import * as actions from "../../../actions";
import VehicleBookingRange from "../../presentational/display/VehicleBookingRange";

function VehicleBookingRangeContainer({ fetchVehicles, vehicles }) {
	useEffect(() => {
		fetchVehicles();
	}, []);

	let [dateRange, setDateRange] = useState({
		from: moment()
			.subtract(2, "days")
			.unix(),
		to: moment().unix() - 1
	});

	let vehicleList = [];
	if (vehicles && vehicles.data) {
		vehicleList = vehicles.data;
	}

	return (
		<VehicleBookingRange
			vehicles={vehicleList}
			dateRange={dateRange}
			onDateChange={date => {
				if (date.from > date.to) {
					setDateRange({ to: date.from, from: date.to });
				} else {
					setDateRange(date);
				}
			}}
			title="Vehicle Bookings"
		/>
	);
}

const mapStateToProps = ({ vehicles }) => ({ vehicles });

export default connect(
	mapStateToProps,
	actions
)(VehicleBookingRangeContainer);
