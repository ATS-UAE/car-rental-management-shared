import React, { Fragment, useEffect, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import AppBarWithDrawer from "../../presentational/layout/AppBarWithDrawer";
import * as actions from "../../../actions";
import {
	DirectionsCar,
	SupervisedUserCircle,
	Place,
	ChromeReaderMode,
	Settings,
	ExitToApp
} from "@material-ui/icons";
import { Typography } from "@material-ui/core";
import { getPermissionData } from "../../../utils";

const linkStyle = {
	textDecoration: "none"
};

const pageMap = {
	BOOKINGS: {
		icon: <ChromeReaderMode />,
		text: (
			<Link to="/bookings" style={linkStyle}>
				<Typography>Bookings</Typography>
			</Link>
		)
	},
	LOCATIONS: {
		icon: <Place />,
		text: (
			<Link to="/locations" style={linkStyle}>
				<Typography>Locations</Typography>
			</Link>
		)
	},
	USERS: {
		icon: <SupervisedUserCircle />,
		text: (
			<Link to="/users" style={linkStyle}>
				<Typography>Users</Typography>
			</Link>
		)
	},
	VEHICLES: {
		icon: <DirectionsCar />,
		text: (
			<Link to="/vehicles" style={linkStyle}>
				<Typography>Vehicles</Typography>
			</Link>
		)
	},
	SETTINGS: {
		icon: <Settings />,
		text: (
			<Link to="/settings" style={linkStyle}>
				<Typography>Settings</Typography>
			</Link>
		)
	},
	LOGOUT: {
		icon: <ExitToApp />,
		text: <Typography>Logout</Typography>
	}
};

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
	if (auth && enums) {
		let permissionData = getPermissionData(enums, auth);
		let pageList = [];
		for (let key of Object.keys(permissionData)) {
			if (pageMap[key]) {
				pageList.push(pageMap[key]);
			}
		}
		if (pageList.length) {
			menuList.push(pageList);
		}
		endList.push([
			{ ...pageMap.SETTINGS },
			{
				...pageMap.LOGOUT,
				onClick: () => {
					authLogout().then(() => {
						history.push("/");
					});
				}
			}
		]);
	}
	return (
		<Fragment>
			<AppBarWithDrawer
				onLogoClick={() => {
					auth && history.push("/");
				}}
				showMenu={auth === null ? false : true}
				list={menuList}
				endList={endList}
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
