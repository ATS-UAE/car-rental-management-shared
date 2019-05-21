import React, { Fragment, useState } from "react";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { connect } from "react-redux";
import { IconButton } from "@material-ui/core";
import { Edit, Visibility } from "@material-ui/icons";

import FormPage from "../../pages/FormPage";
import VehicleFormUpdate from "../forms/vehicles/VehicleFormUpdate";
import * as reduxActions from "../../../actions";
import { actions, resources } from "../../../variables/enums";
import { api } from "../../../utils";
import CardList from "../../presentational/display/CardList";
import Can from "../layout/Can";

function VehicleCardList({ vehicles, history }) {
	const [formData, setFormData] = useState({});

	return (
		<Fragment>
			<FormPage
				check={({ path }) => path.slice(-4) === "edit"}
				path="/vehicles/:id/edit"
				exitPath="/vehicles"
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
				cards={vehicles.map(vehicle => {
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
								action={actions.READ}
								resource={resources.VEHICLES}
								yes={readAccess => (
									<Can
										action={actions.UPDATE}
										resource={resources.VEHICLES}
										yes={updateAccess => (
											<IconButton
												onClick={() =>
													api.fetchVehicle(vehicle.id).then(() =>
														history.push(`/vehicles/${vehicle.id}/edit`, {
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

const mapStateToProps = ({ vehicles }) => {
	let vehicleData = [];
	if (vehicles && vehicles.success === true && vehicles.data) {
		vehicleData = vehicles.data;
	}
	return { vehicles: vehicleData };
};

export default compose(
	withRouter,
	connect(
		mapStateToProps,
		reduxActions
	)
)(VehicleCardList);
