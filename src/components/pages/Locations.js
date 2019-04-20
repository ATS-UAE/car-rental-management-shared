import React from "react";
import { Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import NewLocationButtonDialog from "../containers/forms/NewLocationButtonDialog";

function Locations({ classes }) {
	return (
		<Paper className={classes.root}>
			<NewLocationButtonDialog />
		</Paper>
	);
}
const styles = theme => ({
	root: {
		padding: theme.spacing.unit * 3,
		margin: theme.spacing.unit * 3
	}
});

export default withStyles(styles)(Locations);
