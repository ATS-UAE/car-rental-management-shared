import React, { useState } from "react";
import { connect } from "react-redux";
import LocationForm from "../../presentational/forms/LocationForm";
import * as actions from "../../../actions";
import { api } from "../../../utils";
import DialogButton from "../../presentational/forms/DialogButton";

function NewLocationButtonDialog({ onSubmit, fetchLocations }) {
	const [newLocation, setNewLocation] = useState();
	const [markerValue, setMarkerValue] = useState();
	let [open, setOpen] = useState(false);
	let [selectorOpen, setSelectorOpen] = useState(false);

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
					markerValue && markerValue.lat && markerValue.lng
						? { lat: markerValue.lat, lng: markerValue.lng }
						: undefined
				}
				onMapClick={() => setSelectorOpen(true)}
				selectorOpen={selectorOpen}
				onSelectorClose={() => {
					setSelectorOpen(false);
					setMarkerValue(undefined);
				}}
				onSelectorSubmit={v => {
					setNewLocation({ ...newLocation, ...markerValue });
					setSelectorOpen(false);
				}}
				onSelectorClick={v => setMarkerValue(v)}
				selectorValue={markerValue}
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
