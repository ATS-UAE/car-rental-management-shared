import React, { FC } from "react";
import classNames from "classnames";
import { useLocation } from "react-router-dom";
import {
	Dialog,
	Theme,
	WithStyles,
	createStyles,
	withStyles
} from "@material-ui/core";
import { Loading } from ".";

export interface ModalProps {
	onClose?: () => void;
	open?: boolean;
	loading?: boolean;
	classes?: Record<keyof typeof styles, string>;
}

const BaseModal: FC<ModalProps & WithStyles<typeof styles>> = ({
	children,
	onClose,
	open,
	loading,
	classes
}) => {
	const location = useLocation<{ background?: boolean }>();

	const background = location && location.state && location.state.background;

	return (
		<Dialog
			onClose={onClose}
			open={background || open || false}
			classes={{
				paper: classNames(classes.paper, {
					[classes.loading]: Boolean(loading)
				})
			}}
		>
			{loading ? <Loading /> : children}
		</Dialog>
	);
};

const styles = (theme: Theme) =>
	createStyles({
		paper: {
			padding: theme.spacing(2)
		},
		loading: {
			padding: theme.spacing(4),
			overflow: "visible",
			boxShadow: "none",
			backgroundColor: "rgba(0, 0, 0, 0)"
		}
	});

export const Modal = withStyles(styles)(BaseModal);
