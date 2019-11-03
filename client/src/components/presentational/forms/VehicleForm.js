import React from "react";
import pluralize from "pluralize";
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
	bookingChargeUnitList,
	wrapper,
	wialonUnitList
}) {
	const unit = bookingChargeUnitList.find(
		item => item.value === values.bookingChargeUnitId
	);

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
			type: SELECT,
			id: "wialon-unit-id",
			name: "wialonUnitId",
			props: {
				label: "Wialon Unit",
				fullWidth: true,
				items: wialonUnitList
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
		},
		{
			type: SELECT,
			id: "booking-charge-unit",
			name: "bookingChargeUnitId",
			props: {
				label: "Cost Type",
				fullWidth: true,
				items: bookingChargeUnitList,
				haveNone: true
			}
		},
		{
			type: TEXT,
			id: "booking-charge-value",
			name: "bookingChargeCount",
			props: {
				disabled: !values.bookingChargeUnitId,
				label: `Charge per ${(unit && unit.label) || ""} `,
				type: "number"
			}
		},
		{
			type: TEXT,
			id: "booking-charge",
			name: "bookingCharge",
			props: {
				disabled: !values.bookingChargeUnitId,
				label:
					(values.bookingChargeUnitId &&
						`Booking Charge per ${values.bookingChargeCount || 0} ${pluralize(
							bookingChargeUnitList.find(
								item => item.value === values.bookingChargeUnitId
							).label,
							values.bookingChargeCount
						)}`) ||
					"Booking Charge",
				type: "number"
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
