import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import { runIfExistFunction } from "../../../utils";

const styles = {
	list: {
		width: 250
	},
	fullList: {
		width: "auto"
	}
};

function TemporaryDrawer(props) {
	const { classes, list, isOpen, onClick, onClose } = props;
	const sideList = (
		<div className={classes.list}>
			{list.map(
				(listGroup, index, array) => (
					<Fragment key={index}>
						<List>
							{listGroup.map((listItem, index) => (
								<ListItem button key={index} onClick={listItem.onClick}>
									<ListItemIcon>{listItem.icon}</ListItemIcon>
									<ListItemText primary={listItem.text} />
								</ListItem>
							))}
						</List>
						{index !== array.length - 1 && <Divider />}
					</Fragment>
				),

				[]
			)}
		</div>
	);

	return (
		<Drawer open={isOpen} onClose={runIfExistFunction(onClose)}>
			<div
				tabIndex={0}
				role="button"
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
				text: PropTypes.string.isRequired,
				onClick: PropTypes.func.isRequired
			})
		)
	),
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func,
	onClick: PropTypes.func
};

TemporaryDrawer.defaultProps = {
	list: []
};

export default withStyles(styles)(TemporaryDrawer);
