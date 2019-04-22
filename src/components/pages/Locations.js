import React from "react";
import { Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import NewLocationButtonDialog from "../containers/forms/NewLocationButtonDialog";
import LocationsView from "../containers/display/LocationsView";

function Locations({ classes }) {
	return (
		<Paper className={classes.root}>
			<NewLocationButtonDialog />
			<LocationsView />
		</Paper>
	);
}
const styles = theme => ({
	root: {
		padding: theme.spacing.unit * 3,
		margin: theme.spacing.unit * 3,
		"& > :not(:last-child)": {
			marginBottom: theme.spacing.unit * 3
		}
	}
});

export default withStyles(styles)(Locations);
