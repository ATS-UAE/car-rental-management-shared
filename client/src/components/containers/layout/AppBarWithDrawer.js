import React, { Fragment, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { ExitToApp } from "@material-ui/icons";

import AppBarWithDrawer from "../../presentational/layout/AppBarWithDrawer";
import * as actions from "../../../actions";
import { Typography } from "@material-ui/core";
import { pages } from "../../../variables";
import { toTitleWords } from "../../../utils/helpers";

function AppBarWithDrawerContainer({
	auth,
	enums,
	history,
	fetchEnums,
	fetchCurrentUserDetails,
	authLogout
}) {
	useEffect(() => {
		fetchEnums();
		fetchCurrentUserDetails();
	}, []);
	let menuList = [];
	let endList = [];
	let profile;
	if (auth && enums) {
		let pageList = [];
		let optionsList = [];
		let role = auth.data.role;
		profile = {
			title: `${auth.data.firstName} ${auth.data.lastName}`,
			subtitle: `${toTitleWords(auth.data.role.name)}`,
			initials: `${auth.data.firstName[0]}${auth.data.lastName[0]}`,
			imgSrc: auth.data.userImageSrc || null
		};
		for (let page of pages) {
			if (page.sidebar !== undefined) {
				if (
					page.access === undefined ||
					(page.access && page.access.includes(role.name))
				) {
					if (page.sidebar.location === "bottom") {
						optionsList.push({
							path: page.path,
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
			onClick: () => {
				authLogout().then(() => {
					history.push("/");
				});
			}
		});
		endList.push(optionsList);
	}

	return (
		<Fragment>
			<AppBarWithDrawer
				onLogoClick={() => {
					history.location.pathname !== "/" && history.push("/");
				}}
				showMenu={auth === null ? false : true}
				list={menuList}
				endList={endList}
				profile={profile}
			/>
		</Fragment>
	);
}

const mapStateToProps = ({ auth, enums, permissionData }) => ({
	auth,
	enums,
	permissionData
});

export default compose(
	connect(
		mapStateToProps,
		actions
	),
	withRouter
)(AppBarWithDrawerContainer);
