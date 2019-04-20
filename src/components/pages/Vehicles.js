import React from "react";
import { Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import NewVehicleButtonDialog from "../containers/forms/NewVehicleButtonDialog";
import VehicleTableView from "../containers/display/VehicleTableView";
import LocationSelector from "../presentational/inputs/LocationSelector";
function Vehicles({ classes }) {
	return (
		<Paper className={classes.root}>
			<NewVehicleButtonDialog />
			<VehicleTableView />
			<LocationSelector />
		</Paper>
	);
}
const styles = theme => ({
	root: {
		padding: theme.spacing.unit * 3,
		margin: theme.spacing.unit * 3
	}
});

export default withStyles(styles)(Vehicles);
