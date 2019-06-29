import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Grid, Button } from "@material-ui/core";
import VehicleForm from "../../../presentational/forms/VehicleForm";

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
	categories
}) {
	let [errors, setErrors] = useState({});
	let [disableButton, setDisabledButton] = useState(false);

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
		/>
	);
}
const mapStateToProps = ({ vehicles, locations, categories }) => ({
	vehicles,
	locations,
	categories
});

export default connect(mapStateToProps)(VehicleFormContainer);
