import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Grid, Button } from "@material-ui/core";
import VehicleForm from "../../../presentational/forms/VehicleForm";
import * as actions from "../../../../actions";
import api from "../../../../utils/helpers/api";
import { BookingChargeUnit } from "../../../../variables/enums";

function VehicleFormContainer({
	onSubmit,
	values,
	readOnly,
	exclude,
	title,
	loading,
	hints,
	onChangeEvent,
	errorNotes,
	locations,
	showFooter,
	categories,
	wialonUnits,
	fetchVehicles
}) {
	let [errors, setErrors] = useState({});
	let [disableButton, setDisabledButton] = useState(false);
	const [newIssueValue, setNewIssueValue] = useState("");
	const [vehicleIssueMenuOpen, setVehicleIssueMenuOpen] = useState(false);
	const [vehicleIssueMenuLoading, setVehicleIssueMenuLoading] = useState(false);

	useEffect(() => {
		let validForm = true;
		for (let key in errors) {
			if (errors[key].length) {
				validForm = false;
			}
		}
		setDisabledButton(!validForm);
	}, [errors, values]);

	let locationList = [{ value: "", label: "Loading..." }];
	let categoryList = [
		{
			value: "",
			label: "Loading"
		}
	];

	let wialonUnitList = [
		{
			value: "",
			label: "Loading"
		}
	];
	let bookingChargeUnitList = Object.values(BookingChargeUnit).map(unit => ({
		value: unit,
		label: unit
	}));

	if (locations && locations.data) {
		let $locationList = locations.data.map(({ id, name }) => ({
			value: id,
			label: name
		}));
		locationList = $locationList.length
			? $locationList
			: [{ value: "", label: "No locations found..." }];
	}

	if (categories && categories.data) {
		categoryList = categories.data.map(({ id, name }) => ({
			value: id,
			label: name
		}));
	}

	if (wialonUnits && wialonUnits.data) {
		wialonUnitList = wialonUnits.data.map(({ id, nm }) => ({
			value: id,
			label: nm
		}));
	}

	let footer = showFooter && (
		<Fragment>
			<Grid item>
				<Button
					disabled={loading || disableButton}
					type="submit"
					variant="contained"
					color="primary"
					onClick={e => {
						e.preventDefault();
						onSubmit(e);
					}}
				>
					Confirm
				</Button>
			</Grid>
		</Fragment>
	);
	return (
		<VehicleForm
			exclude={exclude}
			title={title}
			values={values}
			locationList={locationList}
			onChangeEvent={onChangeEvent}
			errorNotes={errorNotes}
			footer={footer}
			onError={setErrors}
			errors={errors}
			hints={hints}
			readOnly={readOnly}
			categoryList={categoryList}
			wialonUnitList={wialonUnitList}
			bookingChargeUnitList={bookingChargeUnitList}
			vehicleIssues={values.vehicleIssues}
			vehicleIssueMenuValue={newIssueValue}
			vehicleIssueMenuOpen={vehicleIssueMenuOpen}
			vehicleIssueMenuLoading={vehicleIssueMenuLoading}
			onVehicleIssueMenuOpen={() => {
				setVehicleIssueMenuOpen(true);
			}}
			onVehicleIssueMenuChange={setNewIssueValue}
			onVehicleIssueMenuAdd={async value => {
				setVehicleIssueMenuLoading(true);
				await api.createVehicleIssue({
					vehicleId: values.id,
					message: value
				});
				await fetchVehicles();
				setVehicleIssueMenuLoading(false);
				setVehicleIssueMenuOpen(false);
			}}
			onVehicleIssueMenuDelete={async issue => {
				setVehicleIssueMenuLoading(true);
				await api.deleteVehicleIssue(issue.id);
				await fetchVehicles();
				setVehicleIssueMenuLoading(false);
				setVehicleIssueMenuOpen(false);
			}}
			onVehicleIssueMenuClose={() => {
				setVehicleIssueMenuOpen(false);
			}}
		/>
	);
}
const mapStateToProps = ({ vehicles, locations, categories, wialonUnits }) => ({
	vehicles,
	locations,
	categories,
	wialonUnits
});

export default connect(mapStateToProps, actions)(VehicleFormContainer);
