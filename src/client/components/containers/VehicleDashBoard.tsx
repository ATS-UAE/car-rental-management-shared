import React, { FC } from "react";
import { connect, MapStateToProps } from "react-redux";
import moment from "moment";
import { BarChart } from "../presentational";

import { isVehicleAvailableToBook } from "../../utils";
import { ReduxState } from "../../typings";

interface VehicleDashBoardStateProps {
	vehicles: ReduxState["vehicles"];
	bookings: ReduxState["bookings"];
}

type Props = VehicleDashBoardStateProps;

const VehicleDashBoardBase: FC<Props> = ({ vehicles, bookings }) => {
	const data =
		bookings &&
		bookings.data &&
		vehicles &&
		vehicles.data &&
		vehicles.data.reduce(
			(acc, vehicle) => {
				if (!vehicle.defleeted && bookings && bookings.data) {
					const vehicleBookings = bookings.data.filter(
						booking => booking.vehicleId === vehicle.id
					);
					if (isVehicleAvailableToBook(vehicleBookings)) {
						acc[0].Available++;
					}
				} else if (vehicle.defleeted) {
					acc[0].Defleeted++;
				} else {
					acc[0].Booked++;
				}
				return acc;
			},
			[{ Available: 0, Defleeted: 0, Booked: 0, name: "Vehicle statuses" }]
		);

	return (
		<BarChart
			xAxis
			title="Vehicle Status"
			data={data || []}
			bars={["Available", "Defleeted", "Booked"]}
		/>
	);
};

const mapStateToProps: MapStateToProps<
	VehicleDashBoardStateProps,
	{},
	ReduxState
> = ({ vehicles, bookings }) => ({ vehicles, bookings });

export const VehicleDashBoard = connect(mapStateToProps)(VehicleDashBoardBase);
