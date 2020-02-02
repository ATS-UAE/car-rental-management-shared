import React, { FC, useState } from "react";
import moment from "moment";
import * as actions from "../../actions";
import {
	FormBookingUpdate as FormBookingUpdatePresentational,
	FormBookingUpdateData
} from "../presentational";
import { BookingType } from "../../variables/enums";
import { ReduxState, Booking } from "../../typings";
import { connect, ResolveThunks } from "react-redux";
import { api, FormErrors } from "../../utils";

interface FormBookingUpdateState {
	auth: ReduxState["auth"];
	bookings: ReduxState["bookings"];
}

export interface FormBookingUpdateProps {
	booking: Booking;
}

type Props = FormBookingUpdateProps &
	FormBookingUpdateState &
	ResolveThunks<typeof actions>;

const FormBookingUpdateBase: FC<Props> = ({
	fetchBookings,
	auth,
	bookings,
	booking
}) => {
	const [errorNotes, setFormErrors] = useState<string[]>([]);
	const [errors, setErrors] = useState<any>({});
	const [values, setValues] = useState<any>({
		from: moment()
			.subtract(1, "day")
			.unix(),
		to: moment()
			.add(1, "day")
			.unix(),
		userId: 1,
		vehicleId: 2,
		bookingType: BookingType.BUSINESS
	});
	const [touched, setTouched] = useState<any>({});

	const handleSubmit = async () => {
		try {
			await api.updateBooking({ id: booking.id, ...values });
		} catch (e) {
			const fieldErrors = FormErrors.handleFormApiErrors<FormBookingUpdateData>(
				e
			);

			setErrors(fieldErrors.fieldErrors);
			setFormErrors(fieldErrors.formErrors);
		}
		await fetchBookings();
	};

	return (
		<FormBookingUpdatePresentational
			errors={errors}
			values={values}
			onChange={(values, errors) => {
				setValues(values);
				setErrors(errors);
			}}
			onFieldTouch={touched => {
				setTouched(touched);
			}}
			touched={touched}
			errorNotes={errorNotes}
			vehicleList={[{ label: "Pajero", value: 2 }]}
			userList={[{ label: "Ramil", value: 1 }]}
			onSubmit={handleSubmit}
		/>
	);
};

const mapStateToProps = ({ bookings, auth }: ReduxState) => ({
	bookings,
	auth
});

export const FormBookingUpdate = connect(
	mapStateToProps,
	actions
)(FormBookingUpdateBase);
