import React from "react";
import { Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import NewUserButtonDialog from "../containers/forms/NewUserButtonDialog";
import InviteGuestButtonDialog from "../containers/forms/InviteGuestButtonDialog";
import UserTableView from "../containers/display/UserTableView";

function Users({ classes }) {
	return (
		<Paper className={classNames(classes.paper, classes.root)}>
			<div className={classes.actions}>
				<NewUserButtonDialog />

				<InviteGuestButtonDialog />
			</div>
			<UserTableView />
		</Paper>
	);
}

const styles = theme => ({
	root: {
		padding: theme.spacing.unit * 3,
		margin: theme.spacing.unit * 3
	},
	actions: {
		display: "flex",
		justifyContent: "space-between"
	}
});

export default withStyles(styles)(Users);
