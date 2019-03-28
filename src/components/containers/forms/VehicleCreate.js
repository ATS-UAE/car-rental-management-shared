import React, { useState } from "react";
import { connect } from "react-redux";
import VehicleCreate from "../../presentational/forms/VehicleCreate";
import * as actions from "../../../actions";
import { api } from "../../../utils";

function VehicleCreateContainer({ fetchVehicles }) {
	const [newVehicle, setNewVehicle] = useState({});
	return (
		<VehicleCreate
			values={newVehicle}
			onChange={setNewVehicle}
			onSubmit={() =>
				api.createVehicle().then(() => {
					fetchVehicles();
				})
			}
		/>
	);
}

export default connect(
	null,
	actions
)(VehicleCreateContainer);
