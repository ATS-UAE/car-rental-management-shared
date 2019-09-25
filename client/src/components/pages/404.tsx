import React, { FC } from "react";
import {
	Typography,
	Link,
	Paper,
	Theme,
	withStyles,
	WithStyles,
	createStyles
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

const UnknownPage: FC<WithStyles<typeof styles>> = ({ classes }) => {
	return (
		<div className={classes.container}>
			<Paper className={classes.paper}>
				<Typography variant="h1">404</Typography>
				<Typography variant="subtitle1">
					This page does not exist. Are you lost?
				</Typography>
				<Link to="/" color="primary" variant="body1" component={RouterLink}>
					Take me home!
				</Link>
			</Paper>
		</div>
	);
};

const styles = (theme: Theme) =>
	createStyles({
		paper: {
			textAlign: "center",
			padding: theme.spacing(3),
			margin: "auto",
			display: "inline-block"
		},
		container: {
			display: "flex",
			alignItems: "center",
			transform: "translateY(50%)"
		}
	});

export default withStyles(styles)(UnknownPage);
