import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { IconButton } from "@material-ui/core";
import { Edit, Visibility } from "@material-ui/icons";

import * as reduxActions from "../../../actions";
import { api } from "../../../utils";
import { actions, resources } from "../../../variables/enums";
import CardList from "../../presentational/display/CardList";
import Can from "../layout/Can";

function VehicleCardList({ vehicles }) {
	return (
		<CardList
			cards={vehicles.map(
				({ id, brand, model, plateNumber, vin, vehicleImageSrc }) => ({
					id,
					title: `${brand} ${model}`,
					descriptions: [plateNumber, vin],
					imgSrc: vehicleImageSrc || "/static/images/car-no-image-avl.jpg",
					controls: (
						<Fragment>
							<Can
								action={actions.READ}
								resource={resources.VEHICLES}
								yes={() => (
									<Can
										action={actions.UPDATE}
										resource={resources.VEHICLES}
										yes={() => (
											<IconButton onClick={() => {}}>
												<Edit />
											</IconButton>
										)}
									/>
								)}
								no={() => (
									<IconButton>
										<Visibility />
									</IconButton>
								)}
							/>
						</Fragment>
					)
				})
			)}
		/>
	);
}

const mapStateToProps = ({ vehicles }) => {
	let vehicleData = [];
	if (vehicles && vehicles.success === true && vehicles.data) {
		vehicleData = vehicles.data;
	}
	return { vehicles: vehicleData };
};

export default connect(
	mapStateToProps,
	reduxActions
)(VehicleCardList);
