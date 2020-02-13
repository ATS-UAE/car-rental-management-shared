import React, { Component } from "react";
import { RouteChildrenProps, withRouter } from "react-router-dom";
import { compose } from "recompose";
import _ from "lodash";
import {
	FormBookingUpdate,
	Modal,
	FormBookingUpdateValues,
	FormStatus,
	formBookingUpdateValidationSchema,
	FormError,
	TouchedFields,
	FieldSelectItems
} from "../presentational";
import { Booking, Location, Vehicle } from "../../api";
import { ResolveThunks, connect, MapStateToProps } from "react-redux";
import { ReduxState } from "../../reducers";
import * as actions from "../../actions";
import {
	Role,
	ExtractServerResponseData,
	LocationServerResponseGetAll
} from "../../../shared/typings";
import moment from "moment";

interface ModalFormBookingUpdateStateProps {
	auth: ReduxState["auth"];
	users: ReduxState["users"];
	vehicles: ReduxState["vehicles"];
	locations: ReduxState["locations"];
}

type ModalFormBookingUpdateActionProps = ResolveThunks<typeof actions>;

type Props = ModalFormBookingUpdateStateProps &
	ModalFormBookingUpdateActionProps &
	RouteChildrenProps<{ id: string }, {}>;

type State = {
	values: FormBookingUpdateValues;
	errors: FormError<FormBookingUpdateValues>;
	touched: TouchedFields<FormBookingUpdateValues>;
	locations:
		| ExtractServerResponseData<LocationServerResponseGetAll>
		| undefined;
	errorNotes: string[];
	initializing: boolean;
	loading: boolean;
	booking: Booking | undefined;
};

class ModalFormBookingUpdateBase extends Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			errors: {},
			touched: {},
			errorNotes: [],
			loading: false,
			initializing: true,
			locations: [],
			values: {},
			booking: undefined
		};
	}

	public getAvailableVehicles = () =>
		_.debounce((from: number, to: number) => {
			this.props.fetchVehicles(from, to);
			this.props.fetchBookings();
		}, 1000);

	public getVehicleLocation = (vehicleId: number) => {
		const { locations, vehicles } = this.props;

		const vehicle = vehicles && vehicles.data.find(v => v.id === vehicleId);

		return (
			vehicle &&
			locations &&
			locations.data.find(l => l.id === vehicle.locationId)
		);
	};

	public componentDidMount = () => {
		const { match, history, locations } = this.props;
		const bookingId = match?.params.id;
		if (!bookingId) {
			history.push("/bookings");
		} else {
			Booking.fromId(Number(bookingId))
				.then(async b => {
					const vehicleLocation = await Vehicle.getLocation(b.data.vehicleId);
					this.setState({
						values: {
							id: b.data.id,
							bookingType: b.data.bookingType,
							from: moment(b.data.from, "X").toDate(),
							to: moment(b.data.to, "X").toDate(),
							userId: b.data.userId,
							vehicleId: b.data.vehicleId,
							locationId:
								(vehicleLocation && vehicleLocation.data.id) || undefined
						},
						booking: b,
						errors: {
							...this.state.errors,
							locationId:
								(vehicleLocation === undefined &&
									"Vehicle is not available anymore") ||
								undefined
						},
						initializing: false
					});
				})
				.catch(e => {
					// TODO use error modal.
					history.push("/bookings");
				});
		}
	};

	public componentDidUpdate = (prevProps: Props, prevState: State) => {
		const { users } = this.props;
		const { values } = this.state;

		if (prevState.values.userId !== values.userId) {
			// Reset vehicle field if user has changed.
			let resetFields = false;
			if (prevState.values.userId) {
				resetFields = true;
			}

			if (values.userId && users && users.data) {
				const user = users.data.find(u => u.id == values.userId);
				if (user && user.clientId !== null) {
					this.setState({
						locations: [],
						values: {
							...values,
							vehicleId: resetFields ? undefined : values.vehicleId,
							locationId: resetFields ? undefined : values.locationId
						}
					});
					Location.fromClientId(user.clientId).then(l => {
						this.setState({
							locations: l.map(l => l.data)
						});
					});
				}
			}
		}
	};

	public render = () => {
		const { users, vehicles, history } = this.props;
		const {
			initializing,
			values,
			errors,
			touched,
			errorNotes,
			loading,
			locations
		} = this.state;

		const locationList: FieldSelectItems | undefined = (values &&
			locations &&
			locations.map(l => ({
				label: l.name,
				value: l.id
			}))) || [{ label: "Please select a user.", value: "" }];

		const vehicleList: FieldSelectItems | undefined =
			(values &&
				vehicles &&
				vehicles.data
					.filter(v => v.locationId === values.locationId)
					.map(v => ({
						label: `${v.plateNumber} - ${v.brand} ${v.model}`,
						value: v.id
					}))) ||
			[];

		const userList: FieldSelectItems | undefined =
			(users &&
				users.data
					.filter(u => u.role === Role.GUEST && u.clientId !== null)
					.map(u => ({ label: u.username, value: u.id }))) ||
			undefined;

		return (
			(locationList && userList && (
				<Modal
					open={true}
					onClose={() => history.push("/bookings")}
					loading={initializing}
				>
					<FormBookingUpdate
						// Cast because if modal is loading, it will not load the form.
						values={values as FormBookingUpdateValues}
						errors={errors}
						touched={touched}
						errorNotes={errorNotes}
						onFieldTouch={touched => {
							this.setState({
								touched
							});
						}}
						loading={loading}
						onChange={(values, errors) => {
							this.setState({
								values,
								errors
							});
						}}
						vehicleList={vehicleList}
						locationList={locationList}
						userList={userList}
						onSubmit={async () => {
							this.setState({
								loading: true
							});
							try {
								values &&
									values.id &&
									(await Booking.update(
										values.id,
										formBookingUpdateValidationSchema.cast(values, {
											stripUnknown: true,
											context: {
												status: FormStatus.SUBMITTING
											}
										})
									));
							} catch (e) {
								console.error(e);
								// TODO: Show error in modal
							}
							this.setState({
								loading: false
							});
							history.push("/bookings");
						}}
					/>
				</Modal>
			)) ||
			null
		);
	};
}

const mapStateToProps: MapStateToProps<
	ModalFormBookingUpdateStateProps,
	{},
	ReduxState
> = ({ auth, users, vehicles, locations }) => ({
	auth,
	users,
	vehicles,
	locations
});

export const ModalFormBookingUpdate = compose<Props, {}>(
	connect(mapStateToProps, actions),
	withRouter
)(ModalFormBookingUpdateBase);
