import React from "react";
import { withStyles } from "@material-ui/core";
import Form from "./Form";
import WorldMap from "../display/WorldMap";
import LocationMapMarker from "../display/LocationMapMarker";
import { validators } from "../../../utils/helpers";

function LocationMapSelectForm({
	classes,
	gMapsProps,
	title,
	exclude,
	errorNotes,
	errors,
	onSubmit,
	onValid,
	onMarkerClick,
	onError,
	locations,
	values,
	buttonLabel,
	footer
}) {
	const fields = [
		{
			type: WorldMap,
			name: "locationId",
			id: "location-id",
			validators: [validators.requiredField],
			GridProps: {
				xs: 12,
				sm: 12,
				className: classes.fullHeight
			},
			props: {
				...gMapsProps,
				classes: {
					root: classes.fullHeight
				},
				children: locations
					? locations.map(location => {
							const { id, lat, lng, name, locationImageSrc } = location;
							return (
								<LocationMapMarker
									active={values.locationId === id}
									locationImageSrc={locationImageSrc}
									position={{ lat: lat, lng: lng }}
									label={name}
									key={lat + lng + name}
									onClick={() => onMarkerClick(location.id)}
								/>
							);
					  })
					: []
			}
		}
	];

	return (
		<Form
			classes={{ root: classes.fullHeight, gridContainer: classes.fullHeight }}
			title={title}
			fields={fields}
			exclude={exclude}
			errorNotes={errorNotes}
			errors={errors}
			onSubmit={onSubmit}
			onValid={onValid}
			onError={onError}
			values={values}
			buttonLabel={buttonLabel}
			footer={footer}
			hints=""
		/>
	);
}

const styles = {
	fullHeight: {
		height: "100%",
		overflow: "hidden"
	}
};

export default withStyles(styles)(LocationMapSelectForm);
