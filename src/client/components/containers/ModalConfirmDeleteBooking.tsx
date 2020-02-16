import React, { FC, useState, useEffect } from "react";
import { connect, ResolveThunks } from "react-redux";
import { compose } from "recompose";
import { RouteChildrenProps, withRouter } from "react-router";
import { ModalConfirm } from "../presentational";
import { Booking } from "../../api";
import * as actions from "../../actions";

type Props = RouteChildrenProps<{ id?: string }, {}> &
	ResolveThunks<typeof actions>;

const ModalConfirmDeleteBookingBase: FC<Props> = ({
	history,
	match,
	fetchBookings
}) => {
	const bookingId = match?.params.id;
	const [loading, setLoading] = useState<boolean>(false);
	useEffect(() => {
		if (!bookingId) {
			history.push("/bookings");
		}
	}, []);

	return (
		<ModalConfirm
			content={`Are you sure you want to delete booking #${bookingId}?`}
			title="Deleting..."
			loading={loading}
			yes={async () => {
				setLoading(true);
				if (bookingId) {
					try {
						await Booking.destroy(Number(bookingId));
						fetchBookings();
					} catch (e) {
						// TODO: show error in modal.
						console.error(e);
					}
				}
				setLoading(false);
				history.push("/bookings");
			}}
			no={() => {
				history.push("/bookings");
			}}
		/>
	);
};

export const ModalConfirmDeleteBooking = compose<Props, {}>(
	connect(null, actions),
	withRouter
)(ModalConfirmDeleteBookingBase);
