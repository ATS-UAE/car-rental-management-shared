import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "./AppBar";
import Drawer from "./Drawer";

export default function AppBarWithDrawer({
	list,
	renderActions,
	title,
	onLogoClick,
	showMenu,
	endList
}) {
	const [isDrawerOpen, setDrawerOpenState] = useState(false);
	return (
		<Fragment>
			<AppBar
				onMenuClick={
					showMenu && (list.length || endList.length)
						? () => setDrawerOpenState(true)
						: undefined
				}
				title={title}
				renderActions={renderActions}
				onLogoClick={onLogoClick}
			/>
			<Drawer
				anchor="right"
				isOpen={isDrawerOpen}
				list={list}
				onClick={() => setDrawerOpenState(false)}
				onClose={() => setDrawerOpenState(false)}
				endList={endList}
			/>
		</Fragment>
	);
}

AppBarWithDrawer.propTypes = {
	list: PropTypes.arrayOf(
		PropTypes.arrayOf(
			PropTypes.shape({
				icon: PropTypes.node.isRequired,
				text: PropTypes.node.isRequired,
				onClick: PropTypes.func
			})
		)
	),
	title: PropTypes.string,
	renderActions: PropTypes.func,
	showMenu: PropTypes.bool
};

AppBarWithDrawer.defaultProps = {
	showMenu: false,
	list: []
};
