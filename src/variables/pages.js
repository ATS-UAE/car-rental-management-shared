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

import DynamicImport from "../components/containers/layout/DynamicImport";
import Loading from "../components/presentational/layout/Loading";

export default [
	{
		id: "Home",
		path: "/",
		component: props => (
			<DynamicImport load={() => import("../components/pages/Home")}>
				{Component => (Component ? <Component {...props} /> : <Loading />)}
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
				{Component => (Component ? <Component {...props} /> : <Loading />)}
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
		access: [roles.KEY_MANAGER, roles.ADMIN],
		component: props => (
			<DynamicImport load={() => import("../components/pages/Locations")}>
				{Component => (Component ? <Component {...props} /> : <Loading />)}
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
				{Component => (Component ? <Component {...props} /> : <Loading />)}
			</DynamicImport>
		)
	},
	{
		id: "SignUp",
		path: "/signup",
		component: props => (
			<DynamicImport load={() => import("../components/pages/SignUp")}>
				{Component => (Component ? <Component {...props} /> : <Loading />)}
			</DynamicImport>
		),
		wrapPaper: true
	},
	{
		id: "Users",
		path: "/users",
		component: props => (
			<DynamicImport load={() => import("../components/pages/Users")}>
				{Component => (Component ? <Component {...props} /> : <Loading />)}
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
				{Component => (Component ? <Component {...props} /> : <Loading />)}
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
				{Component => (Component ? <Component {...props} /> : <Loading />)}
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
				{Component => (Component ? <Component {...props} /> : <Loading />)}
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
				{Component => (Component ? <Component {...props} /> : <Loading />)}
			</DynamicImport>
		),
		requireLogin: true,
		title: "Settings",
		sidebar: { icon: Settings, location: "bottom" },
		wrapPaper: true
	},
	{
		id: "404",
		path: "/",
		component: props => (
			<DynamicImport load={() => import("../components/pages/404")}>
				{Component => (Component ? <Component {...props} /> : <Loading />)}
			</DynamicImport>
		),
		exact: false
	}
];
