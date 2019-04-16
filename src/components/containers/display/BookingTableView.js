import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import * as actions from "../../../actions";
import TableView from "../../presentational/forms/TableView";
import VehicleUpdate from "../forms/VehicleUpdate";
import { toTitleWords } from "../../../utils";

function VehicleTableView({
	bookings,
	vehicles,
	fetchBookings,
	fetchVehicles,
	onSubmit
}) {
	useEffect(() => {
		fetchBookings();
		fetchVehicles();
	}, []);
	const [open, setOpen] = useState(false);
	const [formData, setFormData] = useState({});
	const tableBody =
		bookings && bookings.data && vehicles
			? bookings.data.map(booking => {
					let bookingVehicle = vehicles.data.find(
						vehicle => vehicle.id === booking.vehicleId
					);
					let row = {
						metadata: booking,
						values: [
							{
								value: `${booking.user.firstName} ${booking.user.lastName}`
							},
							{
								value: toTitleWords(booking.bookingType.name)
							},
							{
								value: `${bookingVehicle.brand} ${bookingVehicle.model}`
							},
							{
								value: moment(booking.from, "X").calendar()
							},
							{
								value: moment(booking.to, "X").calendar()
							}
						]
					};
					return row;
			  })
			: [];
	return (
		<TableView
			open={open}
			onClose={() => setOpen(false)}
			editable={true}
			tableData={{
				headers: [
					{
						values: [
							{ value: "User" },
							{ value: "Booking Type" },
							{ value: "Vehicle" },
							{ value: "Starting Time" },
							{ value: "Finishing Time" }
						]
					}
				],
				body: tableBody
			}}
		>
			<VehicleUpdate
				values={formData}
				onChange={setFormData}
				onSubmit={() => onSubmit && onSubmit()}
			/>
		</TableView>
	);
}

const mapStateToProps = ({ bookings, vehicles, enums }) => ({
	bookings,
	vehicles,
	enums
});

export default connect(
	mapStateToProps,
	actions
)(VehicleTableView);
