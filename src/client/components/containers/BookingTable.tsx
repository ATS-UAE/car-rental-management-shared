import React, { FC, useState } from "react";
import { connect, ResolveThunks, MapStateToProps } from "react-redux";
import { RouteChildrenProps, withRouter } from "react-router";
import moment from "moment";
import { compose } from "recompose";
import {
	BookingTable as BookingTablePresentational,
	BookingTableItemData
} from "../presentational";
import { BookingType, Role } from "../../../shared/typings";
import { BOOKING_TABLE_DATA } from "../../fixtures";
import * as actions from "../../actions";
import { ReduxState } from "../../reducers";
import { Booking } from "../../api";

interface BookingTableStateProps {
	bookings: ReduxState["bookings"];
	users: ReduxState["users"];
	auth: ReduxState["auth"];
}

type BookingTableActionProps = ResolveThunks<typeof actions>;

type Props = BookingTableStateProps &
	BookingTableActionProps &
	RouteChildrenProps;

const BookingTableBase: FC<Props> = ({
	bookings,
	history,
	users,
	auth,
	fetchBookings
}) => {
	// TODO: Redirect if action route is invalid.
	const [isFetchingData, setIsFetchingData] = useState(false);

	const isLoading = isFetchingData || bookings === null;
	const tableData: BookingTableItemData[] =
		(auth &&
			auth.data &&
			bookings &&
			bookings.data.map<BookingTableItemData>(b => {
				const foundUser = users && users.data.find(u => u.id === b.userId);
				const username =
					auth.data.id === b.userId
						? auth.data.username
						: (foundUser && foundUser.username) || "Unknown User";

				return {
					amount: b.amount,
					approved: b.approved,
					bookingType: b.bookingType,
					createdAt: b.createdAt,
					finished: b.finished,
					from: b.from,
					id: b.id,
					paid: b.paid,
					to: b.to,
					username,
					vehicle: `${b.vehicle.plateNumber} - ${b.vehicle.model} ${b.vehicle.model}`
				};
			})) ||
		[];
	return (
		(auth && auth.data && (
			<BookingTablePresentational
				data={tableData}
				isLoading={isLoading}
				onApprove={async ({ id }) => {
					setIsFetchingData(true);
					try {
						const booking = await Booking.fromId(id);
						await booking.approve();
						await fetchBookings();
					} catch (e) {
						// TODO: Display modal to user.
						console.error(e);
					}
					setIsFetchingData(false);
				}}
				onDeny={async ({ id }) => {
					setIsFetchingData(true);
					try {
						await Booking.approve(id);
						await fetchBookings();
					} catch (e) {
						// TODO: Display modal to user.
						console.error(e);
					}
					setIsFetchingData(false);
				}}
				onUpdate={({ id }) => {
					history.push(`/bookings/edit/${id}`);
				}}
				onDelete={({ id }) => {
					history.push(`/bookings/delete/${id}`);
				}}
				onFinalize={({ id }) => {
					history.push(`/bookings/finalize/${id}`, {
						background: true
					});
				}}
				onRefresh={async () => {
					setIsFetchingData(true);
					try {
						await fetchBookings();
					} catch (e) {
						// TODO: Display modal to user.
						console.error(e);
					}
					setIsFetchingData(false);
				}}
				onPay={({ id }) => {
					history.push(`/bookings/pay/${id}`);
				}}
				role={auth.data.role}
			/>
		)) ||
		null
	);
};

const mapStateToProps: MapStateToProps<
	BookingTableStateProps,
	{},
	ReduxState
> = ({ bookings, users, auth }) => ({ bookings, users, auth });

export const BookingTable = compose<Props, {}>(
	connect(mapStateToProps, actions)
)(BookingTableBase);
