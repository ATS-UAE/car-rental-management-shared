import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import * as actions from "../../actions";
import BookingFormCreateButtonDialog from "../containers/forms/bookings/BookingFormCreateButtonDialog";
import BookingTableView from "../containers/display/BookingTableView";

function Bookings({ classes, fetchUsers }) {
	useEffect(() => {
		fetchUsers();
	}, []);
	return (
		<Paper className={classes.root}>
			<BookingFormCreateButtonDialog />
			<BookingTableView />
		</Paper>
	);
}
const styles = theme => ({
	root: {
		padding: theme.spacing(3),
		[theme.breakpoints.down("sm")]: {
			padding: theme.spacing(1)
		},
		height: "100%",
		overflow: "auto"
	}
});

export default compose(
	withStyles(styles),
	connect(
		null,
		actions
	)
)(Bookings);
