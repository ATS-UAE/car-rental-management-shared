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
	FieldErrors
} from "../presentational";
import { ReduxState } from "../../reducers";
import * as actions from "../../actions";
import { formBookingPickupSchema } from "../presentational/FormBookingPickup";
import { FormErrors } from "../../utils";

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
	const [errors, setErrors] = useState<FieldErrors<FormFinalizeBookingValues>>(
		{}
	);
	const [errorNotes, setErrorNotes] = useState<string[]>([]);
	const [currentMileageCounter, setCurrentMileageCounter] = useState<number>();
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
				.then(async b => {
					setBooking(b);
					const values: FormFinalizeBookingValues = {
						amount: b.data.amount || 0,
						endFuel: b.data.endFuel || undefined,
						endMileage: b.data.endMileage || undefined,
						startFuel: b.data.startFuel || undefined,
						startMileage: b.data.startMileage || undefined,
						returnDate:
							(b.data.returnDate && moment(b.data.returnDate, "X").toDate()) ||
							undefined,
						pickupDate:
							(b.data.pickupDate && moment(b.data.pickupDate, "X").toDate()) ||
							undefined,
						returned: Boolean(b.data.pickupDate)
					};
					try {
						const wialonData = await Booking.getVehicleWialonData(b.data.id);
						if (wialonData?.data.mileage) {
							setCurrentMileageCounter(wialonData.data.mileage);
						}
					} catch (e) {
						// TODO: user error modal.
						console.error(e);
					}
					setValues(values);
				})
				.catch(e => {
					// TODO use error modal.
					console.error(e);
					history.push("/bookings");
				});
		}
	}, [bookingId, history]);

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
					errorNotes={errorNotes}
					currentMileageCounter={currentMileageCounter}
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
							console.log(values);
							values &&
								(await booking.finalize({
									...values,
									pickupDate:
										values.pickupDate && moment(values.pickupDate).unix(),
									returnDate: values.returned
										? values.pickupDate && moment(values.pickupDate).unix()
										: null
								}));
							history.replace("/bookings");
						} catch (e) {
							const apiErrors = FormErrors.handleAxiosError<
								FormFinalizeBookingValues
							>(e);
							setErrors({ ...errors, ...apiErrors.fieldErrors });
							setErrorNotes(apiErrors.formErrors);

							// TODO: SHow error in modal.
						}
						setLoading(false);
						fetchBookings();
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
