import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import CircleLoader from "react-spinners/CircleLoader";
function Loading({ classes }) {
	return (
		<div className={classes.root}>
			<div className={classes.spinner}>
				<CircleLoader color="#FE6B8B" />
			</div>
		</div>
	);
}

const styles = {
	root: {
		height: "100%",
		display: "flex",
		justifyContent: "center",
		flexDirection: "column"
	},
	spinner: {
		margin: "0 auto 0 auto",
		display: "flex",
		justifyContent: "center"
	}
};

export default withStyles(styles)(Loading);
