import React, { useEffect, FC } from "react";
import { connect, ResolveThunks } from "react-redux";
import { compose } from "recompose";
import {
	Paper,
	Grid,
	withStyles,
	createStyles,
	Theme,
	WithStyles
} from "@material-ui/core";

import * as actions from "../../actions";
import { Role } from "../../../shared/typings";
import {
	AccidentDashBoard,
	BookingDashBoard,
	UserDashBoard,
	VehicleDashBoard
} from "../containers";
import { RoleView } from "../presentational";
import { ReduxState } from "../../reducers";

interface HomeStateProps {
	auth?: ReduxState["auth"];
	bookings?: ReduxState["bookings"];
	vehicles?: ReduxState["vehicles"];
	users?: ReduxState["users"];
	accidents?: ReduxState["accidents"];
}

type HomeActionProps = ResolveThunks<typeof actions>;

type Props = HomeStateProps & HomeActionProps & WithStyles<typeof styles>;

const Home: FC<Props> = ({
	fetchBookings,
	fetchVehicles,
	fetchUsers,
	fetchAccidents,
	auth,
	classes
}) => {
	useEffect(() => {
		fetchBookings();
		fetchVehicles();
		fetchUsers();
		fetchAccidents();
	}, []);

	return (
		<Grid container>
			<RoleView
				role={(auth && auth.data && auth.data.role) || undefined}
				excludes={[Role.GUEST]}
			>
				<Grid item xs={12} md={6}>
					<Paper className={classes.paper}>
						<UserDashBoard />
					</Paper>
				</Grid>
			</RoleView>
			<RoleView
				role={(auth && auth.data && auth.data.role) || undefined}
				excludes={[Role.GUEST]}
			>
				<Grid item xs={12} md={6}>
					<Paper className={classes.paper}>
						<BookingDashBoard />
					</Paper>
				</Grid>
			</RoleView>
			<RoleView
				role={(auth && auth.data && auth.data.role) || undefined}
				excludes={[Role.GUEST]}
			>
				<Grid item xs={12} md={6}>
					<Paper className={classes.paper}>
						<VehicleDashBoard />
					</Paper>
				</Grid>
			</RoleView>
			<RoleView
				role={(auth && auth.data && auth.data.role) || undefined}
				excludes={[Role.GUEST]}
			>
				<Grid item xs={12} md={6}>
					<Paper className={classes.paper}>
						<AccidentDashBoard />
					</Paper>
				</Grid>
			</RoleView>
		</Grid>
	);
};

const styles = (theme: Theme) =>
	createStyles({
		paper: {
			padding: theme.spacing(3),
			margin: theme.spacing(1)
		}
	});

const mapStateToProps = ({
	bookings,
	vehicles,
	users,
	accidents,
	auth
}: Pick<
	HomeStateProps,
	"bookings" | "vehicles" | "users" | "accidents" | "auth"
>) => ({
	bookings,
	vehicles,
	users,
	accidents,
	auth
});

export default compose<Props, {}>(
	connect(mapStateToProps, actions),
	withStyles(styles)
)(Home);
