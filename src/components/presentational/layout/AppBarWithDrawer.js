import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "./AppBar";
import Drawer from "./Drawer";

export default function AppBarWithDrawer(props) {
	const { menuList, renderActions, title } = props;
	const [isDrawerOpen, setDrawerOpenState] = useState(false);
	return (
		<Fragment>
			<AppBar
				onMenuClick={() => setDrawerOpenState(true)}
				title={title}
				renderActions={renderActions}
			/>
			<Drawer
				isOpen={isDrawerOpen}
				list={menuList}
				onClick={() => setDrawerOpenState(false)}
			/>
		</Fragment>
	);
}

AppBarWithDrawer.propTypes = {
	list: PropTypes.arrayOf(
		PropTypes.arrayOf(
			PropTypes.shape({
				icon: PropTypes.node.isRequired,
				text: PropTypes.string.isRequired,
				onClick: PropTypes.func.isRequired
			})
		)
	),
	title: PropTypes.string,
	renderActions: PropTypes.func
};
