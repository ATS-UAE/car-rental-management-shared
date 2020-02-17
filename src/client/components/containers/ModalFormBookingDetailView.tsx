import React, { Component } from "react";
import { RouteChildrenProps, withRouter } from "react-router-dom";
import { compose } from "recompose";
import _ from "lodash";
import {
	Modal,
	FormBookingDetailViewValues,
	FormBookingDetailView
} from "../presentational";
import { Booking } from "../../api";
import { connect, MapStateToProps } from "react-redux";
import { ReduxState } from "../../reducers";

import moment from "moment";

interface ModalFormBookingDetailViewStateProps {
	auth: ReduxState["auth"];
}

type Props = ModalFormBookingDetailViewStateProps &
	RouteChildrenProps<{ id: string }, {}>;

type State = {
	values?: FormBookingDetailViewValues;
};

class ModalFormBookingDetailViewBase extends Component<Props, State> {
	constructor(props) {
		super(props);
		this.state = {};
	}

	public componentDidMount = () => {
		const { match, history } = this.props;
		const bookingId = match?.params.id;
		if (!bookingId) {
			history.push("/bookings");
		} else {
			Booking.fromId(Number(bookingId))
				.then(async b => {
					const [user, vehicle] = await Promise.all([
						b.getUser(),
						b.getVehicle()
					]);
					console.log(b.data);
					this.setState({
						values: {
							booker: user.data.username,
							from: moment(b.data.from, "X").toDate(),
							to: moment(b.data.to, "X").toDate(),
							bookingType: b.data.bookingType,
							vehicle: `${vehicle.data.brand} ${vehicle.data.model} - ${vehicle.data.plateNumber}`,
							amountPaid:
								typeof b.data.amount === "number" ? b.data.amount : undefined,
							endFuel:
								typeof b.data.endFuel === "number" ? b.data.endFuel : undefined,
							startFuel:
								typeof b.data.startFuel === "number"
									? b.data.startFuel
									: undefined,
							endMileage:
								typeof b.data.endMileage === "number"
									? b.data.endMileage
									: undefined,
							startMileage:
								typeof b.data.startMileage === "number"
									? b.data.startMileage
									: undefined,
							pickupDate:
								typeof b.data.pickupDate === "number"
									? moment(b.data.pickupDate, "X").toDate()
									: undefined,
							returnDate:
								typeof b.data.returnDate === "number"
									? moment(b.data.returnDate, "X").toDate()
									: undefined
						}
					});
				})
				.catch(e => {
					// TODO use error modal.
					history.push("/bookings");
				});
		}
	};

	public render = () => {
		const { history, auth } = this.props;
		const { values } = this.state;

		return (
			(auth && auth.data && (
				<Modal
					open={true}
					onClose={() => history.push("/bookings")}
					loading={values === undefined}
				>
					{values && (
						<FormBookingDetailView values={values} role={auth.data.role} />
					)}
				</Modal>
			)) ||
			null
		);
	};
}

const mapStateToProps: MapStateToProps<
	ModalFormBookingDetailViewStateProps,
	{},
	ReduxState
> = ({ auth, users, vehicles, locations }) => ({
	auth,
	users,
	vehicles,
	locations
});

export const ModalFormBookingDetailView = compose<Props, {}>(
	connect(mapStateToProps),
	withRouter
)(ModalFormBookingDetailViewBase);
