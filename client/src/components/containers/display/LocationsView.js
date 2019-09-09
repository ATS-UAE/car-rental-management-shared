import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { Dialog, Grid, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";
import * as reduxActions from "../../../actions";
import WorldMap from "../../presentational/display/WorldMap";
import LocationMapMarker from "../../presentational/display/LocationMapMarker";
import LocationForm from "../../presentational/forms/LocationForm";
import { Resource, Action } from "../../../variables/enums";
import { api } from "../../../utils/helpers";
import Can from "../layout/Can";

function LocationsView({ locations, fetchLocations, classes }) {
	useEffect(() => {
		fetchLocations();
	}, []);
	const [formData, setFormData] = useState({});
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
		if (!formData.lat || !formData.lng) {
			validForm = false;
		}
		setDisabledButton(!validForm);
	}, [errors, formData]);
	let existingLocations = [];
	if (locations && locations.data) {
		existingLocations = locations.data.map(location => ({
			lat: location.lat,
			lng: location.lng,
			label: location.name
		}));
	}
	const footer = (
		<Fragment>
			<Grid container justify="space-between">
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
								.updateLocation(formData)
								.then(() => {
									fetchLocations();
									setOpen(false);
									setDisabledButton(false);
									setFormData({});
								})
								.catch(e => {
									setErrorNotes([e]);
									setDisabledButton(false);
								});
						}}
					>
						Update
					</Button>
				</Grid>
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
								.deleteLocation(formData)
								.then(() => {
									fetchLocations();
									setOpen(false);
									setDisabledButton(false);
									setFormData({});
								})
								.catch(e => {
									setErrorNotes([e]);
									setDisabledButton(false);
								});
						}}
					>
						Delete
					</Button>
				</Grid>
			</Grid>
		</Fragment>
	);
	return (
		<Can
			resource={Resource.LOCATIONS}
			action={Action.READ}
			yes={() => (
				<Fragment>
					<Can
						action={Action.UPDATE}
						resource={Resource.LOCATIONS}
						yes={access => (
							<Dialog
								open={open}
								onClose={() => {
									setOpen(false);
								}}
								PaperProps={{ className: classes.updateForm }}
							>
								<LocationForm
									footer={footer}
									values={formData}
									onChange={setFormData}
									onError={setErrors}
									errors={errors}
									errorNotes={errorNotes}
									buttonLabel="Update"
									title="Update Location"
									locationValue={
										formData && formData.lat && formData.lng
											? { lat: formData.lat, lng: formData.lng }
											: undefined
									}
									existingLocations={existingLocations}
									onMapClick={v => setFormData({ ...formData, ...v })}
									exclude={access.excludedFields}
								/>
							</Dialog>
						)}
					/>
					<WorldMap mapContainerProps={{ className: classes.map }}>
						{locations &&
							locations.data &&
							locations.data.map(
								({ id, lat, lng, name, address, locationImageSrc }) => (
									<LocationMapMarker
										position={{ lat: lat, lng: lng }}
										label={name}
										src={locationImageSrc}
										key={lat + lng + name}
										onClick={() => {
											setOpen(true);
											setFormData({
												id,
												name,
												address,
												lat,
												lng
											});
										}}
									/>
								)
							)}
					</WorldMap>
				</Fragment>
			)}
		/>
	);
}

const mapStateToProps = ({ locations }) => ({
	locations
});

const styles = theme => ({
	updateForm: {
		padding: theme.spacing(3)
	},
	map: {
		flexGrow: 1
	}
});

export default compose(
	withStyles(styles),
	connect(
		mapStateToProps,
		reduxActions
	)
)(LocationsView);
