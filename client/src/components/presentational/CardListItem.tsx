import React, { FC, ReactNode } from "react";
import PropTypes from "prop-types";
import {
	Card,
	CardContent,
	CardMedia,
	Typography,
	CardActionArea,
	Tooltip,
	CardContentProps,
	TypographyProps,
	withStyles,
	WithStyles,
	createStyles,
	Theme
} from "@material-ui/core";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import * as icons from "@material-ui/icons";
import classNames from "classnames";

export interface CardListItemProps {
	classes?: Partial<ClassNameMap<keyof typeof styles>>;
	title?: string;
	descriptions?: string[];
	controls?: ReactNode;
	imgSrc?: string;
	iconName?: string;
	CardContentProps?: CardContentProps;
	TitleProps?: TypographyProps;
	selected?: boolean;
	metaIcons?: Array<{
		tooltip: string;
		iconName: string;
		className?: string;
	}>;
	onClick?: () => void;
}

const CardListItemBase: FC<CardListItemProps & WithStyles<typeof styles>> = ({
	classes,
	title,
	descriptions,
	controls,
	imgSrc,
	onClick,
	iconName,
	CardContentProps,
	TitleProps,
	selected,
	metaIcons = []
}) => {
	const Icon = iconName && icons[iconName];
	const Media = imgSrc ? CardMedia : "div";
	let component = (
		<Card className={classes.card}>
			<div className={classes.details}>
				<CardContent {...CardContentProps}>
					{title && (
						<Typography component="h1" variant="h6" {...TitleProps}>
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
			<Media className={classes.media} image={imgSrc} title={title}>
				{iconName && <Icon className={classes.icon} />}
				<div className={classes.metaIconContainer}>
					{metaIcons.map(({ tooltip = "", iconName = "Info", className }) => {
						const Icon = icons[iconName];
						return (
							<Tooltip title={tooltip}>
								<Icon className={className} />
							</Tooltip>
						);
					})}
				</div>
			</Media>
		</Card>
	);
	return onClick ? (
		<CardActionArea
			className={classNames(classes.root, { [classes.selected]: selected })}
			onClick={e => onClick && onClick()}
		>
			{component}
		</CardActionArea>
	) : (
		<div className={classNames(classes.root, { [classes.selected]: selected })}>
			{component}
		</div>
	);
};

const styles = (theme: Theme) =>
	createStyles({
		root: {
			width: "100%",
			transition: theme.transitions.create(["transform", "box-shadow"], {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen
			})
		},
		cardContent: {},
		icon: {
			filter: "drop-shadow(5px 3px 2px rgba(0,0,0,0.3))",
			position: "absolute",
			left: 0,
			height: "100%",
			width: "100%",
			color: theme.palette.primary.main
		},
		metaIconContainer: {
			display: "flex",
			flexDirection: "row-reverse",
			padding: theme.spacing(2)
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
			flexDirection: "column",
			justifyContent: "space-between"
		},
		controls: {
			display: "flex",
			alignItems: "center",
			paddingLeft: theme.spacing(1),
			paddingBottom: theme.spacing(1)
		},
		media: {
			position: "relative",
			flexGrow: 1,
			display: "flex",
			flexDirection: "column-reverse"
		}
	});

export const CardListItem = withStyles(styles)(CardListItemBase);
