import React, { FC } from "react";
import {
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button
} from "@material-ui/core";
import { ModalProps, Modal } from ".";

interface ModalContentConfirm extends Omit<ModalProps, "onClose"> {
	yes: () => void;
	no: () => void;
	title?: string;
	content?: string;
	disabled?: boolean;
}

export const ModalConfirm: FC<ModalContentConfirm> = ({
	yes,
	no,
	title,
	content,
	disabled,
	...modalProps
}) => {
	return (
		<Modal onClose={no} {...modalProps} open>
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
		</Modal>
	);
};
