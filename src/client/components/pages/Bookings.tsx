import React, { useEffect, FC } from "react";
import { connect, ResolveThunks, MapStateToProps } from "react-redux";
import { compose } from "recompose";
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
import { Role as RoleEnum } from "../../../shared/typings";
import { BookingCreateFormStepper, Role } from "../containers";
import {
	BookingTable,
	ModalConfirmDeleteBooking,
	ModalFormBookingUpdate,
	ModalFormFinalizeBooking,
	ModalConfirmPayBooking
} from "../containers";
import { ReduxState } from "../../reducers";

interface BookingsStateProps {
	auth: ReduxState["auth"];
}

type BookingsActionProps = ResolveThunks<typeof actions>;

type Props = BookingsStateProps &
	RouteComponentProps &
	WithStyles<typeof styles> &
	BookingsActionProps;

const Bookings: FC<Props> = ({
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

const mapStateToProps: MapStateToProps<BookingsStateProps, {}, ReduxState> = ({
	auth
}) => ({ auth });

export default compose<Props, {}>(
	withStyles(styles),
	connect(mapStateToProps, actions)
)(Bookings);
