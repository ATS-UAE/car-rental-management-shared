import React from "react";
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import WorldMap from "../display/WorldMap";
import LocationMapMarker from "../display/LocationMapMarker";
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
	footer,
	errors,
	onError
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
			errors={errors}
			onError={onError}
		>
			<Grid item xs={12}>
				<WorldMap
					onClick={({ latlng }) =>
						onMapClick && onMapClick({ lat: latlng.lat, lng: latlng.lng })
					}
					defaultCenter={locationValue}
				>
					{locationValue && (
						<LocationMapMarker
							locationImageSrc={values.locationImageSrc}
							position={locationValue}
						/>
					)}
					{existingLocations &&
						existingLocations.map(({ lat, lng, label, locationImageSrc }) => (
							<LocationMapMarker
								src={locationImageSrc}
								position={{ lat, lng }}
								label={label}
								key={lat + lng + label}
							/>
						))}
				</WorldMap>
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
