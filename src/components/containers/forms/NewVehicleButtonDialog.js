import React, { useState } from "react";
import { connect } from "react-redux";
import VehicleForm from "../../presentational/forms/VehicleForm";
import * as actions from "../../../actions";
import { api } from "../../../utils";
import DialogButton from "../../presentational/forms/DialogButton";

function NewVehicleButtonDialog({ fetchVehicles, onSubmit }) {
	const [newVehicle, setNewVehicle] = useState({});
	let [open, setOpen] = useState(false);

	return (
		<DialogButton
			open={open}
			onClick={() => setOpen(true)}
			onClose={() => setOpen(false)}
		>
			<VehicleForm
				values={newVehicle}
				onChange={setNewVehicle}
				onSubmit={() =>
					api.createVehicle(newVehicle).then(() => {
						fetchVehicles();
						setOpen(false);
						onSubmit && onSubmit();
					})
				}
				buttonLabel="Create"
				title="Create Vehicle"
			/>
		</DialogButton>
	);
}

export default connect(
	null,
	actions
)(NewVehicleButtonDialog);
