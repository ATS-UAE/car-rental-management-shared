import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
	Card as MuiCard,
	CardContent,
	CardMedia,
	Typography,
	CardActionArea
} from "@material-ui/core";
import * as icons from "@material-ui/icons";
import classNames from "classnames";

function Card({
	classes,
	title,
	descriptions,
	controls,
	imgSrc,
	onClick,
	iconName,
	cardContentProps,
	titleProps,
	selected
}) {
	const Icon = icons[iconName];
	const Media = imgSrc ? CardMedia : "div";
	let component = (
		<MuiCard className={classes.card}>
			<div className={classes.details}>
				<CardContent className={classes.content} {...cardContentProps}>
					{title && (
						<Typography component="h1" variant="h6" {...titleProps}>
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
			<Media className={classes.media} image={imgSrc || null} title={title}>
				{iconName && <Icon className={classes.icon} />}
			</Media>
		</MuiCard>
	);
	return onClick ? (
		<CardActionArea
			className={classNames(classes.root, { [classes.selected]: selected })}
			onClick={e => onClick && onClick(e)}
		>
			{component}
		</CardActionArea>
	) : (
		<div className={classNames(classes.root, { [classes.selected]: selected })}>
			{component}
		</div>
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
		width: "100%",
		transition: theme.transitions.create(["transform", "box-shadow"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	icon: {
		filter: "drop-shadow(5px 3px 2px rgba(0,0,0,0.3))",
		position: "absolute",
		left: 0,
		height: "100%",
		width: "100%",
		color: theme.palette.primary.main
	},
	selected: {
		boxShadow: theme.shadows[5],
		transform: "scale(1.11) translateY(-3px)",
		zIndex: 1
	},
	card: {
		width: "100%",
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
