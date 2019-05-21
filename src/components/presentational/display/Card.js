import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
	Card as MuiCard,
	CardContent,
	CardMedia,
	Typography
} from "@material-ui/core";

function Card({ classes, title, descriptions, controls, imgSrc }) {
	return (
		<MuiCard className={classes.card}>
			<div className={classes.details}>
				<CardContent className={classes.content}>
					{title && (
						<Typography component="h5" variant="h5">
							{title}
						</Typography>
					)}
					{descriptions &&
						descriptions.map((text, index) => (
							<Typography key={index} variant="subtitle1" color="textSecondary">
								{text}
							</Typography>
						))}
				</CardContent>
				{controls && <div className={classes.controls}>{controls}</div>}
			</div>
			<CardMedia
				className={classes.media}
				image={imgSrc || "/static/images/no-image-available.png"}
				title={title}
			/>
		</MuiCard>
	);
}

Card.propTypes = {
	title: PropTypes.string,
	descriptions: PropTypes.arrayOf(PropTypes.string),
	controls: PropTypes.node,
	imgSrc: PropTypes.string
};

const style = theme => ({
	card: {
		display: "flex"
	},
	details: {
		display: "flex",
		flexBasis: "20%",
		flexDirection: "column"
	},
	controls: {
		display: "flex",
		alignItems: "center",
		paddingLeft: theme.spacing.unit,
		paddingBottom: theme.spacing.unit
	},
	media: {
		flexGrow: 1
	}
});

export default withStyles(style)(Card);
