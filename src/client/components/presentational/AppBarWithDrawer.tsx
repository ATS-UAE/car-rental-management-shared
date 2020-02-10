import React, { useState, FC } from "react";
import { AppBar, Drawer, DrawerProps, AppBarProps } from ".";

export interface AppBarWithDrawerProps
	extends Omit<DrawerProps, "onClick" | "onClose" | "classes" | "isOpen">,
		Omit<AppBarProps, "onMenuClick" | "classes"> {
	showMenu: boolean;
	title?: string;
}

export const AppBarWithDrawer: FC<AppBarWithDrawerProps> = ({
	list,
	showMenu,
	...otherProps
}) => {
	const [isDrawerOpen, setDrawerOpenState] = useState(false);

	const {
		title,
		renderActions,
		logoSrc,
		logoAlt,
		onLogoClick,
		...drawerProps
	} = otherProps;
	const appBarProps = { title, renderActions, logoSrc, logoAlt, onLogoClick };

	return (
		<>
			<AppBar
				onMenuClick={
					showMenu &&
					((list && list.length) ||
						(drawerProps.endList && drawerProps.endList.length))
						? () => setDrawerOpenState(true)
						: undefined
				}
				{...appBarProps}
			/>
			<Drawer
				isOpen={isDrawerOpen}
				onClick={() => setDrawerOpenState(false)}
				onClose={() => setDrawerOpenState(false)}
				{...drawerProps}
			/>
		</>
	);
};
