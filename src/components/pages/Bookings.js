import React from "react";
import { Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import BookingFormCreateButtonDialog from "../containers/forms/bookings/BookingFormCreateButtonDialog";
import BookingTableView from "../containers/display/BookingTableView";

function Bookings({ classes }) {
	return (
		<Paper className={classes.root}>
			<BookingFormCreateButtonDialog />
			<BookingTableView />
		</Paper>
	);
}
const styles = theme => ({
	root: {
		padding: theme.spacing.unit * 3,
		margin: theme.spacing.unit * 3
	}
});

export default withStyles(styles)(Bookings);
