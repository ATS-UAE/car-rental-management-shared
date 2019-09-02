import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { Grid, Button } from "@material-ui/core";
import * as reduxActions from "../../../actions";
import TableView from "../../presentational/forms/TableView";
import VehicleForm from "../../presentational/forms/VehicleForm";
import { api } from "../../../utils";
import { resources, actions } from "../../../variables/enums";
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
		fetchLocations();
	}, []);
	const [open, setOpen] = useState(false);
	const [formData, setFormData] = useState({});
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
						api.fetchVehicle(vehicle.id).then(res => {
							setFormData({
								...res.data
							});
						});
					}
				};
				return row;
		  })
		: [];
	return (
		<Fragment>
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
					action={actions.UPDATE}
					resource={resources.VEHICLES}
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
												setFormData({});
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
								values={formData}
								onChange={setFormData}
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
							values={formData}
							onChange={setFormData}
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
		</Fragment>
	);
}

const mapStateToProps = ({ vehicles, locations, enums }) => ({
	vehicles,
	locations,
	enums
});

export default connect(
	mapStateToProps,
	reduxActions
)(VehicleTableView);
