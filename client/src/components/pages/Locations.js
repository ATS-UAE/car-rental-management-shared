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
		display: "flex",
		flexDirection: "column",
		padding: theme.spacing(3),
		"& > :not(:last-child)": {
			marginBottom: theme.spacing(3)
		},
		[theme.breakpoints.down("sm")]: {
			padding: theme.spacing(1),
			"& > :not(:last-child)": {
				marginBottom: theme.spacing(1)
			}
		},
		height: "100%",
		overflow: "auto"
	}
});

export default withStyles(styles)(Locations);
