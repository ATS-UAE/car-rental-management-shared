import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import moment from "moment";
import MaterialTable from "material-table";
import { Route, withRouter, Switch } from "react-router-dom";
import * as reduxActions from "../../../actions";
import Dialog from "../../presentational/display/Dialog";
import { DialogChildren } from "../../presentational/forms/ConfirmDialog";
import Can from "../layout/Can";
import BookingFormUpdate from "../forms/bookings/BookingFormUpdate";
import BookingForm from "../forms/bookings/BookingForm";
import {
	toTitleWords,
	api,
	getBookingStatus,
	getRelatedDataById
} from "../../../utils";
import { resources, actions, roles } from "../../../variables/enums";
import { RBAC } from "../../../config/rbac";
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
		bookingData: null,
		bookingActions: [],
		loadingRows: [],
		finalizeFormData: {},
		open: false,
		formData: null,
		finalizeDialogOpen: false,
		isLoading: false,
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
		const { history } = this.props;
		const { loadingRows } = this.state;
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
				const rowStatus = loadingRows.indexOf(booking.id);
				return {
					icon: ThumbUp,
					tooltip: "Approve",
					hidden: !visible,
					disabled: rowStatus >= 0,

					onClick: (event, { booking }) => {
						this.setState({
							loadingRows: [...loadingRows, booking.id]
						});
						api.updateBooking({ id: booking.id, approved: true }).then(() => {
							this.props.fetchBookings().then(() => {
								const rowStatusIndex = loadingRows.indexOf(booking.id);
								if (rowStatusIndex >= 0) {
									const newStatus = [...loadingRows];
									newStatus.splice(rowStatusIndex, 1);
									this.setState({
										loadingRows: newStatus
									});
								}
							});
						});
					}
				};
			},
			({ booking }) => {
				let expiredBooking = booking.from < moment().unix();
				const visible =
					booking.approved === null && !expiredBooking && canUpdate;

				const rowStatus = loadingRows.indexOf(booking.id);
				return {
					icon: ThumbDown,
					tooltip: "Deny",
					hidden: !visible,
					disabled: rowStatus >= 0,

					onClick: (event, { booking }) => {
						this.setState({
							loadingRows: [...loadingRows, booking.id]
						});
						api.updateBooking({ id: booking.id, approved: false }).then(() => {
							this.props.fetchBookings().then(() => {
								const rowStatusIndex = loadingRows.indexOf(booking.id);
								if (rowStatusIndex >= 0) {
									const newStatus = [...loadingRows];
									newStatus.splice(rowStatusIndex, 1);
									this.setState({
										loadingRows: newStatus
									});
								}
							});
						});
					}
				};
			},
			({ booking }) => {
				const visible = !booking.approved;
				const rowStatus = loadingRows.indexOf(booking.id);
				return {
					icon: Delete,
					tooltip: "Delete",
					hidden: !visible,
					disabled: rowStatus >= 0,
					onClick: (event, { booking }) => {
						history.push(`/bookings/${booking.id}/delete`);
					}
				};
			},
			({ booking }) => {
				const visible =
					booking.approved === null ||
					(booking.approved === true && booking.amount === null);
				const rowStatus = loadingRows.indexOf(booking.id);
				return {
					icon: Edit,
					tooltip: "Update",
					hidden: !visible,
					disabled: rowStatus >= 0,

					onClick: (event, { booking }) => {
						history.push(`/bookings/${booking.id}/edit`);
					}
				};
			},
			({ booking }) => {
				const visible = booking.approved && booking.amount === null;
				const rowStatus = loadingRows.indexOf(booking.id);
				return {
					icon: Check,
					tooltip: "Finalize",
					hidden: !visible,
					disabled: rowStatus >= 0,

					onClick: (event, { booking }) => {
						history.push(`/bookings/${booking.id}/finalize`);
					}
				};
			},
			({ booking }) => {
				const visible =
					booking.approved && booking.amount !== null && !booking.paid;
				const rowStatus = loadingRows.indexOf(booking.id);
				return {
					icon: Payment,
					tooltip: "Mark as paid",
					hidden: !visible,
					disabled: rowStatus >= 0,

					onClick: (event, { booking }) => {
						history.push(`/bookings/${booking.id}/pay`);
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
		const { history, auth, fetchBookings } = this.props;
		const {
			formData,
			isLoading,
			bookingData,
			bookingColumns,
			bookingActions
		} = this.state;

		const renderDialog = ({ match, children }) => (
			<Dialog
				onMount={async () => {
					try {
						const booking = await api
							.fetchBooking(match.params.id)
							.catch(() => history.replace("/bookings"));
						const vehicle = await api
							.fetchVehicle(booking.data.vehicleId)
							.catch(() => history.replace("/bookings"));
						const location = await api
							.fetchLocation(vehicle.data.locationId)
							.catch(() => history.replace("/bookings"));

						const read = {
							access: await RBAC.can(
								auth.data.role.name,
								actions.READ,
								resources.BOOKINGS,
								{ booking, user: auth.data }
							),
							excluded: RBAC.getExcludedFields(
								auth.data.role.name,
								actions.UPDATE,
								resources.BOOKINGS
							)
						};

						const update = {
							access: await RBAC.can(
								auth.data.role.name,
								actions.UPDATE,
								resources.BOOKINGS
							),
							exclude: RBAC.getExcludedFields(
								auth.data.role.name,
								actions.UPDATE,
								resources.BOOKINGS
							)
						};

						const destroy = {
							access: await RBAC.can(
								auth.data.role.name,
								actions.DELETE,
								resources.BOOKINGS
							)
						};

						const create = {
							access: await RBAC.can(
								auth.data.role.name,
								actions.READ,
								resources.BOOKINGS
							),
							exclude: RBAC.getExcludedFields(
								auth.data.role.name,
								actions.READ,
								resources.BOOKINGS
							)
						};

						return {
							booking,
							vehicle,
							location,
							create,
							read,
							update,
							destroy
						};
					} catch (e) {
						history.replace("/bookings");
					}
				}}
				onClose={() => {
					history.push("/bookings");
					this.setState({ formData: null });
				}}
				open={true}
				children={children}
			/>
		);

		return (
			<Fragment>
				<Switch>
					<Route
						path="/bookings/:id/edit"
						render={({ match }) =>
							renderDialog({
								match,
								children: async ({ booking, read, update, location }) => {
									if (
										booking &&
										(booking.data.amount !== null || booking.data.paid)
									) {
										history.replace("/bookings");
									} else {
										if (formData === null && booking)
											this.setState({
												formData: {
													...booking.data,
													locationId: location.data.id
												}
											});

										if (auth && formData && read && update && update.access) {
											return (
												<BookingFormUpdate
													values={formData}
													onChange={formData =>
														this.setState({
															formData
														})
													}
													exclude={read.access.exclude}
													readOnly={update.access.exclude}
													allowBefore={true}
													onSubmit={() => {
														this.setState({
															formData: null
														});
														fetchBookings().then(() => {
															history.replace("/bookings");
														});
													}}
												/>
											);
										} else if (update && !update.access)
											history.replace("/bookings");
									}

									return null;
								}
							})
						}
					/>
					<Route
						path="/bookings/:id/delete"
						render={({ match }) =>
							renderDialog({
								match,
								children: ({ booking, destroy }) => {
									if (
										booking &&
										(booking.data.amount !== null || booking.data.paid)
									) {
										history.replace("/bookings");
									} else {
										if (booking && destroy && destroy.access) {
											return (
												<DialogChildren
													onUnmount={() => {
														this.setState({
															isLoading: false
														});
													}}
													title={`Delete booking #${booking.data.id}?`}
													content={"This action cannot be reversed."}
													disabled={isLoading}
													yes={() => {
														this.setState({
															isLoading: true
														});
														api
															.deleteBooking({
																id: booking.data.id
															})
															.then(() => {
																fetchBookings().then(() => {
																	this.setState({
																		isLoading: false
																	});
																	history.push("/bookings");
																});
															});
													}}
													no={() => history.push("/bookings")}
												/>
											);
										} else if (destroy && !destroy.access) {
											history.replace("/bookings");
										}
									}

									return null;
								}
							})
						}
					/>
					<Route
						path="/bookings/:id/finalize"
						render={({ match }) =>
							renderDialog({
								match,
								children: async ({ booking, read, location }) => {
									// Check if booking is already finalized.
									if (booking.data.amount !== null) {
										history.replace("/bookings");
									} else if (formData === null && booking) {
										this.setState({
											formData: {
												...booking.data,
												locationId: location.data.id,
												amount:
													booking.data.amount === null
														? undefined
														: booking.amount
											}
										});

										if (auth && formData && read && read.access) {
											return (
												<BookingFinalizeForm
													values={formData}
													onChange={formData => this.setState({ formData })}
													onSubmit={() => {
														this.setState({
															formData: null
														});
														fetchBookings().then(() => {
															history.replace("/bookings");
														});
													}}
												/>
											);
										} else if (read && !read.access)
											history.replace("/bookings");
									}
									return null;
								}
							})
						}
					/>
					<Route
						path="/bookings/:id/pay"
						render={({ match }) =>
							renderDialog({
								match,
								children: ({ booking, update }) => {
									if (booking && booking.data.paid) {
										history.replace("/bookings");
									} else if (booking && update && update.access) {
										return (
											<DialogChildren
												onUnmount={() => {
													this.setState({
														isLoading: false
													});
												}}
												title={`Confirm payment on booking #${booking.data.id}`}
												content={"This booking will be marked as paid."}
												disabled={isLoading}
												yes={() => {
													this.setState({
														isLoading: true
													});
													api
														.updateBooking({
															id: booking.data.id,
															paid: true
														})
														.then(() => {
															fetchBookings().then(() => {
																this.setState({
																	isLoading: false
																});
																history.replace("/bookings");
															});
														});
												}}
												no={() => history.replace("/bookings")}
											/>
										);
									} else if (update && !update.access) {
										history.replace("/bookings");
									}
									return null;
								}
							})
						}
					/>
					<Route
						path="/bookings/:id"
						render={({ match }) =>
							renderDialog({
								match,
								children: async ({ booking, read, location }) => {
									if (formData === null && booking)
										this.setState({
											formData: {
												...booking.data,
												locationId: location.data.id
											}
										});

									if (auth && formData && read && read.access) {
										return (
											<BookingForm
												values={formData}
												readOnly={true}
												allowBefore={true}
												exclude={read.exclude}
												hints=""
												title={`Booking #${formData.id}`}
											/>
										);
									} else if (read && !read.access) history.replace("/bookings");
									return null;
								}
							})
						}
					/>
				</Switch>
				<MaterialTable
					isLoading={bookingData === null}
					icons={tableIcons}
					columns={bookingColumns}
					data={bookingData || []}
					title="Bookings"
					options={{
						filtering: true,
						grouping: true,
						columnsButton: true,
						pageSizeOptions: [1, 5, 10, 20, 50, 100, 200, 500, 1000],
						exportButton: true
					}}
					actions={bookingActions}
				/>
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
