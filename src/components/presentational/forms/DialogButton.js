import React, { Fragment } from "react";
import { Paper, Button, Dialog } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
function DialogButton({
	classes,
	buttonText,
	children,
	open,
	onClick,
	onClose,
	dialogProps
}) {
	return (
		<Fragment>
			<Button
				color="primary"
				variant="contained"
				onClick={e => onClick && onClick(e)}
				className={classes.button}
			>
				{buttonText}
			</Button>
			<Dialog open={open} onClose={() => onClose && onClose()} {...dialogProps}>
				<Paper className={classes.paper}>{children}</Paper>
			</Dialog>
		</Fragment>
	);
}

DialogButton.propTypes = {
	buttonText: PropTypes.string,
	open: PropTypes.bool,
	onClick: PropTypes.func,
	onClose: PropTypes.func,
	dialogProps: PropTypes.object
};

DialogButton.defaultProps = {
	buttonText: "New"
};

const styles = theme => ({
	paper: {
		padding: theme.spacing(3)
	},
	button: {}
});

export default withStyles(styles)(DialogButton);
