import React, { FC, ReactNode, MouseEventHandler } from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	PropTypes
} from "@material-ui/core";

import { DialogProps } from "@material-ui/core/Dialog";
import { ButtonProps } from "@material-ui/core/Button";

interface Action {
	text: string;
	buttonProps?: ButtonProps;
	color?: PropTypes.Color;
	onClick: MouseEventHandler;
}

interface Props {
	open: boolean;
	onClose: () => void;
	dialogProps?: DialogProps;
	content: string | ReactNode;
	title: string | ReactNode;
	actions?: Action[];
}

export const DialogModal: FC<Props> = ({
	content: Content,
	dialogProps,
	title,
	actions,
	open,
	onClose
}) => {
	let content: string | ReactNode;
	if (typeof Content === "string") {
		content = (
			<DialogContentText id="alert-dialog-description">
				{Content}
			</DialogContentText>
		);
	} else {
		content = Content;
	}

	return (
		<Dialog open={open} onClose={onClose} {...dialogProps}>
			<DialogTitle id="alert-dialog-title">{title}</DialogTitle>
			<DialogContent>{content}</DialogContent>
			<DialogActions>
				{actions &&
					actions.map(({ color, onClick, buttonProps, text }) => (
						<Button onClick={onClick} color={color} {...buttonProps}>
							{text}
						</Button>
					))}
			</DialogActions>
		</Dialog>
	);
};
