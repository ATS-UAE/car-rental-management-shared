import React, { useState, FC } from "react";
import { AppBar, Drawer, DrawerProps, AppBarProps } from ".";

export interface AppBarWithDrawerProps {
	list: DrawerProps["list"];
	endList: DrawerProps["endList"];
	renderActions?: AppBarProps["renderActions"];
	onLogoClick: AppBarProps["onLogoClick"];
	showMenu: boolean;
	title?: string;
	profile: DrawerProps["profile"];
}

export const AppBarWithDrawer: FC<AppBarWithDrawerProps> = ({
	list,
	renderActions,
	title,
	onLogoClick,
	showMenu,
	endList,
	profile
}) => {
	const [isDrawerOpen, setDrawerOpenState] = useState(false);
	return (
		<>
			<AppBar
				onMenuClick={
					showMenu && ((list && list.length) || (endList && endList.length))
						? () => setDrawerOpenState(true)
						: undefined
				}
				title={title}
				renderActions={renderActions}
				onLogoClick={onLogoClick}
			/>
			<Drawer
				profile={profile}
				isOpen={isDrawerOpen}
				list={list}
				onClick={() => setDrawerOpenState(false)}
				onClose={() => setDrawerOpenState(false)}
				endList={endList}
			/>
		</>
	);
};
