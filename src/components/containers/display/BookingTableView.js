import React, { Component, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import moment from "moment";
import { DialogContent, useTheme } from "@material-ui/core";
import MaterialTable from "material-table";
import { Route, withRouter } from "react-router-dom";
import * as reduxActions from "../../../actions";
import TableView from "../../presentational/forms/TableView";
import BookingActions from "../../presentational/inputs/BookingActions";
import Dialog from "../../presentational/display/Dialog";
import Can from "../layout/Can";
import BookingFormUpdate from "../forms/bookings/BookingFormUpdate";
import {
	toTitleWords,
	api,
	getBookingStatus,
	getRelatedDataById
} from "../../../utils";
import { resources, actions, roles } from "../../../variables/enums";
import { RBAC } from "../../../config/rbac";
import ConfirmDialog from "../../presentational/forms/ConfirmDialog";
import BookingFinalizeForm from "../forms/bookings/BookingFinalizeForm";
import AddBox from "@material-ui/icons/AddBox";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Delete from "@material-ui/icons/Delete";
import ThumbDown from "@material-ui/icons/ThumbDown";
import ThumbUp from "@material-ui/icons/ThumbUp";
import Payment from "@material-ui/icons/Payment";

const tableIcons = {
	Add: AddBox,
	Check: Check,
	Clear: Clear,
	Delete: DeleteOutline,
	DetailPanel: ChevronRight,
	Edit: Edit,
	Export: SaveAlt,
	Filter: FilterList,
	FirstPage: FirstPage,
	LastPage: LastPage,
	NextPage: ChevronRight,
	PreviousPage: ChevronLeft,
	ResetSearch: Clear,
	Search: Search,
	SortArrow: ArrowUpward,
	ThirdStateCheck: Remove,
	ViewColumn: ViewColumn
};

class BookingTableView extends Component {
	state = {
		bookingData: [],
		bookingActions: [],
		loadingRows: [],
		finalizeFormData: {},
		open: false,
		updateFormData: {},
		finalizeDialogOpen: false,
		confirmPaymentData: {
			disabled: false,
			open: false,
			title: "Confirm that booking is paid?",
			bookingId: null
		},
		bookingColumns: [
			{
				title: "ID",
				type: "numeric",
				field: "id"
			},
			{
				title: "Username",
				field: "username"
			},
			{
				title: "Vehicle",
				field: "vehicle"
			},
			{
				title: "Sent",
				type: "datetime",
				field: "createdAt"
			},
			{
				title: "Sent Year",
				field: "createdAtYear",
				hidden: true
			},
			{
				title: "Sent Month",
				field: "createdAtMonth",
				hidden: true
			},
			{
				title: "Sent Day",
				field: "createdAtDay",
				hidden: true
			},
			{
				title: "Start",
				type: "datetime",
				field: "from"
			},
			{
				title: "Start Year",
				field: "fromYear",
				hidden: true
			},
			{
				title: "Start Month",
				field: "fromMonth",
				hidden: true
			},
			{
				title: "Start Day",
				field: "fromDay",
				hidden: true
			},
			{
				title: "End",
				type: "datetime",
				field: "to"
			},
			{
				title: "End Year",
				field: "toYear",
				hidden: true
			},
			{
				title: "End Month",
				field: "toMonth",
				hidden: true
			},
			{
				title: "End Day",
				field: "toDay",
				hidden: true
			},
			{
				title: "Status",
				field: "status"
			}
		]
	};

	componentDidUpdate(prevProps, prevState) {
		const { auth, bookings, users, vehicles } = this.props;
		const { bookingColumns, loadingRows } = this.state;
		if (auth !== prevProps.auth) {
			// Hide columns for guest.
			if (auth && auth.data && auth.data.role.name === roles.GUEST) {
				let guestColumns = [...bookingColumns];
				guestColumns.splice(1, 1);
				this.setState({ bookingColumns: guestColumns });
			}
		}

		if (
			auth !== prevProps.auth ||
			bookings !== prevProps.bookings ||
			loadingRows !== prevState.loadingRows
		) {
			if (auth && auth.data && auth.data.role.name !== roles.GUEST) {
				// Set actions for users
				this.resetActions();
			}
		}

		if (
			bookings !== prevProps.bookings ||
			auth !== prevProps.auth ||
			users !== prevProps.users ||
			vehicles !== prevProps.vehicles ||
			loadingRows !== prevState.loadingRows
		) {
			this.reduceBookingData();
		}
	}

	resetActions = async () => {
		let userRole = this.props.auth.data.role.name;
		let canUpdate = await RBAC.can(
			userRole,
			actions.UPDATE,
			resources.BOOKINGS
		);
		const newActions = [
			({ booking }) => {
				let expiredBooking = booking.from < moment().unix();
				const visible =
					booking.approved === null && !expiredBooking && canUpdate;
				const rowStatus = this.state.loadingRows.indexOf(booking.id);
				return {
					icon: ThumbUp,
					tooltip: "Approve",
					hidden: !visible,
					disabled: rowStatus >= 0,

					onClick: (event, { booking }) => {
						this.setState({
							loadingRows: [...this.state.loadingRows, booking.id]
						});
						api.updateBooking({ id: booking.id, approved: true }).then(() => {
							const rowStatusIndex = this.state.loadingRows.indexOf(booking.id);
							if (rowStatusIndex >= 0) {
								const newStatus = [...this.state.loadingRows];
								newStatus.splice(rowStatusIndex, 1);
								this.setState({
									loadingRows: newStatus
								});
							}
							this.props.fetchBookings();
						});
					}
				};
			},
			({ booking }) => {
				let expiredBooking = booking.from < moment().unix();
				const visible =
					booking.approved === null && !expiredBooking && canUpdate;

				const rowStatus = this.state.loadingRows.indexOf(booking.id);
				return {
					icon: ThumbDown,
					tooltip: "Deny",
					hidden: !visible,
					disabled: rowStatus >= 0,

					onClick: (event, { booking }) => {
						this.setState({
							loadingRows: [...this.state.loadingRows, booking.id]
						});
						api.updateBooking({ id: booking.id, approved: false }).then(() => {
							const rowStatusIndex = this.state.loadingRows.indexOf(booking.id);
							if (rowStatusIndex >= 0) {
								const newStatus = [...this.state.loadingRows];
								newStatus.splice(rowStatusIndex, 1);
								this.setState({
									loadingRows: newStatus
								});
							}
							this.props.fetchBookings();
						});
					}
				};
			},
			({ booking }) => {
				const visible = !booking.approved;
				const rowStatus = this.state.loadingRows.indexOf(booking.id);
				return {
					icon: Delete,
					tooltip: "Delete",
					hidden: !visible,
					disabled: rowStatus >= 0,
					onClick: (event, { booking }) => {
						this.setState({
							loadingRows: [...this.state.loadingRows, booking.id]
						});
						api.deleteBooking({ id: booking.id }).then(() => {
							const rowStatusIndex = this.state.loadingRows.indexOf(booking.id);
							if (rowStatusIndex >= 0) {
								const newStatus = [...this.state.loadingRows];
								newStatus.splice(rowStatusIndex, 1);
								this.setState({
									loadingRows: newStatus
								});
							}
							this.props.fetchBookings();
						});
					}
				};
			},
			({ booking }) => {
				const visible =
					booking.approved === null ||
					(booking.approved === true && booking.amount === null);
				const rowStatus = this.state.loadingRows.indexOf(booking.id);
				return {
					icon: Edit,
					tooltip: "Update",
					hidden: !visible,
					disabled: rowStatus >= 0,

					onClick: (event, { booking }) => {
						this.setState({
							loadingRows: [...this.state.loadingRows, booking.id]
						});
						this.props.history.push(`/bookings/${booking.id}`);
					}
				};
			},
			({ booking }) => {
				const visible = booking.approved && booking.amount === null;
				const rowStatus = this.state.loadingRows.indexOf(booking.id);
				return {
					icon: Check,
					tooltip: "Finalize",
					hidden: !visible,
					disabled: rowStatus >= 0,

					onClick: (event, { booking }) => {
						this.setState({
							loadingRows: [...this.state.loadingRows, booking.id]
						});
						api.fetchBooking(booking.id).then(res => {
							this.setState({
								finalizeFormData: { ...res.data, amount: 0 }
							});
							this.setState({ finalizeDialogOpen: true });
							const rowStatusIndex = this.state.loadingRows.indexOf(booking.id);
							if (rowStatusIndex >= 0) {
								const newStatus = [...this.state.loadingRows];
								newStatus.splice(rowStatusIndex, 1);
								this.setState({
									loadingRows: newStatus
								});
							}
							this.props.fetchBookings();
						});
					}
				};
			},
			({ booking }) => {
				const visible =
					booking.approved && booking.amount !== null && !booking.paid;
				const rowStatus = this.state.loadingRows.indexOf(booking.id);
				return {
					icon: Payment,
					tooltip: "Mark as paid",
					hidden: !visible,
					disabled: rowStatus >= 0,

					onClick: (event, { booking }) => {
						this.setState({
							loadingRows: [...this.state.loadingRows, booking.id]
						});
						api.fetchBooking(booking.id).then(res => {
							let vehicle = this.props.vehicles.data.find(
								vehicle => vehicle.id === booking.vehicleId
							);
							let user = this.props.users.data.find(
								user => booking.userId === user.id
							);
							this.setState({
								confirmPaymentData: {
									...this.state.confirmPaymentData,
									bookingId: booking.id,
									open: true,
									content: `Booking for user ${user.firstName} ${
										user.lastName
									} on vehicle ${vehicle.brand} ${vehicle.model} - ${
										vehicle.plateNumber
									} will be marked as paid.`
								}
							});
							const rowStatusIndex = this.state.loadingRows.indexOf(booking.id);
							if (rowStatusIndex >= 0) {
								const newStatus = [...this.state.loadingRows];
								newStatus.splice(rowStatusIndex, 1);
								this.setState({
									loadingRows: newStatus
								});
							}
							this.props.fetchBookings();
						});
					}
				};
			}
		];
		this.setState({ bookingActions: newActions });
	};

	reduceBookingData = async () => {
		const { bookings, auth, vehicles, users } = this.props;
		if (
			bookings &&
			bookings.data &&
			auth &&
			auth.data &&
			vehicles &&
			vehicles.data &&
			users &&
			users.data
		) {
			let newBookingData = [];
			for (let booking of bookings.data) {
				let accessible = await RBAC.can(
					auth.data.role.name,
					actions.READ,
					resources.BOOKINGS,
					{ booking, user: auth.data }
				);
				if (accessible) {
					const vehicleData = getRelatedDataById(
						booking.vehicleId,
						vehicles.data
					);
					const userData = getRelatedDataById(booking.userId, users.data);
					const bookingSent = moment(booking.createdAt, "X");
					const bookingStart = moment(booking.from, "X");
					const bookingEnd = moment(booking.to, "X");
					newBookingData.push({
						id: booking.id,
						username: userData.username,
						vehicle: `${vehicleData.brand} ${vehicleData.model} - ${
							vehicleData.plateNumber
						}`,
						createdAt: bookingSent.toDate(),
						createdAtYear: bookingSent.year(),
						createdAtMonth: bookingSent.format("MMM"),
						createdAtDay: bookingSent.date(),
						from: bookingStart.toDate(),
						fromYear: bookingStart.year(),
						fromMonth: bookingStart.format("MMM"),
						fromDay: bookingStart.date(),
						to: bookingEnd.toDate(),
						toYear: bookingEnd.year(),
						toMonth: bookingEnd.format("MMM"),
						toDay: bookingEnd.date(),
						status: toTitleWords(getBookingStatus(booking)),
						booking
					});
				}
				this.setState({ bookingData: newBookingData });
			}
		}
	};
	render() {
		return (
			<Fragment>
				<Route
					path="/bookings/:id"
					render={props => {
						return (
							<Dialog
								onMount={() =>
									api
										.fetchBooking(props.match.params.id)
										.then(res => {
											this.setState({
												updateFormData: {
													...res.data,
													userId: res.data.user.id,
													bookingTypeId: res.data.bookingType.id,
													vehicleId: res.data.vehicle.id,
													locationId: res.data.vehicle.locationId
												}
											});
										})
										.catch(() => {
											this.props.history.push("/bookings");
										})
								}
								onClose={() => {
									const rowStatusIndex = this.state.loadingRows.findIndex(
										id => props.match.params.id == id
									);
									if (rowStatusIndex >= 0) {
										const newStatus = [...this.state.loadingRows];
										newStatus.splice(rowStatusIndex, 1);
										this.setState({
											loadingRows: newStatus
										});
									}
									this.props.history.push("/bookings");
								}}
								open={true}
							>
								{this.props.auth &&
								this.props.auth.data &&
								this.state.updateFormData.id ? (
									<Can
										action={actions.READ}
										resource={resources.BOOKINGS}
										params={{
											user: this.props.auth.data.role.name,
											booking: this.state.updateFormData
										}}
										yes={readAccess => (
											<Can
												action={actions.UPDATE}
												resource={resources.BOOKINGS}
												yes={access => {
													return (
														<BookingFormUpdate
															values={this.state.updateFormData}
															onChange={data =>
																this.setState({
																	updateFormData: data
																})
															}
															exclude={readAccess.excludedFields}
															readOnly={access.excludedFields}
															allowBefore={true}
															onSubmit={() => {
																this.setState({
																	updateFormData: {}
																});
																const rowStatusIndex = this.state.loadingRows.findIndex(
																	id => props.match.params.id == id
																);
																if (rowStatusIndex >= 0) {
																	const newStatus = [...this.state.loadingRows];
																	newStatus.splice(rowStatusIndex, 1);
																	this.setState({
																		loadingRows: newStatus
																	});
																}
																this.props.history.push("/bookings");
																this.props.onSubmit && this.props.onSubmit();
															}}
														/>
													);
												}}
												no={() => (
													<BookingFormUpdate
														values={this.state.updateFormData}
														onChange={data =>
															this.setState({
																updateFormData: data
															})
														}
														readOnly={true}
														exclude={readAccess.excludedFields}
														hints=""
													/>
												)}
											/>
										)}
									/>
								) : (
									"Loading..."
								)}
							</Dialog>
						);
					}}
				/>
				<MaterialTable
					icons={tableIcons}
					columns={this.state.bookingColumns}
					data={this.state.bookingData}
					title="Bookings"
					options={{
						filtering: true,
						grouping: true,
						columnsButton: true
					}}
					actions={this.state.bookingActions}
				/>
				<ConfirmDialog
					title={this.state.confirmPaymentData.title}
					content={this.state.confirmPaymentData.content}
					open={this.state.confirmPaymentData.open}
					disabled={this.state.confirmPaymentData.disabled}
					onClose={() =>
						this.setState({
							confirmPaymentData: {
								...this.state.confirmPaymentData,
								open: false
							}
						})
					}
					yes={() => {
						this.setState({
							confirmPaymentData: {
								...this.state.confirmPaymentData,
								disabled: true
							}
						});
						api
							.updateBooking({
								id: this.state.confirmPaymentData.bookingId,
								paid: true
							})
							.then(() => {
								this.setState({
									confirmPaymentData: {
										...this.state.confirmPaymentData,
										open: false,
										disabled: false
									}
								});
								this.props.fetchBookings();
							});
					}}
					no={() =>
						this.setState({
							confirmPaymentData: {
								...this.state.confirmPaymentData,
								open: false
							}
						})
					}
				/>
				<Dialog
					open={this.state.finalizeDialogOpen}
					onClose={() => this.setState({ finalizeDialogOpen: false })}
				>
					<DialogContent>
						<BookingFinalizeForm
							values={this.state.finalizeFormData}
							onChange={data => this.setState({ finalizeFormData: data })}
							onSubmit={() => {
								this.setState({ finalizeFormData: {} });
								this.setState({ finalizeDialogOpen: false });
								this.props.fetchBookings();
							}}
						/>
					</DialogContent>
				</Dialog>
			</Fragment>
		);
	}
}

const mapStateToProps = ({ bookings, vehicles, enums, auth, users }) => ({
	users,
	bookings,
	vehicles,
	enums,
	auth
});

export default compose(
	withRouter,
	connect(
		mapStateToProps,
		reduxActions
	)
)(BookingTableView);