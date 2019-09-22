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
import { Role } from "../../variables/enums";
import BookingFormCreateStepper from "../containers/forms/bookings/BookingFormCreateStepper";
import BookingTableView from "../containers/display/BookingTableView";
import { Auth, Response } from "../../typings/api";
interface IBookingsPage extends RouteComponentProps, WithStyles<typeof styles> {
	auth: Response<Auth>;
	history: History;
}

const Bookings: FC<typeof actions & IBookingsPage> = ({
	classes,
	auth,
	fetchUsers,
	fetchEnums,
	fetchVehicles,
	fetchLocations,
	fetchBookings,
	fetchCurrentUserDetails,
	history
}) => {
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
									{auth && auth.data && auth.data.role.name === Role.GUEST && (
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
	connect(
		mapStateToProps,
		actions
	)
)(Bookings);
