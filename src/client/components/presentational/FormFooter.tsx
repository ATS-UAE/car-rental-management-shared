import React, { FC } from "react";
import {
	Typography,
	withStyles,
	createStyles,
	WithStyles
} from "@material-ui/core";
import { ErrorChip } from ".";

export interface FormFooterProps {
	hints?: string;
}

const FormFooterBase: FC<FormFooterProps & WithStyles<typeof styles>> = ({
	classes,
	children,
	hints
}) => {
	return (
		<div className={classes.root}>
			{children}
			{hints && (
				<Typography classes={{ root: classes.hints }}>{hints}</Typography>
			)}
		</div>
	);
};

const styles = createStyles({
	hints: {},
	root: {}
});

export const FormFooter = withStyles(styles)(FormFooterBase);
