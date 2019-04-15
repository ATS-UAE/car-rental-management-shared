import React, { useState, Fragment } from "react";
import { Paper, Button, Dialog } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import classNames from "classnames";
import PropTypes from "prop-types";
function DialogButton({
	classes,
	buttonText,
	children,
	open,
	onClick,
	onClose
}) {
	return (
		<Fragment>
			<Button
				color="primary"
				variant="contained"
				onClick={e => onClick && onClick(e)}
			>
				{buttonText}
			</Button>
			<Dialog open={open} onClose={() => onClose && onClose()}>
				<Paper className={classes.paper}>{children}</Paper>
			</Dialog>
		</Fragment>
	);
}

DialogButton.propTypes = {
	buttonText: PropTypes.string,
	open: PropTypes.bool,
	onClick: PropTypes.func,
	onClose: PropTypes.func
};

DialogButton.defaultProps = {
	buttonText: "New"
};

const styles = theme => ({
	paper: {
		padding: theme.spacing.unit * 3
	}
});

export default withStyles(styles)(DialogButton);
