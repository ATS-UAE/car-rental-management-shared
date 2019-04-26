import React from "react";
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Marker } from "react-google-maps";
import GMaps from "../display/GMaps";
import Form, { FIELDS } from "./Form";
import { validators } from "../../../utils";

const { TEXT } = FIELDS;

function LocationForm({
	title,
	exclude,
	errorNotes,
	onChange,
	values,
	onMapClick,
	locationValue,
	existingLocations,
	footer
}) {
	const fields = [
		{
			type: TEXT,
			id: "location-name",
			name: "name",
			validators: [validators.requiredField],
			props: {
				label: "Location Name",
				required: true
			}
		},
		{
			type: TEXT,
			id: "full-address",
			name: "address",
			validators: [validators.requiredField],
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
			exclude={exclude}
			errorNotes={errorNotes}
			onChange={onChange}
			values={values}
			footer={footer}
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
							<Marker
								position={{ lat, lng }}
								label={label}
								key={lat + lng + label}
							/>
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
