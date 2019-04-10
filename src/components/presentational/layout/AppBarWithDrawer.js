import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "./AppBar";
import Drawer from "./Drawer";

export default function AppBarWithDrawer({
	menuList,
	renderActions,
	title,
	onLogoClick,
	showMenu
}) {
	const [isDrawerOpen, setDrawerOpenState] = useState(false);
	return (
		<Fragment>
			<AppBar
				onMenuClick={showMenu ? () => setDrawerOpenState(true) : undefined}
				title={title}
				renderActions={renderActions}
				onLogoClick={onLogoClick}
			/>
			<Drawer
				anchor="right"
				isOpen={isDrawerOpen}
				list={menuList}
				onClick={() => setDrawerOpenState(false)}
				onClose={() => setDrawerOpenState(false)}
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
	renderActions: PropTypes.func,
	showMenu: PropTypes.bool
};
