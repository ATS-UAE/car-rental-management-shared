import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import moment from "moment";
import * as actions from "../../../actions";
import TableView from "../../presentational/forms/TableView";
import Can from "../layout/Can";
import BookingForm from "../../presentational/forms/BookingForm";
import { toTitleWords } from "../../../utils";
import { RESOURCES, ACTIONS } from "../../../variables";

function BookingTableView({
	bookings,
	vehicles,
	fetchBookings,
	fetchVehicles
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
					let bookingStatus = "";

					if (booking.approved) {
						if (moment(booking.from, "X").isSameOrBefore(moment()))
							bookingStatus = "Ongoing";
						else bookingStatus = "Approved";
					} else {
						if (moment(booking.from, "X").isSameOrBefore(moment()))
							bookingStatus = "Expired";
						else bookingStatus = "Denied";
					}
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
							},
							{
								value: bookingStatus
							}
						]
					};
					return row;
			  })
			: [];

	return (
		<Fragment>
			<Can
				action={ACTIONS.READ}
				resource={RESOURCES.BOOKINGS}
				params={{}}
				yes={access => (
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
										{ value: "Finishing Time" },
										{ value: "Status" }
									]
								}
							],
							body: tableBody
						}}
					>
						<BookingForm
							values={formData}
							onChange={setFormData}
							exclude={access.excludedFields}
						/>
					</TableView>
				)}
			/>
		</Fragment>
	);
}

const mapStateToProps = ({ bookings, vehicles, enums, auth }) => ({
	bookings,
	vehicles,
	enums,
	auth
});

export default connect(
	mapStateToProps,
	actions
)(BookingTableView);
