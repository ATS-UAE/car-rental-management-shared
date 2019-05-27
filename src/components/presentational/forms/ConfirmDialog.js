import React from "react";
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
				{title && <DialogTitle>{title}</DialogTitle>}
				{content && (
					<DialogContent>
						<DialogContentText>{content}</DialogContentText>
					</DialogContent>
				)}
				<DialogActions>
					<Button onClick={yes} disabled={disabled} color="primary">
						Yes
					</Button>
					<Button onClick={no} disabled={disabled} color="primary" autoFocus>
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default ConfirmDialog;
