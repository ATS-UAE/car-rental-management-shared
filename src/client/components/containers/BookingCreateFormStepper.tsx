import React, { FC, useState, useEffect } from "react";
import { withRouter, RouteChildrenProps } from "react-router";
import { compose } from "recompose";
import moment from "moment";
import {
	connect,
	MapStateToProps,
	MapDispatchToProps,
	ResolveThunks
} from "react-redux";
import * as actions from "../../actions";
import {
	BookingCreateFormStepper as BookingCreateFormStepperPresentational,
	BookingCreateFormStepperVehicleItem,
	BookingCreateFormStepperLocationItem,
	BookingCreateFormStepperValues,
	FormError,
	TouchedFields,
	FieldSelectItems
} from "../presentational";
import _ from "lodash";
import { ReduxState } from "../../reducers";
import { Role, BookingChargeUnit } from "../../../shared/typings";
import { RoleUtils } from "../../utils";
import { Booking, ServerQueryError } from "../../api";

interface BookingCreateFormStepperStateProps {
	vehicles: ReduxState["vehicles"];
	locations: ReduxState["locations"];
	auth: ReduxState["auth"];
	users: ReduxState["users"];
	bookings: ReduxState["bookings"];
}

type Props = BookingCreateFormStepperStateProps &
	ResolveThunks<typeof actions> &
	RouteChildrenProps;

const getVehicleCost = (
	bookingChargeCount: number,
	bookingCharge: number,
	bookingChargeUnit: BookingChargeUnit | null
): string | undefined => {
	if (bookingChargeUnit) {
		return `Cost: ${bookingCharge} Dhs per${
			bookingChargeCount === 1 ? " " : ` ${bookingChargeCount}`
		} ${bookingChargeUnit}`;
	}
};

export const BookingCreateFormStepperBase: FC<Props> = ({
	vehicles,
	locations,
	auth,
	users,
	bookings,
	fetchVehicles,
	fetchBookings,
	history
}) => {
	const [getAvailableVehicles] = useState<(from: number, to: number) => void>(
		() =>
			_.debounce((from: number, to: number) => {
				fetchVehicles(from, to);
				fetchBookings();
			}, 1000)
	);

	const [values, setValues] = useState<any>({
		from: moment().toDate(),
		to: moment()
			.add(1, "day")
			.toDate()
	});
	const role = (auth && auth.data && auth.data.role) || null;
	useEffect(() => {
		if (role && auth && auth.data && auth.data.role) {
			if (!RoleUtils.isRoleBetter(Role.KEY_MANAGER, role)) {
				setValues({ ...values, userId: auth.data.id });
			}
		}
	}, [auth]);

	const [errors, setErrors] = useState<
		FormError<BookingCreateFormStepperValues>
	>({});
	const [loading, setLoading] = useState<boolean>(false);
	const [errorNotes, setErrorNotes] = useState<string[]>([]);
	const [touched, setTouched] = useState<
		TouchedFields<BookingCreateFormStepperValues>
	>({
		from: true,
		to: true
	});

	const vehicleList: BookingCreateFormStepperVehicleItem[] =
		(auth &&
			vehicles &&
			vehicles.data &&
			vehicles.data
				.filter(v => {
					const user =
						auth.data.role === Role.GUEST
							? auth.data
							: values.userId &&
							  users &&
							  users.data.find(u => u.id === values.userId);
					return user && user.clientId === v.clientId;
				})
				.map(v => ({
					label: `${v.brand} ${v.model}`,
					plateNumber: v.plateNumber,
					id: v.id,
					locationId: v.locationId as number,
					cost: getVehicleCost(
						v.bookingChargeCount,
						v.bookingCharge,
						v.bookingChargeUnit
					)
				}))) ||
		[];
	const locationList: BookingCreateFormStepperLocationItem[] =
		(locations &&
			locations.data !== null &&
			locations.data.map(l => ({
				lat: l.lat,
				lng: l.lng,
				value: l.id,
				label: l.name
			}))) ||
		[];

	const userList: FieldSelectItems | undefined =
		(role &&
			RoleUtils.isRoleBetter(Role.KEY_MANAGER, role) &&
			users &&
			users.data &&
			users.data
				.filter(u => u.role === Role.GUEST)
				.map(u => ({
					label: u.username,
					value: u.id
				}))) ||
		undefined;

	return auth && auth.data && bookings && bookings.data && role ? (
		<BookingCreateFormStepperPresentational
			loading={loading}
			users={userList}
			onSubmit={async v => {
				setLoading(true);
				try {
					await Booking.create(v);
					history.replace("/bookings");
				} catch (e) {
					if (e instanceof ServerQueryError) {
						setErrors(e.fieldErrors);
						setErrorNotes(e.formErrors);
					} else {
						setErrorNotes(e.message);
					}
				}
				setLoading(false);
			}}
			bookings={bookings.data}
			values={values}
			vehicles={vehicleList}
			locations={locationList}
			onFieldTouch={setTouched}
			touched={touched}
			errors={errors}
			errorNotes={errorNotes}
			onChange={(values, errors) => {
				setValues(values);
				setErrors(errors);
				if (values.from && values.to) {
					getAvailableVehicles(
						moment(values.from).unix(),
						moment(values.to).unix()
					);
				}
			}}
		/>
	) : null;
};

const mapStateToProps: MapStateToProps<
	BookingCreateFormStepperStateProps,
	{},
	ReduxState
> = ({ auth, bookings, users, vehicles, locations }) => ({
	auth,
	bookings,
	users,
	vehicles,
	locations
});

const mapDispatchToProps: MapDispatchToProps<typeof actions, {}> = actions;

export const BookingCreateFormStepper = compose<Props, {}>(
	connect(mapStateToProps, mapDispatchToProps),
	withRouter
)(BookingCreateFormStepperBase);