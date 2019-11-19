import React from "react";
import {
	DirectionsCar,
	SupervisedUserCircle,
	Place,
	ChromeReaderMode,
	Settings,
	Home,
	Warning,
	People,
	Assessment
} from "@material-ui/icons";

import Role from "./enums/Role";

import DynamicImport from "../components/containers/layout/DynamicImport";
import Loading from "../components/presentational/layout/Loading";
import { IPage } from "../typings";

const pages: IPage[] = [
	{
		id: "Home",
		path: "/",
		component: props => (
			<DynamicImport
				load={async () => (await import("../components/pages/Home")).default}
			>
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
			<DynamicImport
				load={async () =>
					(await import("../components/pages/Bookings")).default
				}
			>
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
		access: [Role.MASTER, Role.KEY_MANAGER, Role.ADMIN],
		component: props => (
			<DynamicImport
				load={async () =>
					(await import("../components/pages/Locations")).default
				}
			>
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
			<DynamicImport
				load={async () => (await import("../components/pages/Login")).default}
			>
				{Component => (Component ? <Component {...props} /> : <Loading />)}
			</DynamicImport>
		)
	},
	{
		id: "SignUp",
		path: "/signup",
		component: props => (
			<DynamicImport
				load={async () => (await import("../components/pages/SignUp")).default}
			>
				{Component => (Component ? <Component {...props} /> : <Loading />)}
			</DynamicImport>
		),
		wrapPaper: true
	},
	{
		id: "Users",
		path: "/users",
		component: props => (
			<DynamicImport
				load={async () => (await import("../components/pages/Users")).default}
			>
				{Component => (Component ? <Component {...props} /> : <Loading />)}
			</DynamicImport>
		),
		requireLogin: true,
		access: [Role.MASTER, Role.KEY_MANAGER, Role.ADMIN],
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
			<DynamicImport
				load={async () =>
					(await import("../components/pages/Vehicles")).default
				}
			>
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
			<DynamicImport
				load={async () =>
					(await import("../components/pages/Accidents")).default
				}
			>
				{Component => (Component ? <Component {...props} /> : <Loading />)}
			</DynamicImport>
		),
		requireLogin: true,
		access: [Role.MASTER, Role.KEY_MANAGER, Role.ADMIN],
		sidebar: {
			title: "Accidents",
			icon: Warning,
			location: "top"
		},
		wrapPaper: true
	},
	{
		id: "Clients",
		path: "/clients",
		component: props => (
			<DynamicImport
				load={async () => (await import("../components/pages/Clients")).default}
			>
				{Component => (Component ? <Component {...props} /> : <Loading />)}
			</DynamicImport>
		),
		requireLogin: true,
		access: [Role.MASTER],
		sidebar: {
			title: "Clients",
			icon: People,
			location: "top"
		},
		wrapPaper: true
	},
	{
		id: "Settings",
		path: "/settings",
		component: props => (
			<DynamicImport
				load={async () =>
					(await import("../components/pages/Settings")).default
				}
			>
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
			<DynamicImport
				load={async () => (await import("../components/pages/404")).default}
			>
				{Component => (Component ? <Component {...props} /> : <Loading />)}
			</DynamicImport>
		),
		exact: false
	}
];

export default pages;
