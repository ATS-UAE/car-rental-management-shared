import React, { useEffect } from "react";
import { Route } from "react-router";
import { Paper, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { compose } from "recompose";
import { connect } from "react-redux";
import * as reduxActions from "../../actions";
import { resources, actions } from "../../variables/enums";
import InviteGuestButtonDialog from "../containers/forms/InviteGuestButtonDialog";
import Can from "../containers/layout/Can";
import UserTableView from "../containers/display/UserTableView";
import UserFormCreateDialog from "../containers/forms/users/UserFormCreateDialog";

function Users({
	classes,
	fetchUsers,
	fetchCurrentUserDetails,
	location,
	match,
	history,
	fetchCategories
}) {
	useEffect(() => {
		fetchUsers();
		fetchCurrentUserDetails();
		fetchCategories();
	}, []);
	return (
		<Paper className={classNames(classes.paper, classes.root)}>
			<Route
				path="/users/new"
				render={props => {
					return (
						<UserFormCreateDialog
							{...props}
							onSubmit={() => history.push("/users")}
						/>
					);
				}}
			/>
			<div className={classes.actions}>
				<InviteGuestButtonDialog />
				<Can
					action={actions.CREATE}
					resource={resources.USERS}
					yes={() => (
						<Button
							color="primary"
							variant="contained"
							onClick={() => history.push("/users/new")}
						>
							New User
						</Button>
					)}
				/>
			</div>
			<UserTableView location={location} match={match} history={history} />
		</Paper>
	);
}

const styles = theme => ({
	root: {
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
	},
	actions: {
		display: "flex",
		justifyContent: "space-between"
	}
});

export default compose(
	connect(
		null,
		reduxActions
	),
	withStyles(styles)
)(Users);