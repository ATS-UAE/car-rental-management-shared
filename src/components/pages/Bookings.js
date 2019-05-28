import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { Switch, Route } from "react-router";
import { withStyles, Button, Paper } from "@material-ui/core";
import * as reduxActions from "../../actions";
import { resources, actions } from "../../variables/enums";
import Can from "../containers/layout/Can";
import BookingFormCreateStepper from "../containers/forms/bookings/BookingFormCreateStepper";
import BookingTableView from "../containers/display/BookingTableView";

function Bookings({
	classes,
	fetchUsers,
	fetchEnums,
	fetchVehicles,
	fetchLocations,
	fetchBookings,
	fetchCurrentUserDetails,
	history
}) {
	useEffect(() => {
		fetchBookings();
		fetchUsers();
		fetchEnums();
		fetchVehicles();
		fetchLocations();
		fetchCurrentUserDetails();
	}, []);
	return (
		<Paper className={classes.root}>
			<Switch>
				<Route
					path="/bookings/new"
					render={() => <BookingFormCreateStepper />}
				/>
				<Route
					path="/bookings"
					render={() => {
						return (
							<Fragment>
								<Can
									action={actions.CREATE}
									resource={resources.BOOKINGS}
									yes={createAccess => (
										<Button
											variant="contained"
											color="primary"
											onClick={() => history.push("/bookings/new")}
										>
											Book a vehicle
										</Button>
									)}
								/>
								<BookingTableView />
							</Fragment>
						);
					}}
				/>
			</Switch>
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
		reduxActions
	)
)(Bookings);
