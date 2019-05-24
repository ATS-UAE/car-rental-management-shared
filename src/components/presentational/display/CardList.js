import React from "react";
import { Grid, Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import Card from "./Card";

function CardList({ cards, classes }) {
	return (
		<div>
			<Grid container spacing={16}>
				{cards &&
					cards.map(({ id, title, descriptions, controls, imgSrc }) => (
						<Grid item xs={12} sm={12} md={6} lg={4} xl={3} key={id}>
							<Card
								id={id}
								title={title}
								descriptions={descriptions}
								controls={controls}
								imgSrc={imgSrc}
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
