import React, { useState } from "react";
import { Paper, Button, Dialog } from "@material-ui/core";
import VehicleCreate from "../containers/forms/VehicleCreate";
import VehicleTableView from "../containers/display/VehicleTableView";
export default function Vehicles() {
	let [open, setOpen] = useState(false);
	return (
		<Paper>
			<VehicleTableView />
			<Button
				color="primary"
				variant="contained"
				onClick={() => {
					setOpen(true);
				}}
			>
				New
			</Button>
			<Dialog
				open={open}
				onClose={() => {
					setOpen(false);
				}}
			>
				<VehicleCreate onSubmit={() => setOpen(false)} />
			</Dialog>
		</Paper>
	);
}
