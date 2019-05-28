import React from "react";
import {
	DirectionsCar,
	SupervisedUserCircle,
	Place,
	ChromeReaderMode,
	Settings,
	Home,
	Warning
} from "@material-ui/icons";

import roles from "./enums/roles";
// import HomePage from "../components/pages/Home";
// import Bookings from "../components/pages/Bookings";
// import Locations from "../components/pages/Locations";
// import Login from "../components/pages/Login";
// import SignUp from "../components/pages/SignUp";
// import Users from "../components/pages/Users";
// import Vehicles from "../components/pages/Vehicles";
// import SettingsPage from "../components/pages/Settings";
// import Accidents from "../components/pages/Accidents";
// import UnknownPage from "../components/pages/404";

import DynamicImport from "../components/containers/layout/DynamicImport";

export default [
	{
		id: "Home",
		path: "/",
		component: props => (
			<DynamicImport load={() => import("../components/pages/Home")}>
				{Component => (Component ? <Component {...props} /> : null)}
			</DynamicImport>
		),
		exact: true,
		requireLogin: true,
		title: "Home",
		sidebar: { icon: Home, location: "top" },
		wrapPaper: true
	},
	{
		id: "Bookings",
		path: "/bookings",
		component: props => (
			<DynamicImport load={() => import("../components/pages/Bookings")}>
				{Component => (Component ? <Component {...props} /> : null)}
			</DynamicImport>
		),
		requireLogin: true,
		title: "Bookings",
		sidebar: { icon: ChromeReaderMode, location: "top" },
		wrapPaper: true
	},
	{
		id: "Locations",
		path: "/locations",
		component: props => (
			<DynamicImport load={() => import("../components/pages/Locations")}>
				{Component => (Component ? <Component {...props} /> : null)}
			</DynamicImport>
		),
		requireLogin: true,
		title: "Locations",
		sidebar: { icon: Place, location: "top" },
		wrapPaper: true
	},
	{
		id: "Login",
		path: "/login",
		component: props => (
			<DynamicImport load={() => import("../components/pages/Login")}>
				{Component => (Component ? <Component {...props} /> : null)}
			</DynamicImport>
		)
	},
	{
		id: "SignUp",
		path: "/signup",
		component: props => (
			<DynamicImport load={() => import("../components/pages/Login")}>
				{Component => (Component ? <Component {...props} /> : null)}
			</DynamicImport>
		),
		wrapPaper: true
	},
	{
		id: "Users",
		path: "/users",
		component: props => (
			<DynamicImport load={() => import("../components/pages/Users")}>
				{Component => (Component ? <Component {...props} /> : null)}
			</DynamicImport>
		),
		requireLogin: true,
		access: [roles.KEY_MANAGER, roles.ADMIN],
		title: "Users",
		sidebar: { icon: SupervisedUserCircle, location: "top" },
		wrapPaper: true
	},
	{
		id: "Vehicles",
		path: "/vehicles",
		component: props => (
			<DynamicImport load={() => import("../components/pages/Vehicles")}>
				{Component => (Component ? <Component {...props} /> : null)}
			</DynamicImport>
		),
		requireLogin: true,
		title: "Vehicles",
		sidebar: { icon: DirectionsCar, location: "top" },
		wrapPaper: true
	},
	{
		id: "Accidents",
		path: "/accidents",
		component: props => (
			<DynamicImport load={() => import("../components/pages/Accidents")}>
				{Component => (Component ? <Component {...props} /> : null)}
			</DynamicImport>
		),
		requireLogin: true,
		title: "Accidents",
		access: [roles.KEY_MANAGER, roles.ADMIN],
		sidebar: { icon: Warning, location: "top" },
		wrapPaper: true
	},
	{
		id: "Accidents",
		path: "/accidents",
		component: props => (
			<DynamicImport load={() => import("../components/pages/Accidents")}>
				{Component => (Component ? <Component {...props} /> : null)}
			</DynamicImport>
		),
		requireLogin: true,
		title: "Report an Accident",
		access: [roles.GUEST],
		sidebar: { icon: Warning, location: "bottom" },
		wrapPaper: true
	},
	{
		id: "Settings",
		path: "/settings",
		component: props => (
			<DynamicImport load={() => import("../components/pages/Settings")}>
				{Component => (Component ? <Component {...props} /> : null)}
			</DynamicImport>
		),
		requireLogin: true,
		title: "Settings",
		sidebar: { icon: Settings, location: "bottom" },
		wrapPaper: true
	},
	{
		id: "All",
		path: "/",
		component: props => (
			<DynamicImport load={() => import("../components/pages/All")}>
				{Component => (Component ? <Component {...props} /> : null)}
			</DynamicImport>
		),
		exact: false
	}
];
