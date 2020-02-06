import React, { FC, useState, useEffect } from "react";
import moment from "moment";
import { connect, ResolveThunks, MapStateToProps } from "react-redux";
import { withRouter, RouteChildrenProps } from "react-router";
import { compose } from "recompose";
import { Booking } from "../../api";
import {
	FormFinalizeBooking,
	Modal,
	FormFinalizeBookingValues,
	TouchedFields,
	FormError
} from "../presentational";
import { ReduxState } from "../../typings";
import * as actions from "../../actions";

interface ModalFinalizeBookingStateProps {
	auth: ReduxState["auth"];
	users: ReduxState["users"];
}

type ModalFinalizeBookingActionProps = ResolveThunks<typeof actions>;

type Props = ModalFinalizeBookingStateProps &
	ModalFinalizeBookingActionProps &
	RouteChildrenProps<{ id: string }, {}>;

const ModalFinalizeBookingBase: FC<Props> = ({
	match,
	history,
	auth,
	users,
	fetchBookings
}: Props) => {
	const [booking, setBooking] = useState<Booking | undefined>();
	const [values, setValues] = useState<FormFinalizeBookingValues | undefined>();
	const [errors, setErrors] = useState<FormError<FormFinalizeBookingValues>>();
	const [touched, setTouched] = useState<
		TouchedFields<FormFinalizeBookingValues>
	>();
	const [isLoading, setLoading] = useState<boolean>(false);
	const bookingId = match?.params.id;

	const booker =
		booking && auth && auth.data.id === booking.data.userId
			? auth.data
			: users && users.data.find(u => u.id === booking?.data.userId);

	useEffect(() => {
		if (!bookingId) {
			history.push("/bookings");
		} else {
			Booking.fromId(Number(bookingId))
				.then(b => {
					setBooking(b);
					setValues({
						amount: b.data.amount || 0
					});
				})
				.catch(e => {
					// TODO use error modal.
					console.error(e);
					history.push("/bookings");
				});
		}
	}, []);

	return (
		<Modal
			loading={values === undefined}
			onClose={() => history.push("/bookings")}
		>
			{booker && booking && (
				<FormFinalizeBooking
					// Cast because children will not load if values is undefined.
					values={values as FormFinalizeBookingValues}
					onChange={(values, errors) => {
						setValues(values);
						setErrors(errors);
					}}
					onCancel={() => {
						history.push("/bookings");
					}}
					from={moment(booking.data.from, "X").toDate()}
					to={moment(booking.data.to, "X").toDate()}
					bookingType={booking.data.bookingType || "Unknown"}
					vehicle={`${booking.data.vehicle?.plateNumber} - ${booking.data.vehicle?.brand} ${booking.data.vehicle?.model}`}
					user={booker.username}
					errors={errors}
					touched={touched}
					onFieldTouch={setTouched}
					loading={isLoading}
					onSubmit={async () => {
						setLoading(true);
						try {
							values && booking.finalize(values.amount);
						} catch (e) {
							console.error(e);
							// TODO: SHow error in modal.
						}
						setLoading(false);
						fetchBookings();
						history.replace("/bookings");
					}}
				/>
			)}
		</Modal>
	);
};

const mapStateToProps: MapStateToProps<
	ModalFinalizeBookingStateProps,
	{},
	ReduxState
> = ({ auth, users }) => ({
	auth,
	users
});

export const ModalFormFinalizeBooking = compose<Props, {}>(
	withRouter,
	connect(mapStateToProps, actions)
)(ModalFinalizeBookingBase);
