import {
	DirectionsCar,
	SupervisedUserCircle,
	Place,
	ChromeReaderMode,
	Settings,
	Home
} from "@material-ui/icons";

import HomePage from "../components/pages/Home";
import Bookings from "../components/pages/Bookings";
import Locations from "../components/pages/Locations";
import Login from "../components/pages/Login";
import SignUp from "../components/pages/SignUp";
import Users from "../components/pages/Users";
import Vehicles from "../components/pages/Vehicles";
import SettingsPage from "../components/pages/Settings";
import All from "../components/pages/All";
import UnknownPage from "../components/pages/404";

export const ROLES = {
	GUEST: "GUEST",
	KEY_MANAGER: "KEY_MANAGER",
	ADMIN: "ADMIN"
};

export const ACTIONS = {
	CREATE: "CREATE",
	READ: "READ",
	UPDATE: "UPDATE",
	DELETE: "DELETE"
};

export const RESOURCES = {
	VEHICLES: "VEHICLES",
	LOCATIONS: "LOCATIONS",
	BOOKINGS: "BOOKINGS",
	USERS: "USERS"
};

export const pages = [
	{
		id: "Home",
		path: "/",
		component: HomePage,
		exact: true,
		requireLogin: true,
		title: "Home",
		sidebar: { icon: Home, location: "top" }
	},
	{
		id: "Bookings",
		path: "/bookings",
		component: Bookings,
		requireLogin: true,
		title: "Bookings",
		sidebar: { icon: ChromeReaderMode, location: "top" }
	},
	{
		id: "Locations",
		path: "/locations",
		component: Locations,
		requireLogin: true,
		title: "Locations",
		sidebar: { icon: Place, location: "top" }
	},
	{ id: "Login", path: "/login", component: Login },
	{ id: "SignUp", path: "/signup", component: SignUp },
	{
		id: "Users",
		path: "/users",
		component: Users,
		requireLogin: true,
		access: [ROLES.KEY_MANAGER, ROLES.ADMIN],
		title: "Users",
		sidebar: { icon: SupervisedUserCircle, location: "top" }
	},
	{
		id: "Vehicles",
		path: "/vehicles",
		component: Vehicles,
		requireLogin: true,
		title: "Vehicles",
		sidebar: { icon: DirectionsCar, location: "top" }
	},
	{
		id: "Settings",
		path: "/settings",
		component: SettingsPage,
		title: "Settings",
		sidebar: { icon: Settings, location: "bottom" }
	},
	{ id: "All", path: "/", component: UnknownPage, exact: false }
];
