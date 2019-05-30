import React from "react";
import { Grid, withStyles } from "@material-ui/core";

import Card from "./Card";

function CardList({ cards, gridProps, classes, theme }) {
	return (
		<Grid
			container
			spacing={theme.breakpoints.down("sm") ? 1 : 3}
			className={classes.root}
			{...gridProps}
		>
			{cards &&
				cards.map(
					({
						id,
						title,
						descriptions,
						controls,
						imgSrc,
						props,
						gridItemProps
					}) => (
						<Grid item xs={12} sm={12} md={6} key={id} {...gridItemProps}>
							<Card
								id={id}
								title={title}
								descriptions={descriptions}
								controls={controls}
								imgSrc={imgSrc}
								{...props}
							/>
						</Grid>
					)
				)}
		</Grid>
	);
}

const styles = theme => ({
	root: {
		padding: theme.spacing(4),
		[theme.breakpoints.down("sm")]: {
			padding: theme.spacing(1)
		}
	}
});

export default withStyles(styles, { withTheme: true })(CardList);
