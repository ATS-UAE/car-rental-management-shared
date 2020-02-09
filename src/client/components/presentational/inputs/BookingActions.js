import React, { Fragment } from "react";
import { IconButton } from "@material-ui/core";
import {
	Edit,
	Delete,
	ThumbUp,
	ThumbDown,
	Check,
	Payment
} from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

function BookingActions({
	onApprove,
	onDeny,
	onDelete,
	onUpdate,
	onFinalize,
	onPay,
	isDisabled,
	showApprove,
	showDeny,
	showDelete,
	showUpdate,
	showFinalize,
	showPay,
	classes
}) {
	return (
		<Fragment>
			{showApprove && (
				<IconButton
					className={classes.actionButtonApprove}
					disabled={isDisabled}
					onClick={onApprove}
					type="submit"
					variant="contained"
					color="secondary"
					size="small"
				>
					<ThumbUp />
				</IconButton>
			)}
			{showDeny && (
				<IconButton
					className={classes.actionButtonReject}
					onClick={onDeny}
					disabled={isDisabled}
					type="submit"
					variant="contained"
					color="primary"
					size="small"
				>
					<ThumbDown />
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
			{showFinalize && (
				<IconButton
					disabled={isDisabled}
					type="submit"
					variant="contained"
					size="small"
					onClick={onFinalize}
				>
					<Check />
				</IconButton>
			)}
			{showPay && (
				<IconButton
					disabled={isDisabled}
					type="submit"
					variant="contained"
					size="small"
					onClick={onPay}
				>
					<Payment />
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
	showUpdate: PropTypes.bool,
	showFinalize: PropTypes.bool
};

const styles = theme => ({
	actionButton: {
		padding: theme.spacing(1),
		height: "auto",
		color: "white"
	},
	actionButtonApprove: {
		marginBottom: theme.spacing(1),
		color: "#49A5FF"
	},
	actionButtonReject: {
		color: "#FF4B4B"
	}
});

export default withStyles(styles)(BookingActions);