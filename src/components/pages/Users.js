import React from "react";
import { Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import UserFormCreateButtonDialog from "../containers/forms/users/UserFormCreateButtonDialog";
import InviteGuestButtonDialog from "../containers/forms/InviteGuestButtonDialog";
import UserTableView from "../containers/display/UserTableView";

function Users({ classes }) {
	return (
		<Paper className={classNames(classes.paper, classes.root)}>
			<div className={classes.actions}>
				<UserFormCreateButtonDialog />
				<InviteGuestButtonDialog />
			</div>
			<UserTableView />
		</Paper>
	);
}

const styles = theme => ({
	root: {
		padding: theme.spacing(3),
		[theme.breakpoints.down("sm")]: {
			padding: theme.spacing.unit
		},
		height: "100%",
		overflow: "auto"
	},
	actions: {
		display: "flex",
		justifyContent: "space-between"
	}
});

export default withStyles(styles)(Users);
