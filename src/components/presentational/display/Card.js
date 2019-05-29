import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
	Card as MuiCard,
	CardContent,
	CardMedia,
	Typography,
	ButtonBase
} from "@material-ui/core";
import * as icons from "@material-ui/icons";

function Card({
	classes,
	title,
	descriptions,
	controls,
	imgSrc,
	onClick,
	iconName
}) {
	const Icon = icons[iconName];
	let component = (
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
			>
				{iconName && <Icon className={classes.icon} />}
			</CardMedia>
		</MuiCard>
	);
	return onClick ? (
		<ButtonBase className={classes.root} onClick={e => onClick && onClick(e)}>
			{component}
		</ButtonBase>
	) : (
		<div className={classes.root}>{component}</div>
	);
}

Card.propTypes = {
	title: PropTypes.string,
	descriptions: PropTypes.arrayOf(PropTypes.string),
	controls: PropTypes.node,
	imgSrc: PropTypes.string,
	onClick: PropTypes.func,
	iconName: PropTypes.string
};

const style = theme => ({
	root: {
		width: "100%"
	},
	icon: {
		filter: "drop-shadow(5px 3px 2px rgba(0,0,0,0.3))",
		position: "absolute",
		left: 0,
		height: "100%",
		width: "100%",
		color: theme.palette.primary.main
	},
	card: {
		width: "100%",
		padding: theme.spacing(),
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
		paddingLeft: theme.spacing(1),
		paddingBottom: theme.spacing(1)
	},
	media: {
		position: "relative",
		flexGrow: 1
	}
});

export default withStyles(style)(Card);
