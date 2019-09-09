import React from "react";
import { validators } from "../../../utils/helpers";
import Form, { FIELDS } from "./Form";
const { TEXT, SELECT, IMAGE, MULTI } = FIELDS;

function VehicleForm({
	title,
	exclude,
	errorNotes,
	onChangeEvent,
	values,
	locationList,
	footer,
	onError,
	errors,
	readOnly,
	hints,
	categoryList,
	wrapper
}) {
	const fields = [
		{
			type: IMAGE,
			name: "vehicleImageSrc",
			id: "vehicle-image",
			persistEvent: true,
			GridProps: {
				xs: 12,
				sm: 12,
				md: 12
			},
			props: {
				label: "Select vehicle picture",
				main: true,
				icon: "DirectionsCar"
			}
		},
		{
			type: TEXT,
			id: "object-id",
			name: "objectId",
			validators: [validators.requiredField],
			props: {
				label: "Object Number",
				required: true
			}
		},
		{
			type: TEXT,
			id: "brand",
			name: "brand",
			validators: [validators.requiredField],
			props: {
				label: "Vehicle Brand",
				required: true
			}
		},
		{
			type: TEXT,
			id: "model",
			name: "model",
			validators: [validators.requiredField],
			props: {
				label: "Vehicle Model",
				required: true
			}
		},
		{
			type: TEXT,
			id: "plate-number",
			name: "plateNumber",
			validators: [validators.requiredField],
			props: {
				label: "Plate Number",
				required: true
			}
		},
		{
			type: TEXT,
			id: "vin",
			name: "vin",
			validators: [validators.requiredField],
			props: {
				label: "VIN",
				required: true
			}
		},
		{
			type: TEXT,
			id: "parking-location",
			name: "parkingLocation",
			props: {
				label: "Parking Location Description"
			}
		},
		{
			type: SELECT,
			id: "location-id",
			name: "locationId",
			props: {
				label: "Location",
				fullWidth: true,
				items: locationList
			}
		},
		{
			type: MULTI,
			id: "categories",
			name: "categories",
			props: {
				label: "Vehicle Categories",
				items: categoryList
			}
		}
	];

	return (
		<Form
			title={title}
			fields={fields}
			exclude={exclude}
			errorNotes={errorNotes}
			onChangeEvent={onChangeEvent}
			values={values}
			footer={footer}
			errors={errors}
			onError={onError}
			hints={hints}
			readOnly={readOnly}
			wrapper={wrapper}
		/>
	);
}

export default VehicleForm;
