import React, { Fragment, useState } from "react";
import { withRouter, Route, Switch } from "react-router";
import { compose } from "recompose";
import { connect } from "react-redux";
import { IconButton, Tooltip, withStyles } from "@material-ui/core";
import {
	Edit,
	Visibility,
	Build,
	Block,
	CheckCircle
} from "@material-ui/icons";

import { Role } from "../layout/Role";
import { VehicleInfoCard } from "../../presentational";
import { DialogChildren } from "../../presentational/forms/ConfirmDialog";
import BookingFormCreateMaintenance from "../forms/bookings/BookingFormCreateMaintenance";
import VehicleFormUpdate from "../forms/vehicles/VehicleFormUpdate";
import * as reduxActions from "../../../actions";
import { Action, Resource, Role as RoleEnum } from "../../../../shared/typings";
import { api } from "../../../utils/helpers";
import RBAC from "../../../utils/rbac";
import CardList from "../../presentational/display/CardList";
import Dialog from "../../presentational/display/Dialog";
import Can from "../layout/Can";

function VehicleCardList({
	vehicles,
	history,
	classes,
	auth,
	fetchVehicles,
	enums
}) {
	const [formData, setFormData] = useState(null);
	const [isLoading, setLoading] = useState(false);

	const renderDialog = ({ match, children }) => (
		<Dialog
			onMount={async () => {
				try {
					const vehicle = await api
						.fetchVehicle(match.params.id)
						.catch(() => history.replace("/vehicles"));

					const read = {
						access: await RBAC.can(
							auth.data.role,
							Action.READ,
							Resource.VEHICLES,
							{ target: vehicle.data, accessor: auth.data }
						),
						exclude: RBAC.getExcludedFields(
							auth.data.role,
							Action.READ,
							Resource.VEHICLES
						)
					};

					const update = {
						access: await RBAC.can(
							auth.data.role,
							Action.UPDATE,
							Resource.VEHICLES,
							{ target: vehicle.data, accessor: auth.data }
						),
						exclude: RBAC.getExcludedFields(
							auth.data.role,
							Action.UPDATE,
							Resource.VEHICLES
						)
					};

					const destroy = {
						access: await RBAC.can(
							auth.data.role,
							Action.DELETE,
							Resource.VEHICLES,
							{ target: vehicle.data, accessor: auth.data }
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
									const {
										brand,
										model,
										vin,
										plateNumber,
										parkingLocation,
										vehicleImageSrc,
										objectId,
										position,
										vehicleIssues,
										mileage
									} = vehicle.data;
									const customFields = [];
									if (objectId) {
										customFields.push({ label: "Object ID", value: objectId });
									}
									return (
										<>
											<Role roles={[RoleEnum.GUEST]}>
												<VehicleInfoCard
													brand={brand}
													model={model}
													position={position}
													mileage={mileage}
													vin={vin}
													plateNumber={plateNumber}
													parkingLocation={parkingLocation}
													image={vehicleImageSrc || undefined}
													customFields={customFields}
													knownIssues={vehicleIssues.map(
														issue => issue.message
													)}
												/>
											</Role>
											<Role excludes={[RoleEnum.GUEST]}>
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
													showFooter={false}
												/>
											</Role>
										</>
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
											title="Update Vehicle"
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
											onSubmit={() => {
												history.push("/vehicles");
												setFormData(null);
											}}
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
				<Route
					path="/vehicles/:id(\d+)/defleet"
					render={({ match }) =>
						renderDialog({
							match,
							children: ({ vehicle, destroy }) => {
								if (vehicle && vehicle.data && destroy && destroy.access) {
									const {
										brand,
										model,
										plateNumber,
										defleeted,
										id
									} = vehicle.data;
									return (
										<DialogChildren
											onUnmount={() => {
												setLoading(false);
											}}
											title={
												defleeted
													? `Make ${brand} ${model} - ${plateNumber} available again?`
													: `De-fleet ${brand} ${model} - ${plateNumber}?`
											}
											content={
												defleeted
													? "This vehicle will be available for bookings again."
													: "This vehicle will not be available for bookings anymore."
											}
											disabled={isLoading}
											yes={() => {
												setLoading(true);

												api
													.updateVehicle({
														id,
														defleeted: !defleeted
													})
													.then(fetchVehicles)
													.then(() => {
														setLoading(false);
														history.replace("/vehicles");
													});
											}}
											no={() => history.replace("/vehicles")}
										/>
									);
								} else if (destroy && !destroy.access) {
									history.replace("/vehicles");
								}
								return null;
							}
						})
					}
				/>
			</Switch>
			<CardList
				cards={vehicles.reduce((acc, vehicle) => {
					const {
						id,
						brand,
						model,
						plateNumber,
						vin,
						vehicleImageSrc,
						bookingCharge,
						bookingChargeCount,
						bookingChargeUnit
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
								action={Action.READ}
								resource={Resource.VEHICLES}
								params={{ accessor: auth.data, target: vehicle }}
								yes={readAccess => (
									<Fragment>
										<Can
											action={Action.UPDATE}
											resource={Resource.VEHICLES}
											params={{ accessor: auth.data, target: vehicle }}
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
										<Can
											action={Action.DELETE}
											resource={Resource.VEHICLES}
											params={{ accessor: auth.data, target: vehicle }}
											yes={() => {
												const Icon = vehicle.defleeted ? CheckCircle : Block;
												return (
													<Tooltip
														title={
															vehicle.defleeted ? "Make available" : "De-fleet"
														}
													>
														<IconButton
															onClick={() =>
																history.push(`/vehicles/${vehicle.id}/defleet`)
															}
														>
															<Icon />
														</IconButton>
													</Tooltip>
												);
											}}
										/>
									</Fragment>
								)}
							/>
						)
					};
					if (bookingChargeUnit) {
						data.descriptions.push(
							`Cost: ${bookingCharge} Dhs per${
								bookingChargeCount === 1 ? " " : ` ${bookingChargeCount}`
							} ${bookingChargeUnit}`
						);
					}
					if (auth && auth.data) {
						if (auth.data.role === Role.GUEST) {
							let inCategory = false;

							if (!auth.data.categories.length) {
								inCategory = true;
							} else {
								for (const category of auth.data.categories) {
									if (vehicle.categories.find(c => c.id === category.id))
										inCategory = true;
								}
							}
							inCategory && !vehicle.defleeted && acc.push(data);
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
	connect(mapStateToProps, reduxActions)
)(VehicleCardList);
