import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import moment from "moment";
import { Dialog, DialogContent, TextField } from "@material-ui/core";
import * as reduxActions from "../../../actions";
import TableView from "../../presentational/forms/TableView";
import BookingActions from "../../presentational/inputs/BookingActions";
import Can from "../layout/Can";
import BookingFormUpdate from "../forms/bookings/BookingFormUpdate";
import { toTitleWords, api, getBookingStatus } from "../../../utils";
import { resources, actions, roles } from "../../../variables/enums";
import { RBAC } from "../../../config/rbac";
import ConfirmDialog from "../../presentational/forms/ConfirmDialog";
import BookingFinalizeForm from "../forms/bookings/BookingFinalizeForm";

function BookingTableView({
	bookings,
	vehicles,
	auth,
	users,
	fetchBookings,
	onSubmit
}) {
	const [open, setOpen] = useState(false);
	const [finalizeDialogOpen, setFinalizeDialogOpen] = useState(false);
	const [confirmPaymentData, setConfirmPaymentData] = useState({
		disabled: false,
		open: false,
		title: "Confirm that booking is paid?",
		bookingId: null
	});
	const [tableBody, setTableBody] = useState([]);
	const [formData, setFormData] = useState({});
	const [actionStatus, setActionStatus] = useState([]);
	const [finalizeFormData, setFinalizeFormData] = useState({});

	const [filters, setFilters] = useState({
		global: "",
		index: ["", "", "", "", "", ""]
	});
	useEffect(() => {
		const resetActionStatus = async () => {
			if (auth && auth.data && bookings && bookings.data) {
				let userRole = auth.data.role.name;
				let actionStatus = [];
				if (bookings && bookings.data) {
					for (let booking of bookings.data) {
						let expiredBooking = booking.from < moment().unix();
						let showApprove =
							booking.approved === null &&
							!expiredBooking &&
							(await RBAC.can(userRole, actions.UPDATE, resources.BOOKINGS));
						let showDeny =
							booking.approved === null &&
							!expiredBooking &&
							(await RBAC.can(userRole, actions.UPDATE, resources.BOOKINGS));

						// Delete only non approved booking
						let showDelete = !booking.approved;

						// Update only non approved and pending and not yet finalized
						let showUpdate =
							booking.approved === null ||
							(booking.approved === true && booking.amount === null);

						// Finalize only approved && no payment amount given
						let showFinalize = booking.approved && booking.amount === null;

						// Show only finalized
						let showPay =
							booking.approved && booking.amount !== null && !booking.paid;

						actionStatus.push({
							isDisabled: false,
							showApprove,
							showDeny,
							showDelete,
							showUpdate,
							showFinalize,
							showPay
						});
					}
				}
				setActionStatus(actionStatus);
			}
		};
		resetActionStatus();
	}, [auth, bookings]);

	useEffect(() => {
		if (
			bookings &&
			bookings.data &&
			vehicles &&
			vehicles.data &&
			users &&
			users.data &&
			auth &&
			auth.data
		) {
			const updateTableBody = async () => {
				let tableBody = [];
				for (const [index, booking] of bookings.data.entries()) {
					let accessible = await RBAC.can(
						auth.data.role.name,
						actions.READ,
						resources.BOOKINGS,
						{ booking, user: auth.data }
					);
					if (accessible) {
						let bookingVehicle = vehicles.data.find(
							vehicle => vehicle.id === booking.vehicleId
						);
						let bookingStatus = toTitleWords(getBookingStatus(booking));

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
									value: `${bookingVehicle.brand} ${bookingVehicle.model} - ${
										bookingVehicle.plateNumber
									}`
								},
								{
									value: moment(booking.from, "X"),
									map: date => date.format("YYYY/MM/DD HH:mm:ss")
								},
								{
									value: moment(booking.to, "X"),
									map: date => date.format("YYYY/MM/DD HH:mm:ss")
								},
								{
									value: bookingStatus
								}
							]
						};
						if (showBookingActions) {
							row.values.push({
								value: (
									<BookingActions
										showApprove={
											actionStatus[index]
												? actionStatus[index].showApprove
												: false
										}
										showDeny={
											actionStatus[index] ? actionStatus[index].showDeny : false
										}
										showDelete={
											actionStatus[index]
												? actionStatus[index].showDelete
												: false
										}
										showUpdate={
											actionStatus[index]
												? actionStatus[index].showUpdate
												: false
										}
										showFinalize={
											actionStatus[index]
												? actionStatus[index].showFinalize
												: false
										}
										showPay={
											actionStatus[index] ? actionStatus[index].showPay : false
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
													fetchBookings();
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
													fetchBookings();
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
												fetchBookings();
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
										onFinalize={() => {
											let status = actionStatus;
											status[index].isDisabled = true;
											setActionStatus(status);
											api.fetchBooking(booking.id).then(res => {
												setFinalizeFormData({ ...res.data, amount: 0 });
												setFinalizeDialogOpen(true);
												status[index].isDisabled = false;
												setActionStatus(status);
												fetchBookings();
											});
										}}
										onPay={() => {
											let status = actionStatus;
											status[index].isDisabled = true;
											setActionStatus(status);
											api.fetchBooking(booking.id).then(res => {
												let vehicle = vehicles.data.find(
													vehicle => vehicle.id === booking.vehicleId
												);
												let user = users.data.find(
													user => booking.userId === user.id
												);
												setConfirmPaymentData({
													...confirmPaymentData,
													bookingId: booking.id,
													open: true,
													content: `Booking for user ${user.firstName} ${
														user.lastName
													} on vehicle ${vehicle.brand} ${vehicle.model} - ${
														vehicle.plateNumber
													} will be marked as paid.`
												});
												status[index].isDisabled = false;
												setActionStatus(status);
												fetchBookings();
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
						tableBody.push(row);
					}
				}
				setTableBody(tableBody);
			};
			updateTableBody();
		}
	}, [actionStatus, bookings, vehicles, users, auth]);

	const handleFilter = (index, value) => e => {
		let newIndexFilters = filters.index;
		newIndexFilters[index] = value !== undefined ? value : e.target.value;
		setFilters({ global: filters.global, index: newIndexFilters });
	};

	let tableHeaders = [
		{
			values: [
				{
					value: (
						<TextField
							onChange={handleFilter(0)}
							value={filters.index[0]}
							label="Filter"
						/>
					)
				},
				{
					value: (
						<TextField
							onChange={handleFilter(1)}
							value={filters.index[1]}
							label="Filter"
						/>
					)
				},
				{
					value: (
						<TextField
							onChange={handleFilter(2)}
							value={filters.index[2]}
							label="Filter"
						/>
					)
				},
				{
					value: (
						<TextField
							onChange={handleFilter(3)}
							value={filters.index[3]}
							label="Filter"
						/>
					)
				},
				{
					value: (
						<TextField
							onChange={handleFilter(4)}
							value={filters.index[4]}
							label="Filter"
						/>
					)
				},
				{
					value: (
						<TextField
							onChange={handleFilter(5)}
							value={filters.index[5]}
							label="Filter"
						/>
					)
				}
			]
		},
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

	if (showBookingActions) {
		tableHeaders[1].values.push({ value: "Actions" });
	}

	return (
		<Fragment>
			<ConfirmDialog
				title={confirmPaymentData.title}
				content={confirmPaymentData.content}
				open={confirmPaymentData.open}
				disabled={confirmPaymentData.disabled}
				onClose={() => setConfirmPaymentData(false)}
				yes={() => {
					setConfirmPaymentData({ ...confirmPaymentData, disabled: true });
					api
						.updateBooking({ id: confirmPaymentData.bookingId, paid: true })
						.then(() => {
							setConfirmPaymentData({
								...confirmPaymentData,
								open: false,
								disabled: false
							});
							fetchBookings();
						});
				}}
				no={() => setConfirmPaymentData({ ...confirmPaymentData, open: false })}
			/>
			<Dialog
				open={finalizeDialogOpen}
				onClose={() => setFinalizeDialogOpen(false)}
			>
				<DialogContent>
					<BookingFinalizeForm
						values={finalizeFormData}
						onChange={setFinalizeFormData}
						onSubmit={() => {
							setFinalizeFormData({});
							setFinalizeDialogOpen(false);
							fetchBookings();
						}}
					/>
				</DialogContent>
			</Dialog>
			<TableView
				filter={filters}
				exclude={
					auth && auth.data && auth.data.role.name === roles.GUEST ? [0] : []
				}
				open={open}
				onClose={() => setOpen(false)}
				editable={true}
				tableData={{
					headers: tableHeaders,
					body: tableBody
				}}
			>
				{auth && auth.data && formData.id && (
					<Can
						action={actions.READ}
						resource={resources.BOOKINGS}
						params={{ user: auth.data.role.name, booking: formData }}
						yes={readAccess => (
							<Can
								action={actions.UPDATE}
								resource={resources.BOOKINGS}
								yes={access => {
									return (
										<BookingFormUpdate
											values={formData}
											onChange={setFormData}
											exclude={readAccess.excludedFields}
											readOnly={access.excludedFields}
											allowBefore={true}
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
										exclude={readAccess.excludedFields}
										hints=""
									/>
								)}
							/>
						)}
					/>
				)}
			</TableView>
		</Fragment>
	);
}

const mapStateToProps = ({ bookings, vehicles, enums, auth, users }) => ({
	users,
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
