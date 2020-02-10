import React, {  FC } from "react";
import {
	withStyles,
	WithStyles,
	createStyles,
	useTheme
} from "@material-ui/core/";
import CircleLoader from "react-spinners/CircleLoader";

export interface LoadingProps {}

const BaseLoading: FC<LoadingProps & WithStyles<typeof styles>> = ({
	classes
}) => {
	const theme = useTheme();
	return (
		<div className={classes.root}>
			<div className={classes.spinner}>
				<CircleLoader color={theme.palette.primary.main} />
			</div>
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
