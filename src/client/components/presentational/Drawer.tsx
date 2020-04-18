import React, { ReactElement, Fragment, ReactNode, FC } from "react";
import {
	withStyles,
	Theme,
	createStyles,
	WithStyles
} from "@material-ui/core/styles";

import {
	Drawer as MuiDrawer,
	List,
	Divider,
	ListItem,
	ListItemIcon,
	ListItemText,
	Avatar,
	Typography
} from "@material-ui/core";

export type DrawerListItem = {
	icon: ReactElement;
	text: ReactNode;
	onClick?: () => void;
};

export interface DrawerListProps {
	list: DrawerListItem[][];
	onClick?: () => void;
}

export interface DrawerProps extends WithStyles<typeof styles> {
	list?: DrawerListItem[][];
	endList?: DrawerListItem[][];
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

const renderProfile = (
	{ title, subtitle, imgSrc, initials }: DrawerProps["profile"],
	classes
) => (
	<>
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
	</>
);

export const DrawerList: FC<DrawerListProps> = ({ list, onClick }) => (
	<>
		{list.map((listGroup, index, array) => (
			<Fragment key={index}>
				<List>
					{listGroup.map((listItem: DrawerListItem, index) => {
						return (
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
						);
					})}
				</List>
				{index !== array.length - 1 && <Divider />}
			</Fragment>
		))}
	</>
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
					<DrawerList list={list} onClick={onClick} />
				</div>
			</div>
			{endList.length > 0 && (
				<div>
					<DrawerList list={endList} onClick={onClick} />
				</div>
			)}
		</div>
	);

	return (
		<MuiDrawer open={isOpen} onClose={() => onClose && onClose()}>
			{sideList}
		</MuiDrawer>
	);
};

export const Drawer = withStyles(styles)(TemporaryDrawer);
