import React, { useEffect, useState } from "react";
import { Dialog as MuiDialog, withStyles } from "@material-ui/core";
import classNames from "classnames";
import Loading from "../layout/Loading";

function Dialog({ onMount, children, onClose, open, classes }) {
	const [loading, setLoading] = useState(true);
	const [onMountData, setOnMountData] = useState(null);
	const [renderedChildren, setRenderedChildren] = useState(null);
	useEffect(() => {
		const promise = onMount && onMount();
		if (promise instanceof Promise)
			promise.then(res => {
				setLoading(false);
				setOnMountData(res);
			});
		else {
			setLoading(false);
			setOnMountData(promise);
		}
	}, []);

	useEffect(() => {
		const setChildren = async () => {
			if (typeof children === "function") {
				if (onMount && onMountData) {
					const newChildren = await children(onMountData);
					setRenderedChildren(newChildren);
				} else if (!onMount) {
					console.log(onMount, onMountData);
					const newChildren = await children();
					setRenderedChildren(newChildren);
				}
			} else {
				setRenderedChildren(children);
			}
		};
		setChildren();
	}, [children, onMountData]);

	return (
		<MuiDialog
			children={children}
			onClose={onClose}
			open={open}
			classes={{
				paper: classNames(classes.paper, {
					[classes.loading]: loading || renderedChildren === null
				})
			}}
		>
			{loading || renderedChildren === null ? <Loading /> : renderedChildren}
		</MuiDialog>
	);
}

const styles = theme => ({
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

export default withStyles(styles)(Dialog);
