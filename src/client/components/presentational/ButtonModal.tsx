import React, { FC, useState, Fragment } from "react";
import {
	Dialog,
	withStyles,
	WithStyles,
	createStyles,
	Theme
} from "@material-ui/core";
import Button, { ButtonProps } from "@material-ui/core/Button";

export interface ButtonModalProps {
	buttonProps: ButtonProps;
	onClick: () => void;
	onClose: () => void;
	open: boolean;
}

const ButtonModalBase: FC<ButtonModalProps & WithStyles<typeof styles>> = ({
	children,
	onClick,
	onClose,
	open,
	buttonProps,
	classes
}) => {
	return (
		<Fragment>
			<Button onClick={onClick} {...buttonProps} />
			<Dialog
				open={open}
				onClose={onClose}
				classes={{
					paper: classes.paper
				}}
			>
				<Fragment>{children}</Fragment>
			</Dialog>
		</Fragment>
	);
};

const styles = (theme: Theme) =>
	createStyles({
		paper: {
			padding: theme.spacing(2)
		}
	});

export const ButtonModal = withStyles(styles)(ButtonModalBase);
