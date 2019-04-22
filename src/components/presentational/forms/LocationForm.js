import React from "react";
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Marker } from "react-google-maps";
import GMaps from "../display/GMaps";
import Form, { FIELDS } from "./Form";
const { TEXT } = FIELDS;

function LocationForm({
	title,
	include,
	errorNotes,
	errors,
	onSubmit,
	onValid,
	onChange,
	onError,
	values,
	buttonLabel,
	onMapClick,
	locationValue,
	existingLocations
}) {
	const fields = [
		{
			type: TEXT,
			id: "location-name",
			name: "name",
			props: {
				label: "Location Name",
				required: true
			}
		},
		{
			type: TEXT,
			id: "full-address",
			name: "address",
			props: {
				label: "Full Address",
				required: true
			}
		}
	];
	return (
		<Form
			title={title}
			fields={fields}
			include={include}
			errorNotes={errorNotes}
			errors={errors}
			onSubmit={onSubmit}
			onValid={onValid}
			onChange={onChange}
			onError={onError}
			values={values}
			buttonLabel={buttonLabel}
		>
			<Grid item xs={12}>
				<GMaps
					onClick={e =>
						onMapClick &&
						onMapClick({ lat: e.latLng.lat(), lng: e.latLng.lng() })
					}
					defaultCenter={locationValue}
				>
					{locationValue && <Marker position={locationValue} />}
					{existingLocations &&
						existingLocations.map(({ lat, lng, label }) => (
							<Marker position={{ lat, lng }} label={label} />
						))}
				</GMaps>
			</Grid>
		</Form>
	);
}

const styles = {
	locationSelectDialogButton: {
		width: "100%"
	},
	dialog: {
		width: "100%"
	}
};

export default withStyles(styles)(LocationForm);
