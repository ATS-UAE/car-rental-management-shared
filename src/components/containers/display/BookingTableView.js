import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import moment from "moment";
import * as reduxActions from "../../../actions";
import TableView from "../../presentational/forms/TableView";
import BookingActions from "../../presentational/inputs/BookingActions";
import Can from "../layout/Can";
import BookingFormUpdate from "../forms/bookings/BookingFormUpdate";
import { toTitleWords, api, waitForAll } from "../../../utils";
import { resources, actions, roles } from "../../../variables/enums";
import { RBAC } from "../../../config/rbac";

function BookingTableView({
	bookings,
	vehicles,
	auth,
	fetchEnums,
	fetchBookings,
	fetchVehicles,
	fetchCurrentUserDetails,
	onSubmit
}) {
	const [open, setOpen] = useState(false);
	const [formData, setFormData] = useState({});
	let [actionStatus, setActionStatus] = useState([]);

	useEffect(() => {
		const resetActionStatus = async () => {
			if (auth && auth.data && bookings && bookings.data) {
				let userRole = auth.data.role.name;
				let actionStatus = [];
				if (bookings && bookings.data) {
					for (let booking of bookings.data) {
						let expiredBooking = booking.from < moment().unix();
						let showApprove =
							!expiredBooking &&
							(await RBAC.can(userRole, actions.UPDATE, resources.BOOKINGS));
						let showDeny =
							!expiredBooking &&
							(await RBAC.can(userRole, actions.UPDATE, resources.BOOKINGS));
						let showDelete = await RBAC.can(
							userRole,
							actions.UPDATE,
							resources.BOOKINGS
						);
						let showUpdate = await RBAC.can(
							userRole,
							actions.UPDATE,
							resources.BOOKINGS
						);
						actionStatus.push({
							isDisabled: false,
							showApprove,
							showDeny,
							showDelete,
							showUpdate
						});
					}
					let actionsStatus = await waitForAll(actionStatus);
					setActionStatus(actionsStatus);
				}
			}
		};
		resetActionStatus();
	}, [bookings, auth]);
	useEffect(() => {
		fetchBookings();
		fetchEnums();
		fetchVehicles();
		fetchCurrentUserDetails();
	}, []);

	let tableHeaders = [
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
	];

	let showBookingActions = false;

	if (auth && auth.data) {
		if (auth.data.role.name !== roles.GUEST) {
			showBookingActions = true;
		}
	}

	let tableBody = [];
	if (bookings && bookings.data && vehicles && vehicles.data) {
		tableBody = bookings.data.map((booking, index) => {
			let bookingVehicle = vehicles.data.find(
				vehicle => vehicle.id === booking.vehicleId
			);
			let bookingStatus = "";
			let currentTime = moment();
			if (booking.approved) {
				let hasPassedFrom = moment(booking.from, "X").isSameOrBefore(
					currentTime
				);
				let hasPassedTo = moment(booking.to, "X").isAfter(currentTime);
				if (hasPassedFrom && !hasPassedTo) bookingStatus = "Ongoing";
				else if (hasPassedTo) bookingStatus = "Finished";
				else bookingStatus = "Approved";
			} else {
				if (booking.approved === null) {
					if (moment(booking.from, "X").isSameOrBefore(currentTime))
						bookingStatus = "Expired";
					else bookingStatus = "Pending";
				} else if (booking.approved === false) bookingStatus = "Denied";
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
			if (showBookingActions && booking.approved === null) {
				row.values.push({
					value: (
						<BookingActions
							showApprove={
								actionStatus[index] ? actionStatus[index].showApprove : false
							}
							showDeny={
								actionStatus[index] ? actionStatus[index].showDeny : false
							}
							showDelete={
								actionStatus[index] ? actionStatus[index].showDelete : false
							}
							showUpdate={
								actionStatus[index] ? actionStatus[index].showUpdate : false
							}
							onApprove={() => {
								let status = actionStatus;
								status[index].isDisabled = true;
								setActionStatus(status);
								api
									.updateBooking({ id: booking.id, approved: true })
									.then(() => {
										let status = actionStatus;
										fetchBookings();
										status[index].isDisabled = false;
										setActionStatus(status);
									});
							}}
							onDeny={() => {
								let status = actionStatus;
								status[index].isDisabled = true;
								setActionStatus(status);
								api
									.updateBooking({ id: booking.id, approved: false })
									.then(() => {
										let status = actionStatus;
										fetchBookings();
										status[index].isDisabled = false;
										setActionStatus(status);
									});
							}}
							onUpdate={() => {
								let status = actionStatus;
								status[index].isDisabled = true;
								setActionStatus(status);
								api.fetchBooking(booking.id).then(res => {
									setFormData({
										...res.data,
										userId: res.data.user.id,
										bookingTypeId: res.data.bookingType.id,
										vehicleId: res.data.vehicle.id,
										locationId: res.data.vehicle.locationId
									});
									setOpen(true);
									status[index].isDisabled = false;
									setActionStatus(status);
								});
							}}
							onDelete={() => {
								let status = actionStatus;
								status[index].isDisabled = true;
								setActionStatus(status);
								api.deleteBooking({ id: booking.id }).then(() => {
									let status = actionStatus;
									fetchBookings();
									status[index].isDisabled = false;
									setActionStatus(status);
								});
							}}
							isDisabled={
								actionStatus[index] === undefined
									? false
									: actionStatus[index].isDisabled
							}
						/>
					)
				});
			} else if (showBookingActions) {
				row.values.push({ value: "" });
			}
			return row;
		});
	}
	if (showBookingActions) {
		tableHeaders[0].values.push({ value: "Actions" });
	}

	return (
		<Fragment>
			<Can
				action={actions.READ}
				resource={resources.BOOKINGS}
				params={{ booking: { userId: 1 }, user: { id: 1 } }}
				yes={access => (
					<TableView
						open={open}
						onClose={() => setOpen(false)}
						editable={true}
						tableData={{
							headers: tableHeaders,
							body: tableBody
						}}
					>
						<Can
							action={actions.UPDATE}
							resource={resources.BOOKINGS}
							yes={access => {
								return (
									<BookingFormUpdate
										values={formData}
										onChange={setFormData}
										exclude={access.excludedFields}
										onSubmit={() => {
											setOpen(false);
											onSubmit && onSubmit();
										}}
									/>
								);
							}}
							no={() => (
								<BookingFormUpdate
									values={formData}
									onChange={setFormData}
									readOnly={true}
									exclude={access.excludedFields}
									hints=""
								/>
							)}
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

export default compose(
	connect(
		mapStateToProps,
		reduxActions
	)
)(BookingTableView);
