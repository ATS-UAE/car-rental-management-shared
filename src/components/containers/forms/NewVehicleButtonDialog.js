import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Grid, Button } from "@material-ui/core";
import VehicleForm from "../../presentational/forms/VehicleForm";
import * as reduxActions from "../../../actions";
import { api } from "../../../utils";
import DialogButton from "../../presentational/forms/DialogButton";
import { resources, actions } from "../../../variables/enums";
import Can from "../layout/Can";

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
	let [errors, setErrors] = useState({});
	useEffect(() => {
		let validForm = true;
		for (let key in errors) {
			if (errors[key].length) {
				validForm = false;
			}
		}
		setDisabledButton(!validForm);
	}, [errors]);

	useEffect(() => {
		fetchLocations();
	}, []);

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
	return (
		<Can
			action={actions.CREATE}
			resource={resources.VEHICLES}
			yes={() => (
				<DialogButton
					open={open}
					onClick={() => setOpen(true)}
					onClose={() => setOpen(false)}
				>
					<VehicleForm
						values={newVehicle}
						onChange={setNewVehicle}
						errors={errors}
						onError={setErrors}
						footer={footer}
						errorNotes={errorNotes}
						title="Create Vehicle"
						locations={parkingLocations}
					/>
				</DialogButton>
			)}
		/>
	);
}

const mapStateToProps = ({ locations }) => ({ locations });

export default connect(
	mapStateToProps,
	reduxActions
)(NewVehicleButtonDialog);
