import React, { Fragment, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

function ConfirmDialog({ open, onClose, yes, no, title, content, disabled }) {
	return (
		<div>
			<Dialog open={open} onClose={onClose}>
				<DialogChildren
					yes={yes}
					no={no}
					title={title}
					content={content}
					disabled={disabled}
				/>
			</Dialog>
		</div>
	);
}

export function DialogChildren({
	yes,
	no,
	title,
	content,
	disabled,
	onUnmount
}) {
	useEffect(() => () => onUnmount && onUnmount(), []);
	return (
		<Fragment>
			{title && <DialogTitle>{title}</DialogTitle>}
			{content && (
				<DialogContent>
					<DialogContentText>{content}</DialogContentText>
				</DialogContent>
			)}
			<DialogActions>
				<Button
					onClick={yes}
					disabled={disabled}
					color="primary"
					variant="contained"
				>
					Yes
				</Button>
				<Button
					onClick={no}
					disabled={disabled}
					color="primary"
					variant="contained"
					autoFocus
				>
					Cancel
				</Button>
			</DialogActions>
		</Fragment>
	);
}

export default ConfirmDialog;
