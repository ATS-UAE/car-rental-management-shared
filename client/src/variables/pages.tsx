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

import Role from "./enums/Role";

import DynamicImport from "../components/containers.deprecated/layout/DynamicImport";
import Loading from "../components/presentational/layout/Loading";
import { IPage } from "../utils/typings";

const pages: IPage[] = [
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
		sidebar: {
			title: "Home",
			icon: Home,
			location: "top"
		},
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
		sidebar: {
			title: "Bookings",
			icon: ChromeReaderMode,
			location: "top"
		},
		wrapPaper: true
	},
	{
		id: "Locations",
		path: "/locations",
		access: [Role.KEY_MANAGER, Role.ADMIN],
		component: props => (
			<DynamicImport load={() => import("../components/pages/Locations")}>
				{Component => (Component ? <Component {...props} /> : <Loading />)}
			</DynamicImport>
		),
		requireLogin: true,
		sidebar: {
			title: "Locations",
			icon: Place,
			location: "top"
		},
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
		access: [Role.KEY_MANAGER, Role.ADMIN],
		sidebar: {
			title: "Users",
			icon: SupervisedUserCircle,
			location: "top"
		},
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
		sidebar: {
			title: "Vehicles",
			icon: DirectionsCar,
			location: "top"
		},
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
		access: [Role.KEY_MANAGER, Role.ADMIN],
		sidebar: {
			title: "Accidents",
			icon: Warning,
			location: "top"
		},
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
		access: [Role.GUEST],
		sidebar: {
			title: "Report an Accident",
			icon: Warning,
			location: "bottom"
		},
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
		sidebar: {
			title: "Settings",
			icon: Settings,
			location: "bottom"
		},
		wrapPaper: true
	},
	{
		id: "404",
		path: "/",
		component: (props: any): React.ReactNode => (
			<DynamicImport load={() => import("../components/pages/Sandbox")}>
				{Component => (Component ? <Component {...props} /> : <Loading />)}
			</DynamicImport>
		),
		exact: false
	}
];

export default pages;
