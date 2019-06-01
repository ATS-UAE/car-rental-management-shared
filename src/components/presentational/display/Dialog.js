import React, { useEffect } from "react";
import { Dialog as MuiDialog, withStyles } from "@material-ui/core";

function Dialog({ onMount, children, onClose, open, classes }) {
	useEffect(() => {
		onMount && onMount();
	}, []);
	return (
		<MuiDialog
			children={children}
			onClose={onClose}
			open={open}
			classes={classes}
		/>
	);
}

const styles = theme => ({
	paper: {
		padding: theme.spacing(2)
	}
});

export default withStyles(styles)(Dialog);
