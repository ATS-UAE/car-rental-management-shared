import React, { useState } from "react";
import { connect } from "react-redux";
import LocationForm from "../../presentational/forms/LocationForm";
import * as actions from "../../../actions";
import { api } from "../../../utils";
import DialogButton from "../../presentational/forms/DialogButton";

function NewLocationButtonDialog({ onSubmit, fetchLocations }) {
	const [newLocation, setNewLocation] = useState();
	let [open, setOpen] = useState(false);

	return (
		<DialogButton
			open={open}
			onClick={() => setOpen(true)}
			onClose={() => setOpen(false)}
		>
			<LocationForm
				values={newLocation}
				onChange={setNewLocation}
				onSubmit={() =>
					api.createLocation(newLocation).then(() => {
						fetchLocations();
						setOpen(false);
						onSubmit && onSubmit();
					})
				}
				buttonLabel="Create"
				title="Create Location"
				locationValue={
					newLocation && newLocation.lat && newLocation.lng
						? { lat: newLocation.lat, lng: newLocation.lng }
						: undefined
				}
				onMapClick={v => setNewLocation({ ...newLocation, ...v })}
			/>
		</DialogButton>
	);
}

const mapStateToProps = ({ users, enums, vehicles }) => ({
	users,
	enums,
	vehicles
});

export default connect(
	mapStateToProps,
	actions
)(NewLocationButtonDialog);
