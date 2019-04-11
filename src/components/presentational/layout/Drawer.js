import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

import { runIfExistFunction } from "../../../utils";

const styles = {
	list: {
		width: 250,
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		minHeight: "100vh"
	},
	text: {
		textDecoration: "none"
	}
};

function TemporaryDrawer({ classes, list, isOpen, onClick, onClose, endList }) {
	const sideList = (
		<div className={classes.list}>
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
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func,
	onClick: PropTypes.func
};

TemporaryDrawer.defaultProps = {
	list: [],
	endList: []
};

export default withStyles(styles)(TemporaryDrawer);
