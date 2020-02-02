import React, { FC } from "react";
import classNames from "classnames";
import { useLocation, Route } from "react-router-dom";
import {
	Dialog,
	Theme,
	WithStyles,
	createStyles,
	withStyles
} from "@material-ui/core";
import { Loading } from ".";

export interface ModalProps extends WithStyles<typeof styles> {
	path?: string;
	onClose?: () => void;
	open: boolean;
	loading?: boolean;
}

const BaseModal: FC<ModalProps> = ({
	children,
	path,
	onClose,
	open,
	loading,
	classes
}) => {
	const location = useLocation<{ background?: boolean }>();

	const background = location && location.state && location.state.background;

	const modalComponent = (
		<Dialog
			onClose={onClose}
			open={open}
			classes={{
				paper: classNames(classes.paper, {
					[classes.loading]: Boolean(loading)
				})
			}}
		>
			{loading ? <Loading /> : children}
		</Dialog>
	);

	return path && background ? (
		<Route path={path} children={modalComponent}></Route>
	) : (
		modalComponent
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
