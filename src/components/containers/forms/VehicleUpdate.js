import React from "react";
import { connect } from "react-redux";
import VehicleForm from "../../presentational/forms/VehicleForm";
import * as actions from "../../../actions";
import { api } from "../../../utils";

function VehicleUpdateContainer({ fetchVehicles, onChange, values }) {
	return (
		<VehicleForm
			values={values}
			onChange={onChange}
			onSubmit={() =>
				api.updateVehicle(values).then(() => {
					fetchVehicles();
				})
			}
			buttonLabel="Update"
			title="Update Vehicle"
		/>
	);
}

export default connect(
	null,
	actions
)(VehicleUpdateContainer);
