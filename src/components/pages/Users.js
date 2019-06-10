import React, { useEffect } from "react";
import { Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { compose } from "recompose";
import { connect } from "react-redux";
import * as actions from "../../actions";
import UserFormCreateButtonDialog from "../containers/forms/users/UserFormCreateButtonDialog";
import InviteGuestButtonDialog from "../containers/forms/InviteGuestButtonDialog";
import UserTableView from "../containers/display/UserTableView";

function Users({
	classes,
	fetchUsers,
	fetchCurrentUserDetails,
	location,
	match,
	history
}) {
	useEffect(() => {
		fetchUsers();
		fetchCurrentUserDetails();
	}, []);
	return (
		<Paper className={classNames(classes.paper, classes.root)}>
			<div className={classes.actions}>
				<UserFormCreateButtonDialog />
				<InviteGuestButtonDialog />
			</div>
			<UserTableView location={location} match={match} history={history} />
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
	},
	actions: {
		display: "flex",
		justifyContent: "space-between"
	}
});

export default compose(
	connect(
		null,
		actions
	),
	withStyles(styles)
)(Users);
