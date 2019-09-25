import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Grid } from "@material-ui/core";
import LocationMapMarker from "../display/LocationMapMarker";
import WorldMap from "../display/WorldMap";
import Form, { FIELDS } from "./Form";
import { validators, Validator } from "../../../utils/helpers";
const { SELECT, DATE_TIME_PICKER } = FIELDS;

function BookingForm({
	title,
	exclude,
	errorNotes,
	errors,
	onError,
	values,
	userList,
	bookingTypeList,
	vehicleList,
	footer,
	hints,
	onChange,
	locations,
	readOnly,
	onLocationClick,
	allowBefore,
	showMap,
	fieldProps,
	unavailableVehicleErrorText,
	children
}) {
	const notBefore = new Validator(
		() => values.from > moment().unix(),
		"Value should not be before current date."
	);

	const startLessEnd = new Validator(
		() => values.from < values.to,
		"Start date should not be greater than end date"
	);

	const endGreaterStart = new Validator(
		() => values.to > values.from,
		"End date should not be greater than end date"
	);

	const fields = [
		{
			type: DATE_TIME_PICKER,
			id: "from",
			name: "from",
			validators: [validators.requiredField, startLessEnd],
			props: {
				label: "Book Start",
				fullWidth: true
			}
		},
		{
			type: DATE_TIME_PICKER,
			id: "to",
			name: "to",
			validators: [validators.requiredField, endGreaterStart],
			props: {
				label: "Book End",
				fullWidth: true
			}
		},
		{
			type: SELECT,
			id: "user-id",
			name: "userId",
			validators: [validators.requiredField],
			props: {
				label: "User",
				items: userList,
				required: true
			}
		},
		{
			type: SELECT,
			id: "booking-type-id",
			name: "bookingTypeId",
			validators: [validators.requiredField],
			props: {
				label: "Booking Type",
				items: bookingTypeList,
				fullWidth: true,
				required: true
			}
		},
		{
			type: SELECT,
			id: "vehicle-id",
			name: "vehicleId",
			validators: [
				validators.requiredField,
				new Validator(
					id => Boolean(vehicleList.find(v => v.value === id)),
					unavailableVehicleErrorText
				)
			],
			props: {
				label: "Vehicle",
				items: vehicleList,
				fullWidth: true,
				required: true
			}
		}
	];
	if (!allowBefore) fields[0].validators.push(notBefore);
	let $fields = fields.map(field => ({
		...field,
		...(fieldProps && fieldProps[field.name])
	}));
	return (
		<Form
			title={title}
			fields={$fields}
			exclude={exclude}
			errorNotes={errorNotes}
			errors={errors}
			onError={onError}
			values={values}
			footer={footer}
			hints={hints}
			onChange={onChange}
			readOnly={readOnly}
		>
			{showMap && (
				<Grid item xs={12}>
					<WorldMap
						defaultCenter={
							values &&
							values.locationId &&
							locations &&
							locations.reduce((acc, location) => {
								if (values.locationId === location.id)
									acc = { lat: location.lat, lng: location.lng };
								return acc;
							})
						}
					>
						{locations &&
							locations.map(location => {
								const { lat, lng, name, locationImageSrc } = location;
								return (
									<LocationMapMarker
										src={locationImageSrc}
										position={{ lat: lat, lng: lng }}
										label={name}
										key={lat + lng + name}
										onClick={() => onLocationClick && onLocationClick(location)}
									/>
								);
							})}
					</WorldMap>
				</Grid>
			)}
			{children}
		</Form>
	);
}

BookingForm.propTypes = {
	unavailableVehicleErrorText: PropTypes.string
};

BookingForm.defaultProps = {
	unavailableVehicleErrorText: "Vehicle is not available anymore."
};

export default BookingForm;
