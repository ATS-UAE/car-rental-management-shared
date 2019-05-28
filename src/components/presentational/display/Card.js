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
import { Done } from "@material-ui/icons";

function Card({
	classes,
	title,
	descriptions,
	controls,
	imgSrc,
	onClick,
	selected
}) {
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
				{selected && <Done className={classes.icons} />}
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
	selected: PropTypes.bool
};

const style = theme => ({
	root: {
		width: "100%"
	},
	icons: {
		float: "right",
		margin: "8px",
		color: theme.palette.primary.main
	},
	card: {
		width: "100%",
		padding: theme.spacing(),
		display: "flex"
	},
	details: {
		position: "relative",
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
		flexGrow: 1
	}
});

export default withStyles(style)(Card);
