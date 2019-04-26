import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Grid, Button } from "@material-ui/core";
import VehicleForm from "../../presentational/forms/VehicleForm";
import * as actions from "../../../actions";
import { api } from "../../../utils";
import DialogButton from "../../presentational/forms/DialogButton";

function NewVehicleButtonDialog({
	fetchVehicles,
	fetchLocations,
	locations,
	onSubmit
}) {
	const [newVehicle, setNewVehicle] = useState({});
	let [open, setOpen] = useState(false);
	let [disableButton, setDisabledButton] = useState(false);
	let [errorNotes, setErrorNotes] = useState([]);
	let [fieldErrors, setFieldErrors] = useState({});
	useEffect(() => {
		let validForm = true;
		for (let key in fieldErrors) {
			if (fieldErrors[key].length) {
				validForm = false;
			}
		}
		setDisabledButton(!validForm);
	}, [fieldErrors]);

	useEffect(() => {
		if (!locations) {
			fetchLocations();
		}
	});

	let parkingLocations = [
		{
			value: "",
			label: "Loading..."
		}
	];
	if (locations && locations.data) {
		parkingLocations = [
			{ value: null, label: "None" },
			...locations.data.map(({ id, name }) => ({ value: id, label: name }))
		];
	}

	const footer = (
		<Grid item>
			<Button
				disabled={disableButton}
				type="submit"
				variant="contained"
				color="primary"
				onClick={e => {
					e.preventDefault();
					setDisabledButton(true);
					api
						.createVehicle(newVehicle)
						.then(() => {
							fetchVehicles();
							setOpen(false);
							setNewVehicle({});
							setDisabledButton(false);
							setOpen(false);
							onSubmit && onSubmit();
						})
						.catch(e => {
							setErrorNotes([e]);
							setDisabledButton(false);
						});
				}}
			>
				Confirm
			</Button>
		</Grid>
	);
	console.log(fieldErrors);
	return (
		<DialogButton
			open={open}
			onClick={() => setOpen(true)}
			onClose={() => setOpen(false)}
		>
			<VehicleForm
				values={newVehicle}
				onChange={(data, name, errors) => {
					setNewVehicle(data);

					setFieldErrors({ ...fieldErrors, [name]: errors });
				}}
				footer={footer}
				errorNotes={errorNotes}
				title="Create Vehicle"
				locations={parkingLocations}
			/>
		</DialogButton>
	);
}

const mapStateToProps = ({ locations }) => ({ locations });

export default connect(
	mapStateToProps,
	actions
)(NewVehicleButtonDialog);
