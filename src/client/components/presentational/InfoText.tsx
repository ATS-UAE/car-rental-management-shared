import React, { FC } from "react";
import {
	Typography,
	withStyles,
	createStyles,
	Theme,
	WithStyles
} from "@material-ui/core";

export interface InfoTextProps {
	title: string;
	value: string;
	classes?: Partial<Record<keyof typeof styles, string>>;
}

const InfoTextBase: FC<InfoTextProps & WithStyles<typeof styles>> = ({
	title,
	value,
	classes
}) => {
	return (
		<span className={classes.root}>
			<Typography
				className={classes.title}
				variant="caption"
				display="block"
				component="span"
			>
				{title}:
			</Typography>
			<Typography className={classes.value} variant="body1" component="span">
				{value}
			</Typography>
		</span>
	);
};

const styles = (theme: Theme) =>
	createStyles({
		root: {},
		title: {
			marginRight: theme.spacing(1)
		},
		value: {}
	});

export const InfoText = withStyles(styles)(InfoTextBase);
