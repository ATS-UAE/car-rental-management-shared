import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import classNames from "classnames";
import moment from "moment";
import { Button, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import * as actions from "../../../actions";
import TableView from "../../presentational/forms/TableView";
import Can from "../layout/Can";
import BookingForm from "../../presentational/forms/BookingForm";
import { toTitleWords, api } from "../../../utils";
import { RESOURCES, ACTIONS, ROLES } from "../../../variables";

const styles = theme => ({
	actionButton: {
		padding: theme.spacing.unit,
		height: "auto",
		color: "white"
	},
	actionButtonApprove: {
		marginBottom: theme.spacing.unit,
		background: "#11cb5f"
	},
	actionButtonReject: {
		background: "#FE6B8B"
	}
});

const BookingActions = withStyles(styles)(function({
	onApprove,
	onDeny,
	isDisabled,
	classes
}) {
	return (
		<Fragment>
			<Button
				className={classNames(
					classes.actionButton,
					classes.actionButtonApprove
				)}
				disabled={isDisabled}
				onClick={onApprove}
				type="submit"
				variant="contained"
				color="primary"
				fullWidth
			>
				Approve
			</Button>
			<Button
				className={classNames(classes.actionButton, classes.actionButtonReject)}
				onClick={onDeny}
				disabled={isDisabled}
				type="submit"
				variant="contained"
				color="secondary"
				fullWidth
			>
				Deny
			</Button>
		</Fragment>
	);
});

function BookingTableView({
	bookings,
	vehicles,
	enums,
	auth,
	fetchEnums,
	fetchBookings,
	fetchVehicles,
	fetchCurrentUserDetails,
	onSubmit
}) {
	const [open, setOpen] = useState(false);
	const [formData, setFormData] = useState({});
	let [disableButton, setDisabledButton] = useState(false);
	let [errorNotes, setErrorNotes] = useState([]);
	let [errors, setErrors] = useState({});
	let [actionStatus, setActionStatus] = useState([]);

	useEffect(() => {
		let validForm = true;
		for (let key in errors) {
			if (errors[key].length) {
				validForm = false;
			}
		}
		setDisabledButton(!validForm);
	}, [errors, formData]);
	useEffect(() => {
		if (!bookings) {
			fetchBookings();
		}
		if (!enums) {
			fetchEnums();
		}

		if (!vehicles) {
			fetchVehicles();
		}
		if (!auth) {
			fetchCurrentUserDetails();
		}
	}, []);

	let bookingTypeList = [{ value: "", label: "Loading..." }];
	let vehicleList = [{ value: "", label: "No vehicles available" }];

	if (enums && enums.data) {
		let $bookingTypeList = enums.data.bookingTypes.map(item => ({
			value: item.id,
			label: toTitleWords(item.name)
		}));
		if ($bookingTypeList.length) {
			bookingTypeList = $bookingTypeList;
		}
	}
	if (vehicles && vehicles.data) {
		let $vehicleList = vehicles.data.map(vehicle => ({
			value: vehicle.id,
			label: `${vehicle.brand} ${vehicle.model} - ${vehicle.plateNumber}`
		}));
		if ($vehicleList.length) {
			vehicleList = $vehicleList;
		}
	}

	let showBookingActions = false;

	if (auth && auth.data) {
		if (auth.data.role.name !== ROLES.GUEST) {
			showBookingActions = true;
		}
	}

	let tableBody = [];
	let actions = [];
	if (bookings && bookings.data && vehicles && vehicles.data) {
		tableBody = bookings.data.map((booking, index) => {
			let bookingVehicle = vehicles.data.find(
				vehicle => vehicle.id === booking.vehicleId
			);
			let bookingStatus = "";

			if (booking.approved) {
				if (moment(booking.from, "X").isSameOrBefore(moment()))
					bookingStatus = "Ongoing";
				else bookingStatus = "Approved";
			} else {
				if (booking.approved === null) {
					if (moment(booking.from, "X").isSameOrBefore(moment()))
						bookingStatus = "Expired";
					else bookingStatus = "Pending";
				} else if (booking.approved === false) {
					bookingStatus = "Denied";
				}
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
				],
				onClick: () => {
					setOpen(true);
					api.fetchBooking(booking.id).then(res => {
						setFormData({
							...res.data,
							userId: res.data.user.id,
							bookingTypeId: res.data.bookingType.id,
							vehicleId: res.data.vehicle.id
						});
					});
				}
			};
			if (showBookingActions && booking.approved === null) {
				row.values.push({
					value: (
						<BookingActions
							onApprove={() => {
								let status = actionStatus;
								status[index] = true;
								setActionStatus(status);
								api
									.updateBooking({ id: booking.id, approved: true })
									.then(() => {
										let status = actionStatus;
										status[index] = false;
										setActionStatus(status);
										fetchBookings();
									});
							}}
							onDeny={() => {
								let status = actionStatus;
								status[index] = true;
								setActionStatus(status);
								api
									.updateBooking({ id: booking.id, approved: false })
									.then(() => {
										let status = actionStatus;
										status[index] = false;
										setActionStatus(status);
										fetchBookings();
									});
							}}
							isDisabled={
								actionStatus[index] === undefined ? true : actionStatus[index]
							}
						/>
					)
				});
			} else if (showBookingActions) {
				row.values.push({ value: "" });
			}
			actionStatus.push(false);
			return row;
		});
	}
	useEffect(() => {
		setActionStatus(actions);
	}, [bookings]);
	return (
		<Fragment>
			<Can
				action={ACTIONS.READ}
				resource={RESOURCES.BOOKINGS}
				params={{ booking: { userId: 1 }, user: { id: 1 } }}
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
										{ value: "Status" },
										(() => {
											if (showBookingActions) return { value: "Actions" };
										})()
									]
								}
							],
							body: tableBody
						}}
					>
						<Can
							action={ACTIONS.UPDATE}
							resource={RESOURCES.BOOKINGS}
							yes={access => {
								let footer = (
									<Grid item>
										<Button
											disabled={disableButton}
											type="submit"
											variant="contained"
											color="primary"
											onClick={e => {
												e.preventDefault();
												setDisabledButton(true);
												api
													.updateUser(formData)
													.then(() => {
														fetchBookings();
														onSubmit && onSubmit();
														setOpen(false);
														setDisabledButton(false);
													})

													.catch(e => {
														setErrorNotes([e]);
														setDisabledButton(false);
													});
											}}
										>
											Confirm
										</Button>
									</Grid>
								);
								return (
									<BookingForm
										values={formData}
										errors={errors}
										onError={setErrors}
										onChange={setFormData}
										errorNotes={errorNotes}
										vehicleList={vehicleList}
										bookingTypeList={bookingTypeList}
										exclude={access.excludedFields}
										hints=""
										footer={footer}
									/>
								);
							}}
							no={() => (
								<BookingForm
									values={formData}
									errors={errors}
									onError={setErrors}
									onChange={setFormData}
									errorNotes={errorNotes}
									vehicleList={vehicleList}
									bookingTypeList={bookingTypeList}
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
		actions
	)
)(BookingTableView);
