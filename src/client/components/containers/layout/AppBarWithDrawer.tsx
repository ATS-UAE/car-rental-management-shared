import React, { useEffect, FC } from "react";
import { withRouter } from "react-router-dom";
import { connect, ResolveThunks } from "react-redux";
import { compose } from "recompose";
import { ExitToApp } from "@material-ui/icons";
import { History } from "history";

import { AppBarWithDrawer, DrawerListItem } from "../../presentational";
import * as actions from "../../../actions";
import { Typography } from "@material-ui/core";
import { pages } from "../../../variables";
import { toTitleWords } from "../../../utils/helpers";
import { ReduxState } from "../../../reducers";

interface AppBarWithDrawerStateProps {
	auth: ReduxState["auth"];
}

type AppBarWithDrawerActionProps = ResolveThunks<typeof actions>;

interface AppBarWithDrawerInnerProps {
	history: History;
}

type Props = AppBarWithDrawerInnerProps &
	AppBarWithDrawerActionProps &
	AppBarWithDrawerStateProps;

export const AppBarWithDrawerContainer: FC<Props> = ({
	auth,
	history,
	fetchCurrentUserDetails,
	authLogout
}) => {
	useEffect(() => {
		fetchCurrentUserDetails();
	}, []);
	let menuList: DrawerListItem[][] = [];
	let endList: DrawerListItem[][] = [];
	let profile;
	if (auth && auth.data) {
		let pageList: DrawerListItem[] = [];
		let optionsList: DrawerListItem[] = [];
		let role = auth.data.role;
		profile = {
			title: `${auth.data.firstName} ${auth.data.lastName}`,
			subtitle: `${toTitleWords(role)}`,
			initials: `${auth.data.firstName[0] || ""}${auth.data.lastName[0] || ""}`,
			imgSrc: auth.data.userImageSrc
		};
		for (let page of pages) {
			if (page.sidebar !== undefined) {
				if (
					page.access === undefined ||
					(page.access && page.access.includes(role))
				) {
					if (page.sidebar.location === "bottom") {
						optionsList.push({
							icon: <page.sidebar.icon />,
							text: <Typography>{page.sidebar.title}</Typography>,
							onClick: () => history.push(page.path)
						});
					} else {
						pageList.push({
							icon: <page.sidebar.icon />,
							text: <Typography>{page.sidebar.title}</Typography>,
							onClick: () => history.push(page.path)
						});
					}
				}
			}
		}
		if (pageList.length) {
			menuList.push(pageList);
		}
		optionsList.push({
			icon: <ExitToApp />,
			text: <Typography>Logout</Typography>,
			onClick: async () => {
				authLogout();
				history.push("/");
			}
		});
		endList.push(optionsList);
	}

	return (
		<>
			<AppBarWithDrawer
				onLogoClick={() => {
					history.location.pathname !== "/" && history.push("/");
				}}
				showMenu={auth === null ? false : true}
				logoSrc="/static/images/logo-navigation.png"
				logoAlt="Company Logo"
				list={menuList}
				endList={endList}
				profile={profile}
			/>
		</>
	);
};

const mapStateToProps = ({ auth }) => ({
	auth
});

export default compose<Props, {}>(
	connect(mapStateToProps, actions),
	withRouter
)(AppBarWithDrawerContainer);
