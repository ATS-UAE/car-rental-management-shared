import React, { Fragment } from "react";
import { IconButton } from "@material-ui/core";
import { Edit, Delete, Check, Close } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

function BookingActions({
	onApprove,
	onDeny,
	onDelete,
	onUpdate,
	isDisabled,
	showApprove,
	showDeny,
	showDelete,
	showUpdate
}) {
	return (
		<Fragment>
			{showApprove && (
				<IconButton
					disabled={isDisabled}
					onClick={onApprove}
					type="submit"
					variant="contained"
					color="secondary"
					size="small"
				>
					<Check />
				</IconButton>
			)}
			{showDeny && (
				<IconButton
					onClick={onDeny}
					disabled={isDisabled}
					type="submit"
					variant="contained"
					color="primary"
					size="small"
				>
					<Close />
				</IconButton>
			)}
			{showDelete && (
				<IconButton
					disabled={isDisabled}
					type="submit"
					variant="contained"
					size="small"
					onClick={onDelete}
				>
					<Delete />
				</IconButton>
			)}
			{showUpdate && (
				<IconButton
					disabled={isDisabled}
					type="submit"
					variant="contained"
					size="small"
					onClick={onUpdate}
				>
					<Edit />
				</IconButton>
			)}
		</Fragment>
	);
}

BookingActions.propsTypes = {
	onApprove: PropTypes.func,
	onDeny: PropTypes.func,
	onDelete: PropTypes.func,
	onUpdate: PropTypes.func,
	isDisabled: PropTypes.bool,
	showApprove: PropTypes.bool,
	showDeny: PropTypes.bool,
	showDestroy: PropTypes.bool,
	showUpdate: PropTypes.bool
};

const styles = theme => ({
	actionButton: {
		padding: theme.spacing.unit,
		height: "auto",
		color: "white"
	},
	actionButtonApprove: {
		marginBottom: theme.spacing.unit,
		background: "#11cb5f"
	},
	actionButtonReject: {
		background: "#FE6B8B"
	}
});

export default withStyles(styles)(BookingActions);
