import React, { FC } from "react";
import {
	Typography,
	withStyles,
	createStyles,
	WithStyles
} from "@material-ui/core";
import { ErrorChip } from ".";

export interface FormHeaderProps {
	title?: string;
	errorNotes?: string[];
}

const FormHeaderBase: FC<FormHeaderProps & WithStyles<typeof styles>> = ({
	title,
	errorNotes,
	classes,
	children
}) => {
	return (
		<div className={classes.root}>
			{children}
			{title && (
				<Typography
					variant="h6"
					gutterBottom
					component="h1"
					className={classes.title}
				>
					{title}
				</Typography>
			)}
			{errorNotes && (
				<div className={classes.errorChipContainer}>
					{errorNotes.map((err, i) => (
						<ErrorChip
							classes={{ root: classes.errorChips }}
							key={i}
							label={err}
						/>
					))}
				</div>
			)}
		</div>
	);
};

const styles = createStyles({
	title: {},
	errorChips: {},
	root: {},
	errorChipContainer: {}
});

export const FormHeader = withStyles(styles)(FormHeaderBase);
