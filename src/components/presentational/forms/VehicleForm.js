import React from "react";

import Form, { FIELDS } from "./Form";
const { TEXT, SELECT } = FIELDS;

function VehicleForm({
	values,
	errorNotes,
	errors,
	onSubmit,
	onValid,
	onChange,
	onError,
	include,
	buttonLabel,
	title
}) {
	const fields = [
		{
			type: TEXT,
			id: "object-id",
			name: "objectId",
			props: {
				label: "Object Number",
				required: true
			}
		},
		{
			type: TEXT,
			id: "brand",
			name: "brand",
			props: {
				label: "Vehicle Brand",
				required: true
			}
		},
		{
			type: TEXT,
			id: "model",
			name: "model",
			props: {
				label: "Vehicle Model",
				required: true
			}
		},
		{
			type: TEXT,
			id: "plate-number",
			name: "plateNumber",
			props: {
				label: "Plate Number",
				required: true
			}
		},
		{
			type: TEXT,
			id: "vin",
			name: "vin",
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
				items: [{ value: 1, label: "ATS Office" }]
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
		/>
	);
}

export default VehicleForm;
