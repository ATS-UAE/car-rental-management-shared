import React, { ReactNode, FC } from "react";
import { withStyles, WithStyles, createStyles } from "@material-ui/core/";
import CircleLoader from "react-spinners/CircleLoader";

export interface LoadingProps {
	component?: ReactNode;
}

const BaseLoading: FC<LoadingProps & WithStyles<typeof styles>> = ({
	component = <CircleLoader color="#FE6B8B" />,
	classes
}) => {
	return (
		<div className={classes.root}>
			<div className={classes.spinner}>{component}</div>
		</div>
	);
};

const styles = createStyles({
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
});

export const Loading = withStyles(styles)(BaseLoading);
