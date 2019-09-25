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
	location,
	path,
	exitPath,
	onMount,
	classes,
	check,
	popUp,
	onChange
}) {
	if (check === undefined || check({ path, location }) === true)
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
						popUp={popUp}
						onChange={onChange}
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
	onMount,
	popUp,
	onChange
}) {
	useEffect(() => {
		onMount && onMount(childProps);
	}, []);
	useEffect(() => {
		onChange && onChange(childProps);
	}, [history.location.pathname]);
	return popUp ? (
		<Dialog
			open={true}
			onClose={() => exitPath && history.push(exitPath)}
			{...dialogProps}
		>
			{render ? render(childProps) : null}
		</Dialog>
	) : render ? (
		render(childProps)
	) : null;
}

FormPage.defaultProps = {
	popUp: true
};

const styles = theme => ({
	paper: {
		padding: theme.spacing(3)
	}
});

export default compose(
	withStyles(styles),
	withRouter
)(FormPage);
