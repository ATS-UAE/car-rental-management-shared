import React, { Fragment, useState } from "react";
import { withRouter, Route, Switch } from "react-router";
import { compose } from "recompose";
import { connect } from "react-redux";
import { IconButton, Tooltip, withStyles } from "@material-ui/core";
import { Edit, Visibility, Build } from "@material-ui/icons";

import BookingFormCreateMaintenance from "../forms/bookings/BookingFormCreateMaintenance";
import VehicleFormUpdate from "../forms/vehicles/VehicleFormUpdate";
import * as reduxActions from "../../../actions";
import { actions, resources, roles } from "../../../variables/enums";
import { api } from "../../../utils";
import { RBAC } from "../../../config/rbac";
import CardList from "../../presentational/display/CardList";
import Dialog from "../../presentational/display/Dialog";
import Can from "../layout/Can";
import VehicleBookingRange from "./VehicleBookingRange";

function VehicleCardList({ vehicles, history, classes, auth, fetchVehicles }) {
	const [formData, setFormData] = useState(null);
	const renderDialog = ({ match, children }) => (
		<Dialog
			onMount={async () => {
				try {
					const vehicle = await api
						.fetchVehicle(match.params.id)
						.catch(() => history.replace("/vehicles"));

					const read = {
						access: await RBAC.can(
							auth.data.role.name,
							actions.READ,
							resources.VEHICLES
						),
						exclude: RBAC.getExcludedFields(
							auth.data.role.name,
							actions.UPDATE,
							resources.VEHICLES
						)
					};

					const update = {
						access: await RBAC.can(
							auth.data.role.name,
							actions.UPDATE,
							resources.VEHICLES
						),
						exclude: RBAC.getExcludedFields(
							auth.data.role.name,
							actions.UPDATE,
							resources.VEHICLES
						)
					};

					const destroy = {
						access: await RBAC.can(
							auth.data.role.name,
							actions.DELETE,
							resources.VEHICLES
						)
					};

					return {
						vehicle,
						read,
						update,
						destroy
					};
				} catch (e) {
					history.replace("/vehicles");
				}
			}}
			onClose={() => {
				history.push("/vehicles");
				setFormData(null);
			}}
			open={true}
			children={children}
		/>
	);
	return (
		<Fragment>
			<Switch>
				<Route
					exact
					path="/vehicles/:id(\d+)"
					render={({ match }) =>
						renderDialog({
							match,
							children: ({ vehicle, read }) => {
								if (!formData && vehicle && vehicle.data) {
									setFormData(vehicle.data);
								} else if (formData && read && read.access) {
									return (
										<VehicleFormUpdate
											hints={""}
											values={formData}
											onChangeEvent={(data, name, event) =>
												event.target.files
													? setFormData({
															...data,
															[name]: event.target.files[0] || ""
													  })
													: setFormData(data)
											}
											readOnly={true}
											exclude={read.exclude}
											onSubmit={() => history.push("/vehicles")}
											showFooter={false}
										/>
									);
								} else if (read && !read.access) {
									history.replace("/vehicles");
								}
								return null;
							}
						})
					}
				/>
				<Route
					path="/vehicles/:id(\d+)/edit"
					render={({ match }) =>
						renderDialog({
							match,
							children: ({ vehicle, update, read }) => {
								if (!formData && vehicle && vehicle.data) {
									setFormData(vehicle.data);
								} else if (formData && update && update.access) {
									return (
										<VehicleFormUpdate
											hints={""}
											values={formData}
											onChangeEvent={(data, name, event) =>
												event.target.files
													? setFormData({
															...data,
															[name]: event.target.files[0] || ""
													  })
													: setFormData(data)
											}
											readOnly={update.exclude}
											exclude={read.exclude}
											onSubmit={() => history.push("/vehicles")}
											showFooter={true}
										/>
									);
								} else if (update && !update.access) {
									history.replace("/vehicles");
								}

								return null;
							}
						})
					}
				/>
				<Route
					path="/vehicles/:id(\d+)/maintenance"
					render={({ match }) =>
						renderDialog({
							match,
							children: ({ vehicle, update }) => {
								if (vehicle && vehicle.data && update && update.access) {
									return (
										<BookingFormCreateMaintenance
											vehicle={vehicle.data}
											onSubmit={() => history.push("/vehicles")}
										/>
									);
								} else if (update && !update.access) {
									history.replace("/vehicles");
								}
								return null;
							}
						})
					}
				/>
			</Switch>
			<CardList
				details={cards => (
					<VehicleBookingRange vehicleList={cards.map(card => card.vehicle)} />
				)}
				cards={vehicles.reduce((acc, vehicle) => {
					const {
						id,
						brand,
						model,
						plateNumber,
						vin,
						vehicleImageSrc
					} = vehicle;

					let data = {
						id,
						vehicle,
						title: `${brand} ${model}`,
						descriptions: [plateNumber, vin],
						imgSrc: vehicleImageSrc || "/static/images/car-no-image-avl.jpg",
						props: {
							classes: {
								card: classes.card
							}
						},
						controls: (
							<Can
								action={actions.READ}
								resource={resources.VEHICLES}
								yes={readAccess => (
									<Can
										action={actions.UPDATE}
										resource={resources.VEHICLES}
										yes={updateAccess => {
											return (
												<Fragment>
													<Tooltip title="Edit">
														<IconButton
															onClick={() =>
																history.push(`/vehicles/${vehicle.id}/edit`, {
																	vehicle,
																	updateAccess,
																	readAccess
																})
															}
														>
															<Edit />
														</IconButton>
													</Tooltip>
													<Tooltip title="Maintenance">
														<IconButton
															onClick={() =>
																history.push(
																	`/vehicles/${vehicle.id}/maintenance`
																)
															}
														>
															<Build />
														</IconButton>
													</Tooltip>
												</Fragment>
											);
										}}
										no={() => {
											return (
												<Tooltip title="View">
													<IconButton
														onClick={() =>
															history.push(`/vehicles/${vehicle.id}`)
														}
													>
														<Visibility />
													</IconButton>
												</Tooltip>
											);
										}}
									/>
								)}
							/>
						)
					};

					if (auth && auth.data) {
						if (auth.data.role.name === roles.GUEST) {
							let inCategory = false;
							if (!auth.data.categories.length) {
								inCategory = true;
							} else {
								for (const categoryId of auth.data.categories) {
									if (vehicle.categories.includes(categoryId))
										inCategory = true;
								}
							}
							inCategory && acc.push(data);
						} else {
							acc.push(data);
						}
					}

					return acc;
				}, [])}
			/>
		</Fragment>
	);
}

const mapStateToProps = ({ vehicles, auth }) => {
	let vehicleData = [];
	if (vehicles && vehicles.success === true && vehicles.data) {
		vehicleData = vehicles.data;
	}
	return { vehicles: vehicleData, auth };
};

const styles = {
	card: {
		height: "300px"
	}
};

export default compose(
	withStyles(styles),
	withRouter,
	connect(
		mapStateToProps,
		reduxActions
	)
)(VehicleCardList);
