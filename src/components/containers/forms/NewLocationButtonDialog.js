import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import LocationForm from "../../presentational/forms/LocationForm";
import * as actions from "../../../actions";
import { api } from "../../../utils";
import DialogButton from "../../presentational/forms/DialogButton";

function NewLocationButtonDialog({ onSubmit, fetchLocations, locations }) {
	useEffect(() => {
		if (!locations) {
			fetchLocations();
		}
	});
	const [newLocation, setNewLocation] = useState();
	let [open, setOpen] = useState(false);
	let existingLocations = [];
	if (locations && locations.data) {
		existingLocations = locations.data.map(location => ({
			lat: location.lat,
			lng: location.lng,
			label: location.name
		}));
	}
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
				existingLocations={existingLocations}
				onMapClick={v => setNewLocation({ ...newLocation, ...v })}
			/>
		</DialogButton>
	);
}

const mapStateToProps = ({ locations }) => ({
	locations
});

export default connect(
	mapStateToProps,
	actions
)(NewLocationButtonDialog);
