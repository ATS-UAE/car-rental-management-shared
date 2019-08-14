import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

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

import { runIfExistFunction } from "../../../utils";

const styles = theme => ({
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

function TemporaryDrawer({
	classes,
	list,
	isOpen,
	onClick,
	onClose,
	endList,
	profile
}) {
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
										onClick={() => listItem.onClick && listItem.onClick()}
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
										onClick={() => listItem.onClick && listItem.onClick()}
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
			<div
				onClick={runIfExistFunction(onClick)}
				onKeyDown={runIfExistFunction(onClick)}
			>
				{sideList}
			</div>
		</Drawer>
	);
}

TemporaryDrawer.propTypes = {
	classes: PropTypes.object.isRequired,
	list: PropTypes.arrayOf(
		PropTypes.arrayOf(
			PropTypes.shape({
				icon: PropTypes.node.isRequired,
				text: PropTypes.node.isRequired,
				onClick: PropTypes.func
			})
		)
	),
	profile: PropTypes.shape({
		title: PropTypes.string.isRequired,
		subtitle: PropTypes.string.isRequired,
		imgSrc: PropTypes.string,
		initials: PropTypes.string.isRequired
	}),
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func,
	onClick: PropTypes.func
};

TemporaryDrawer.defaultProps = {
	list: [],
	endList: []
};

export default withStyles(styles)(TemporaryDrawer);
