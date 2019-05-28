import React from "react";
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import Card from "./Card";

function CardList({ cards, classes }) {
	return (
		<div>
			<Grid container spacing={2}>
				{cards &&
					cards.map(({ id, title, descriptions, controls, imgSrc, props }) => (
						<Grid item xs={12} sm={12} md={6} key={id}>
							<Card
								id={id}
								title={title}
								descriptions={descriptions}
								controls={controls}
								imgSrc={imgSrc}
								{...props}
							/>
						</Grid>
					))}
			</Grid>
		</div>
	);
}

const styles = theme => ({
	paper: {
		padding: theme.spacing(2)
	}
});

export default withStyles(styles)(CardList);
