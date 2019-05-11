import React from "react";
import { Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import PasswordChangeButtonDialog from "../containers/forms/PasswordChangeButtonDialog";

function Settings({ classes }) {
	return (
		<Paper className={classes.root}>
			<PasswordChangeButtonDialog />
		</Paper>
	);
}

const styles = theme => ({
	root: {
		padding: theme.spacing.unit * 3,
		margin: theme.spacing.unit * 3
	}
});

export default withStyles(styles)(Settings);
