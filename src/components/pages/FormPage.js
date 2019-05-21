import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { withRouter } from "react-router";
import { Dialog } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";

function FormPage({
	render,
	history,
	dialogProps,
	path,
	exitPath,
	onMount,
	classes,
	check
}) {
	if (check({ path }) === true)
		return (
			<Route
				path={path}
				render={props => (
					<DialogComponent
						render={render}
						history={history}
						exitPath={exitPath}
						childProps={props}
						onMount={onMount}
						dialogProps={{
							PaperProps: {
								className: classes.paper
							},
							...dialogProps
						}}
					/>
				)}
			/>
		);
	else return null;
}

function DialogComponent({
	render,
	childProps,
	exitPath,
	dialogProps,
	history,
	onMount
}) {
	useEffect(() => onMount && onMount(childProps), []);
	return (
		<Dialog open={true} onClose={() => history.push(exitPath)} {...dialogProps}>
			{render ? render(childProps) : null}
		</Dialog>
	);
}

const styles = theme => ({
	paper: {
		padding: theme.spacing.unit * 3
	}
});

export default compose(
	withStyles(styles),
	withRouter
)(FormPage);
