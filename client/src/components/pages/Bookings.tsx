import React, { useEffect, Fragment, FC } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { History } from "history";
import { Switch, Route, RouteComponentProps } from "react-router";
import {
	withStyles,
	Button,
	Paper,
	WithStyles,
	createStyles,
	Theme
} from "@material-ui/core";
import classNames from "classnames";
import * as actions from "../../actions";
import { Role as RoleEnum } from "../../variables/enums";
// import BookingFormCreateStepper from "../containers/forms/bookings/BookingFormCreateStepper";
import { BookingCreateFormStepper, Role } from "../containers";
import BookingTableView from "../containers/display/BookingTableView";
import {
	BookingTable,
	ModalConfirmDeleteBooking,
	ModalFormBookingUpdate,
	ModalFormFinalizeBooking,
	ModalConfirmPayBooking
} from "../containers";
import { Auth, WithServerResponse } from "../../typings/api";
interface IBookingsPage extends RouteComponentProps, WithStyles<typeof styles> {
	auth: WithServerResponse<Auth>;
	history: History;
}

const Bookings: FC<typeof actions & IBookingsPage> = ({
	classes,
	auth,
	fetchUsers,
	fetchVehicles,
	fetchLocations,
	fetchBookings,
	fetchCurrentUserDetails,
	history
}) => {
	useEffect(() => {
		fetchBookings();
		fetchUsers();
		fetchVehicles();
		fetchLocations();
		fetchCurrentUserDetails();
	}, []);

	return (
		<Paper className={classNames(classes.root, classes.items)}>
			<Route
				path="/bookings/delete/:id"
				render={props => <ModalConfirmDeleteBooking {...props} />}
			/>
			<Route
				path="/bookings/edit/:id"
				render={props => <ModalFormBookingUpdate {...props} />}
			/>
			<Route
				path="/bookings/pay/:id"
				render={props => <ModalConfirmPayBooking {...props} />}
			/>
			<Route
				path="/bookings/finalize/:id"
				render={props => <ModalFormFinalizeBooking {...props} />}
			/>
			<Switch>
				<Route
					path="/bookings/new"
					render={props => <BookingCreateFormStepper {...props} />}
				/>
				<Route
					path="/bookings"
					render={props => (
						<div className={classes.items}>
							<Role excludes={[RoleEnum.KEY_MANAGER]}>
								<Button
									variant="contained"
									color="primary"
									onClick={() => history.push("/bookings/new")}
								>
									Book a vehicle
								</Button>
							</Role>
							<BookingTable {...props} />
						</div>
					)}
				/>
			</Switch>
		</Paper>
	);
};
const styles = (theme: Theme) =>
	createStyles({
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
			"& > :not(:last-child)": {
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

const mapStateToProps = ({ auth }: Pick<IBookingsPage, "auth">) => ({ auth });

export default compose<typeof actions & IBookingsPage, {}>(
	withStyles(styles),
	connect(mapStateToProps, actions)
)(Bookings);
