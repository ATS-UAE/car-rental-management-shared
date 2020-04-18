import React, { FC } from "react";
import { Chip } from "@material-ui/core";
import {
	withStyles,
	createStyles,
	WithStyles,
	Theme
} from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import classnames from "classnames";

export interface ErrorChipProps extends WithStyles<typeof styles> {
	label: string;
}

const ErrorChipBase: FC<ErrorChipProps> = ({ label, classes }) => {
	return <Chip label={label} className={classnames(classes.root)} />;
};

const styles = (theme: Theme) =>
	createStyles({
		root: {
			backgroundColor: red[500],
			color: "white",
			margin: `${theme.spacing(1)}px 0 ${theme.spacing(1)}px 0`
		}
	});

export const ErrorChip = withStyles(styles)(ErrorChipBase);
