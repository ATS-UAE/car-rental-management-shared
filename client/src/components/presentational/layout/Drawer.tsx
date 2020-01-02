import React, { Fragment, ReactNode, FC } from "react";
import {
	withStyles,
	Theme,
	createStyles,
	WithStyles
} from "@material-ui/core/styles";

import {
	Drawer,
	List,
	Divider,
	ListItem,
	ListItemIcon,
	ListItemText,
	Avatar,
	Typography
} from "@material-ui/core";

export type DrawerListItem = {
	icon: ReactNode;
	text: ReactNode;
	onClick?: () => void;
};

export interface DrawerProps extends WithStyles<typeof styles> {
	list?: Array<DrawerListItem>[];
	endList?: Array<DrawerListItem>[];
	profile: {
		title: string;
		subtitle: string;
		imgSrc?: string;
		initials: string;
	};
	isOpen: boolean;
	onClose: () => void;
	onClick: () => void;
}

const styles = (theme: Theme) =>
	createStyles({
		list: {
			width: 250,
			display: "flex",
			flexDirection: "column",
			justifyContent: "space-between",
			minHeight: "100vh"
		},
		text: {
			textDecoration: "none"
		},
		profile: {
			display: "flex",
			margin: theme.spacing(2),
			alignItems: "center"
		},
		picture: {
			marginRight: theme.spacing(1)
		}
	});

const renderProfile = ({ title, subtitle, imgSrc, initials }, classes) => (
	<Fragment>
		<div className={classes.profile}>
			{imgSrc ? (
				<Avatar alt={title} src={imgSrc} className={classes.picture} />
			) : (
				<Avatar className={classes.picture}>{initials}</Avatar>
			)}
			<div>
				<Typography component="h1" variant="subtitle1">
					{title}
				</Typography>
				<Typography component="h2" variant="caption">
					{subtitle}
				</Typography>
			</div>
		</div>
		<Divider />
	</Fragment>
);

const TemporaryDrawer: FC<DrawerProps> = ({
	classes,
	list = [],
	endList = [],
	isOpen,
	onClick,
	onClose,
	profile
}) => {
	const sideList = (
		<div className={classes.list}>
			<div>
				{profile && renderProfile(profile, classes)}
				<div>
					{list.map((listGroup, index, array) => (
						<Fragment key={index}>
							<List>
								{listGroup.map((listItem, index) => (
									<ListItem
										button
										key={index}
										onClick={() => {
											onClick && onClick();
											listItem.onClick && listItem.onClick();
										}}
									>
										<ListItemIcon>{listItem.icon}</ListItemIcon>
										<ListItemText className={classes.text}>
											{listItem.text}
										</ListItemText>
									</ListItem>
								))}
							</List>
							{index !== array.length - 1 && <Divider />}
						</Fragment>
					))}
				</div>
			</div>
			{endList.length > 0 && (
				<div>
					{endList.map((listGroup, index, array) => (
						<Fragment key={index}>
							<Divider />
							<List>
								{listGroup.map((listItem, index) => (
									<ListItem
										button
										key={index}
										onClick={() => {
											onClick && onClick();
											listItem.onClick && listItem.onClick();
										}}
									>
										<ListItemIcon>{listItem.icon}</ListItemIcon>
										<ListItemText>{listItem.text}</ListItemText>
									</ListItem>
								))}
							</List>
							{index !== array.length - 1 && <Divider />}
						</Fragment>
					))}
				</div>
			)}
		</div>
	);

	return (
		<Drawer open={isOpen} onClose={() => onClose && onClose()}>
			{sideList}
		</Drawer>
	);
};

export default withStyles(styles)(TemporaryDrawer);
