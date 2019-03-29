import React, { useState } from "react";
import { connect } from "react-redux";
import VehicleForm from "../../presentational/forms/VehicleForm";
import * as actions from "../../../actions";
import { api } from "../../../utils";

function VehicleCreateContainer({ fetchVehicles }) {
	const [newVehicle, setNewVehicle] = useState({});
	return (
		<VehicleForm
			values={newVehicle}
			onChange={setNewVehicle}
			onSubmit={() =>
				api.createVehicle(newVehicle).then(() => {
					fetchVehicles();
				})
			}
			buttonLabel="Create"
			title="Create Vehicle"
		/>
	);
}

export default connect(
	null,
	actions
)(VehicleCreateContainer);
