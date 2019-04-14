import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import TableView from "../../presentational/forms/TableView";
import VehicleUpdate from "../forms/VehicleUpdate";

function VehicleTableView({ vehicles, fetchVehicles, onSubmit }) {
	useEffect(() => {
		fetchVehicles();
	}, []);
	const [open, setOpen] = useState(false);
	const [formData, setFormData] = useState({});

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
			onClose={() => setOpen(false)}
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
			<VehicleUpdate
				values={formData}
				onChange={setFormData}
				onSubmit={() => onSubmit && onSubmit()}
			/>
		</TableView>
	);
}

const mapStateToProps = ({ vehicles, enums }) => ({ vehicles, enums });

export default connect(
	mapStateToProps,
	actions
)(VehicleTableView);
