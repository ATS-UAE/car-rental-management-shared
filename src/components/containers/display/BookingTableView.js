import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Button, Grid } from "@material-ui/core";
import * as actions from "../../../actions";
import TableView from "../../presentational/forms/TableView";
import Can from "../layout/Can";
import BookingForm from "../../presentational/forms/BookingForm";
import { toTitleWords, api } from "../../../utils";
import { RESOURCES, ACTIONS } from "../../../variables";

function BookingTableView({
	bookings,
	vehicles,
	enums,
	fetchEnums,
	fetchBookings,
	fetchVehicles,
	onSubmit
}) {
	const [open, setOpen] = useState(false);
	const [formData, setFormData] = useState({});
	let [disableButton, setDisabledButton] = useState(false);
	let [errorNotes, setErrorNotes] = useState([]);
	let [errors, setErrors] = useState({});

	useEffect(() => {
		let validForm = true;
		for (let key in errors) {
			if (errors[key].length) {
				validForm = false;
			}
		}
		setDisabledButton(!validForm);
	}, [errors, formData]);
	useEffect(() => {
		if (!bookings) {
			fetchBookings();
		}
		if (!enums) {
			fetchEnums();
		}

		if (!vehicles) {
			fetchVehicles();
		}
	}, []);

	let bookingTypeList = [{ value: "", label: "Loading..." }];
	let vehicleList = [{ value: "", label: "No vehicles available" }];

	if (enums && enums.data) {
		let $bookingTypeList = enums.data.bookingTypes.map(item => ({
			value: item.id,
			label: toTitleWords(item.name)
		}));
		if ($bookingTypeList.length) {
			bookingTypeList = $bookingTypeList;
		}
	}
	if (vehicles && vehicles.data) {
		let $vehicleList = vehicles.data.map(vehicle => ({
			value: vehicle.id,
			label: `${vehicle.brand} ${vehicle.model} - ${vehicle.plateNumber}`
		}));
		if ($vehicleList.length) {
			vehicleList = $vehicleList;
		}
	}

	const tableBody =
		bookings && bookings.data && vehicles
			? bookings.data.map(booking => {
					let bookingVehicle = vehicles.data.find(
						vehicle => vehicle.id === booking.vehicleId
					);
					let bookingStatus = "";

					if (booking.approved) {
						if (moment(booking.from, "X").isSameOrBefore(moment()))
							bookingStatus = "Ongoing";
						else bookingStatus = "Approved";
					} else {
						if (moment(booking.from, "X").isSameOrBefore(moment()))
							bookingStatus = "Expired";
						else bookingStatus = "Denied";
					}
					let row = {
						metadata: booking,
						values: [
							{
								value: `${booking.user.firstName} ${booking.user.lastName}`
							},
							{
								value: toTitleWords(booking.bookingType.name)
							},
							{
								value: `${bookingVehicle.brand} ${bookingVehicle.model}`
							},
							{
								value: moment(booking.from, "X").calendar()
							},
							{
								value: moment(booking.to, "X").calendar()
							},
							{
								value: bookingStatus
							}
						],
						onClick: () => {
							setOpen(true);
							api.fetchBooking(booking.id).then(res => {
								setFormData({
									...res.data,
									userId: res.data.user.id,
									bookingTypeId: res.data.bookingType.id,
									vehicleId: res.data.vehicle.id
								});
							});
						}
					};
					return row;
			  })
			: [];

	return (
		<Fragment>
			<Can
				action={ACTIONS.READ}
				resource={RESOURCES.BOOKINGS}
				params={{ booking: { userId: 1 }, user: { id: 1 } }}
				yes={access => (
					<TableView
						open={open}
						onClose={() => setOpen(false)}
						editable={true}
						tableData={{
							headers: [
								{
									values: [
										{ value: "User" },
										{ value: "Booking Type" },
										{ value: "Vehicle" },
										{ value: "Starting Time" },
										{ value: "Finishing Time" },
										{ value: "Status" }
									]
								}
							],
							body: tableBody
						}}
					>
						<Can
							action={ACTIONS.UPDATE}
							resource={RESOURCES.BOOKINGS}
							yes={access => {
								let footer = (
									<Grid item>
										<Button
											disabled={disableButton}
											type="submit"
											variant="contained"
											color="primary"
											onClick={e => {
												e.preventDefault();
												setDisabledButton(true);
												api
													.updateUser(formData)
													.then(() => {
														fetchBookings();
														onSubmit && onSubmit();
														setOpen(false);
														setDisabledButton(false);
													})

													.catch(e => {
														setErrorNotes([e]);
														setDisabledButton(false);
													});
											}}
										>
											Confirm
										</Button>
									</Grid>
								);
								return (
									<BookingForm
										values={formData}
										errors={errors}
										onError={setErrors}
										onChange={setFormData}
										errorNotes={errorNotes}
										vehicleList={vehicleList}
										bookingTypeList={bookingTypeList}
										exclude={access.excludedFields}
										hints=""
										footer={footer}
									/>
								);
							}}
							no={() => (
								<BookingForm
									values={formData}
									errors={errors}
									onError={setErrors}
									onChange={setFormData}
									errorNotes={errorNotes}
									vehicleList={vehicleList}
									bookingTypeList={bookingTypeList}
									readOnly={true}
									exclude={access.excludedFields}
									hints=""
								/>
							)}
						/>
					</TableView>
				)}
			/>
		</Fragment>
	);
}

const mapStateToProps = ({ bookings, vehicles, enums, auth }) => ({
	bookings,
	vehicles,
	enums,
	auth
});

export default connect(
	mapStateToProps,
	actions
)(BookingTableView);
