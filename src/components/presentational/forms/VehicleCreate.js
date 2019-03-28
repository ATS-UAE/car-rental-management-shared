import React from "react";

import Form, { FIELDS } from "./Form";
const { TEXT } = FIELDS;

function VehicleCreate({
	values,
	errorNotes,
	errors,
	onSubmit,
	onValid,
	onChange,
	onError
}) {
	const fields = [
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
		}
	];
	return (
		<Form
			title="Vehicle Create"
			fields={fields}
			errorNotes={errorNotes}
			errors={errors}
			onSubmit={onSubmit}
			onValid={onValid}
			onChange={onChange}
			onError={onError}
			values={values}
		/>
	);
}

export default VehicleCreate;
