import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";
import * as actions from "../../../actions";
import VehicleBookingRange from "../../presentational/display/VehicleBookingRange";

function VehicleBookingRangeContainer({ fetchVehicles, vehicles }) {
	useEffect(() => {
		if (!vehicles) {
			fetchVehicles();
		}
	}, []);

	let [dateRange, setDateRange] = useState({
		from: moment()
			.subtract(2, "days")
			.unix(),
		to: moment().unix() - 1
	});

	let vehicleList = [];
	if(vehicles&& vehicles.data) {
		vehicleList=vehicles.data
	}

	return (
		<VehicleBookingRange
			vehicles={vehicleList}
			dateRange={dateRange}
			onDateChange={setDateRange}
		/>
	);
}

const mapStateToProps = ({ vehicles }) => ({ vehicles });

export default connect(
	mapStateToProps,
	actions
)(VehicleBookingRangeContainer);
