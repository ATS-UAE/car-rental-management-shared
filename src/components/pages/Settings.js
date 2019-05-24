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
		padding: theme.spacing(3),
		margin: theme.spacing(3),
		[theme.breakpoints.down("sm")]: {
			padding: theme.spacing(1)
		},
		height: "100%",
		overflow: "auto"
	}
});

export default withStyles(styles)(Settings);
