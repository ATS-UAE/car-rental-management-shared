import React, { Fragment, useState } from "react";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { connect } from "react-redux";
import { IconButton } from "@material-ui/core";
import { Edit, Visibility } from "@material-ui/icons";

import FormPage from "../../pages/FormPage";
import VehicleFormUpdate from "../forms/bookings/BookingFormUpdate";
import * as reduxActions from "../../../actions";
import { Action, Resource } from "../../../../shared/typings";
import { api } from "../../../utils/helpers";
import CardList from "../../presentational/display/CardList";
import Can from "../layout/Can";

function BookingCardList({ bookings, history, auth }) {
	const [formData, setFormData] = useState({});

	return (
		<Fragment>
			<FormPage
				check={({ location }) => /\/bookings\/\d+/.test(location.pathname)}
				path="/bookings/:id"
				exitPath="/bookings"
				onMount={({ location }) => setFormData(location.state.vehicle)}
				render={({ location }) => {
					let readOnly = [];
					let exclude = [];
					let showFooter = false;
					if (location.state.updateAccess) {
						exclude = location.state.readAccess.excludedFields;
						readOnly = location.state.updateAccess.excludedFields;
						showFooter = true;
					} else {
						exclude = location.state.readAccess.excludedFields;
						readOnly = true;
					}
					return (
						<VehicleFormUpdate
							values={formData}
							onChangeEvent={(data, name, event) =>
								event.target.files
									? setFormData({
											...data,
											[name]: event.target.files[0] || ""
									  })
									: setFormData(data)
							}
							readOnly={readOnly}
							exclude={exclude}
							showFooter={showFooter}
						/>
					);
				}}
			/>

			<CardList
				cards={bookings.map(vehicle => {
					const {
						id,
						brand,
						model,
						plateNumber,
						vin,
						vehicleImageSrc
					} = vehicle;

					return {
						id,
						title: `${brand} ${model}`,
						descriptions: [plateNumber, vin],
						imgSrc: vehicleImageSrc || "/static/images/car-no-image-avl.jpg",
						controls: (
							<Can
								action={Action.READ}
								resource={Resource.VEHICLES}
								params={{ accessor: auth.data, target: vehicle }}
								yes={readAccess => (
									<Can
										action={Action.UPDATE}
										resource={Resource.VEHICLES}
										params={{ accessor: auth.data, target: vehicle }}
										yes={updateAccess => (
											<IconButton
												onClick={() =>
													api.fetchVehicle(vehicle.id).then(() =>
														history.push(`/bookings/${vehicle.id}/edit`, {
															vehicle,
															updateAccess,
															readAccess
														})
													)
												}
											>
												<Edit />
											</IconButton>
										)}
										no={() => (
											<IconButton
												onClick={() => {
													api.fetchVehicle(vehicle.id).then(() =>
														history.push(`/users/${vehicle.id}`, {
															vehicle,
															readAccess
														})
													);
												}}
											>
												<Visibility />
											</IconButton>
										)}
									/>
								)}
							/>
						)
					};
				})}
			/>
		</Fragment>
	);
}

const mapStateToProps = ({ bookings, auth }) => {
	let bookingData = [];
	if (bookings && bookings.success === true && bookings.data) {
		bookingData = bookings.data;
	}
	return { bookings: bookingData, auth };
};

export default compose(
	withRouter,
	connect(
		mapStateToProps,
		reduxActions
	)
)(BookingCardList);
