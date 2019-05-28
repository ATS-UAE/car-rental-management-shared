import React from "react";
import { withStyles } from "@material-ui/core";
import Form from "./Form";
import GMaps from "../display/GMaps";
import { Marker } from "react-google-maps";
import { validators } from "../../../utils";

function GuestSignUp({
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
	vehicles,
	values,
	buttonLabel,
	footer
}) {
	const fields = [
		{
			type: GMaps,
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
				children: vehicles
					? vehicles.map(location => {
							const { lat, lng, name } = location;
							return (
								<Marker
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

export default withStyles(styles)(GuestSignUp);
