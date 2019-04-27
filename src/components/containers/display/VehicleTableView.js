import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Grid, Button } from "@material-ui/core";
import * as actions from "../../../actions";
import TableView from "../../presentational/forms/TableView";
import VehicleForm from "../../presentational/forms/VehicleForm";
import { api } from "../../../utils";
import { RESOURCES, ACTIONS } from "../../../variables";
import Can from "../layout/Can";

function VehicleTableView({
	vehicles,
	fetchVehicles,
	fetchLocations,
	locations,
	onSubmit
}) {
	useEffect(() => {
		fetchVehicles();
	}, []);
	const [open, setOpen] = useState(false);
	const [formData, setFormData] = useState({});
	const [newVehicle, setNewVehicle] = useState({});
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

	const tableBody = vehicles
		? vehicles.data.map(vehicle => {
				let row = {
					metadata: vehicle,
					values: [
						{ value: vehicle.brand },
						{ value: vehicle.model },
						{ value: vehicle.plateNumber },
						{ value: vehicle.vin }
					],
					onClick: () => {
						setOpen(true);
						setFormData(vehicle);
					}
				};
				return row;
		  })
		: [];
	return (
		<TableView
			open={open}
			onClose={() => {
				setFormData({});
				setOpen(false);
			}}
			editable={true}
			tableData={{
				headers: [
					{
						values: [
							{ value: "Vehicle Brand" },
							{ value: "Vehicle Model" },
							{ value: "Plate Number" },
							{ value: "VIN" }
						]
					}
				],
				body: tableBody
			}}
		>
			<Can
				action={ACTIONS.UPDATE}
				resource={RESOURCES.VEHICLES}
				yes={() => {
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
										.updateVehicle(formData)
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
						<VehicleForm
							values={newVehicle}
							onChange={setNewVehicle}
							errors={errors}
							onError={setErrors}
							footer={footer}
							errorNotes={errorNotes}
							title="Update Vehicle"
							locations={parkingLocations}
						/>
					);
				}}
				no={access => (
					<VehicleForm
						values={newVehicle}
						onChange={setNewVehicle}
						errors={errors}
						onError={setErrors}
						errorNotes={errorNotes}
						locations={parkingLocations}
						hints=""
						readOnly={true}
						exclude={access.excludedFields}
					/>
				)}
			/>
		</TableView>
	);
}

const mapStateToProps = ({ vehicles, locations, enums }) => ({
	vehicles,
	locations,
	enums
});

export default connect(
	mapStateToProps,
	actions
)(VehicleTableView);
