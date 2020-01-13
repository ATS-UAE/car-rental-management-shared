import React, { useEffect, useState } from "react";
import { Dialog as MuiDialog, withStyles } from "@material-ui/core";
import classNames from "classnames";
import { Loading } from "..";
import { cancelablePromise } from "../../../utils/helpers";
function Dialog({ onMount, children, onClose, open, classes }) {
	const [loading, setLoading] = useState(true);
	const [onMountData, setOnMountData] = useState(null);
	const [renderedChildren, setRenderedChildren] = useState(null);
	const [promises, setPromises] = useState({});

	useEffect(() => {
		let mountData = onMount && onMount();
		if (mountData instanceof Promise) {
			mountData = cancelablePromise(mountData);
			setPromises({ ...promises, mountData });
		} else {
			setLoading(false);
			setOnMountData(mountData);
		}
		return () => {
			for (const promise of Object.values(promises)) {
				promise.cancel();
			}
		};
	}, []);

	useEffect(() => {
		if (promises.children && !promises.children.set) {
			promises.children.promise
				.then(data => setRenderedChildren(data))
				.catch(e => {
					if (!e.isCanceled) throw e.error;
				});
			setPromises({
				...promises,
				children: { ...promises.children, set: true }
			});
		}
		if (promises.mountData && !promises.mountData.set) {
			promises.mountData.promise
				.then(res => {
					setLoading(false);
					setOnMountData(res);
				})
				.catch(e => {
					if (!e.isCanceled) {
						throw e.error;
					}
				});
			setPromises({
				...promises,
				mountData: { ...promises.mountData, set: true }
			});
		}
	}, [promises]);

	useEffect(() => {
		const setChildren = async () => {
			if (typeof children === "function") {
				if (onMount && onMountData) {
					setPromises({
						...promises,
						children: cancelablePromise(children(onMountData))
					});
				} else if (!onMount) {
					setPromises({
						...promises,
						children: cancelablePromise(children(onMountData))
					});
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
