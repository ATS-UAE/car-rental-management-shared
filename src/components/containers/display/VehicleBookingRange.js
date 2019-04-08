import React, { useState } from "react";
import moment from "moment";
import VehicleBookingRange from "../../presentational/display/VehicleBookingRange";

export default function VehicleBookingRangeContainer() {
	let [vehicles, setVehicles] = useState([
		{
			id: 1,
			brand: "Kia",
			model: "Rio",
			bookings: [
				{
					from: 1554258215,
					to: 1554430998
				}
			],
			plateNumber: "A00001"
		},
		{
			id: 2,
			brand: "Toyota",
			model: "Corolla",
			bookings: [
				{
					from: 1554158215,
					to: 1554330998
				}
			],
			plateNumber: "A00000"
		}
	]);

	let [dateRange, setDateRange] = useState({
		from: moment()
			.subtract(2, "days")
			.unix(),
		to: moment().unix() - 1
	});

	return (
		<VehicleBookingRange
			vehicles={vehicles}
			dateRange={dateRange}
			onDateChange={setDateRange}
		/>
	);
}
