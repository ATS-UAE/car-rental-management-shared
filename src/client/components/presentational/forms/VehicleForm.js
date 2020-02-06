import React from "react";
import pluralize from "pluralize";
import { Grid } from "@material-ui/core";

import { VehicleIssuesEditor, ButtonModal } from "../";
import { validators } from "../../../utils/helpers";
import Form, { FIELDS } from "./Form";
const { TEXT, SELECT, IMAGE, MULTI } = FIELDS;

function VehicleForm({
	title,
	exclude,
	errorNotes,
	onChangeEvent,
	values,
	locationList = [{ label: "No list found...", value: "" }],
	footer,
	onError,
	errors,
	readOnly,
	hints,
	showVehicleIssues = true,
	vehicleIssues = [],
	vehicleIssueMenuValue,
	onVehicleIssueMenuChange,
	vehicleIssueMenuOpen,
	vehicleIssueMenuLoading,
	onVehicleIssueMenuOpen,
	onVehicleIssueMenuAdd,
	onVehicleIssueMenuDelete,
	onVehicleIssueMenuClose,
	categoryList = [{ label: "No list found...", value: "" }],
	bookingChargeUnitList = [{ label: "No list found...", value: "" }],
	wrapper,
	wialonUnitList = [{ label: "No list found...", value: "" }]
}) {
	const unit = bookingChargeUnitList.find(
		item => item.value === values.bookingChargeUnit
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
			name: "bookingChargeUnit",
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
				disabled: !values.bookingChargeUnit,
				label: `Charge per ${(unit && unit.label) || ""} `,
				type: "number"
			}
		},
		{
			type: TEXT,
			id: "booking-charge",
			name: "bookingCharge",
			props: {
				disabled: !values.bookingChargeUnit,
				label:
					(values.bookingChargeUnit &&
						`Booking Charge per ${values.bookingChargeCount || 0} ${pluralize(
							values.bookingChargeUnit,
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
		>
			{showVehicleIssues && (
				<Grid item xs={12} sm={6}>
					<ButtonModal
						buttonProps={{
							fullWidth: true,
							children: "Vehicle Issues"
						}}
						onClick={onVehicleIssueMenuOpen}
						onClose={onVehicleIssueMenuClose}
						open={vehicleIssueMenuOpen}
					>
						<VehicleIssuesEditor
							onChange={onVehicleIssueMenuChange}
							loading={vehicleIssueMenuLoading}
							values={vehicleIssues}
							newValue={vehicleIssueMenuValue}
							onAdd={onVehicleIssueMenuAdd}
							onDelete={onVehicleIssueMenuDelete}
						/>
					</ButtonModal>
				</Grid>
			)}
		</Form>
	);
}

export default VehicleForm;
