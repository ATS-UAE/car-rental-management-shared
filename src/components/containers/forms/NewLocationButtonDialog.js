import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Grid, Button } from "@material-ui/core";
import LocationForm from "../../presentational/forms/LocationForm";
import * as reduxActions from "../../../actions";
import { api } from "../../../utils";
import { resources, actions } from "../../../variables/enums";
import DialogButton from "../../presentational/forms/DialogButton";
import Can from "../layout/Can";
function NewLocationButtonDialog({ onSubmit, fetchLocations, locations }) {
	useEffect(() => {
		if (!locations) {
			fetchLocations();
		}
	});
	const [newLocation, setNewLocation] = useState({});
	let [open, setOpen] = useState(false);
	let [disableButton, setDisabledButton] = useState(false);
	let [errorNotes, setErrorNotes] = useState([]);
	let [errors, setErrors] = useState({});
	useEffect(() => {
		let validForm = true;
		for (let key in errors) {
			if (errors[key].length) {
				validForm = false;
			}
		}
		if (!newLocation.lat || !newLocation.lng) {
			validForm = false;
		}
		setDisabledButton(!validForm);
	}, [errors, newLocation]);
	let existingLocations = [];
	if (locations && locations.data) {
		existingLocations = locations.data.map(location => ({
			lat: location.lat,
			lng: location.lng,
			label: location.name
		}));
	}
	const footer = (
		<Grid item>
			<Button
				disabled={disableButton}
				type="submit"
				variant="contained"
				color="primary"
				onClick={e => {
					e.preventDefault();
					setDisabledButton(true);
					api
						.createLocation(newLocation)
						.then(() => {
							fetchLocations();
							setOpen(false);
							setDisabledButton(false);
							setNewLocation({});
							onSubmit && onSubmit();
						})
						.catch(e => {
							setErrorNotes([e]);
							setDisabledButton(false);
						});
				}}
			>
				Create
			</Button>
		</Grid>
	);
	return (
		<Can
			resource={resources.LOCATIONS}
			action={actions.CREATE}
			yes={access => (
				<DialogButton
					open={open}
					onClick={() => setOpen(true)}
					onClose={() => setOpen(false)}
				>
					<LocationForm
						values={newLocation}
						onChange={setNewLocation}
						onError={setErrors}
						errors={errors}
						errorNotes={errorNotes}
						footer={footer}
						buttonLabel="Create"
						title="Create Location"
						locationValue={
							newLocation && newLocation.lat && newLocation.lng
								? { lat: newLocation.lat, lng: newLocation.lng }
								: undefined
						}
						existingLocations={existingLocations}
						onMapClick={v => setNewLocation({ ...newLocation, ...v })}
						exclude={access.excludedFields}
					/>
				</DialogButton>
			)}
		/>
	);
}

const mapStateToProps = ({ locations }) => ({
	locations
});

export default connect(
	mapStateToProps,
	reduxActions
)(NewLocationButtonDialog);
