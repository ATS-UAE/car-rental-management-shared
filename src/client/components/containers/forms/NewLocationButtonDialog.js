import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Grid, Button } from "@material-ui/core";
import LocationForm from "../../presentational/forms/LocationForm";
import * as reduxActions from "../../../actions";
import { api, apiErrorHandler } from "../../../utils/helpers";
import { Resource, Operation } from "../../../../shared/typings";
import DialogButton from "../../presentational/forms/DialogButton";
import Can from "../layout/Can";
function NewLocationButtonDialog({ fetchLocations, locations }) {
	useEffect(() => {
		fetchLocations();
	}, []);
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
						})
						.catch(e => {
							setErrorNotes([apiErrorHandler(e).message]);
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
			resource={Resource.LOCATIONS}
			action={Operation.CREATE}
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

export default connect(mapStateToProps, reduxActions)(NewLocationButtonDialog);
