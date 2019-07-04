import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { Switch, Route } from "react-router";
import { withStyles, Button, Paper } from "@material-ui/core";
import classNames from "classnames";
import * as reduxActions from "../../actions";
import { roles } from "../../variables/enums";
import BookingFormCreateStepper from "../containers/forms/bookings/BookingFormCreateStepper";
import BookingTableView from "../containers/display/BookingTableView";

function Bookings({
	classes,
	auth,
	fetchUsers,
	fetchEnums,
	fetchVehicles,
	fetchLocations,
	fetchBookings,
	fetchCurrentUserDetails,
	history
}) {
	useEffect(() => {
		const start = () => {
			fetchBookings();
			fetchUsers();
			fetchEnums();
			fetchVehicles();
			fetchLocations();
			fetchCurrentUserDetails();
		};
		start();
	}, []);
	return (
		<Paper className={classNames(classes.root, classes.items)}>
			<Switch>
				<Route
					path="/bookings/new"
					render={props => <BookingFormCreateStepper {...props} />}
				/>
				<Route
					path="/bookings"
					render={props => {
						return (
							<Fragment>
								<div className={classes.items}>
									{auth && auth.data && auth.data.role.name === roles.GUEST && (
										<Button
											variant="contained"
											color="primary"
											onClick={() => history.push("/bookings/new")}
										>
											Book a vehicle
										</Button>
									)}

									<BookingTableView {...props} />
								</div>
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
			padding: theme.spacing(1),
			"& > :not(:last-child)": {
				marginBottom: theme.spacing(1)
			}
		},
		height: "100%",
		overflow: "auto"
	},
	items: {
		"&:not(:last-child)": {
			marginBottom: theme.spacing(2),
			[theme.breakpoints.down("sm")]: {
				marginBottom: theme.spacing(1),
				"& > :not(:last-child)": {
					marginBottom: theme.spacing(1)
				}
			}
		}
	}
});

const mapStateToProps = ({ auth }) => ({ auth });

export default compose(
	withStyles(styles),
	connect(
		mapStateToProps,
		reduxActions
	)
)(Bookings);
