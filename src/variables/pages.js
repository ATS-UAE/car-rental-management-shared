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
import HomePage from "../components/pages/Home";
import Bookings from "../components/pages/Bookings";
import Locations from "../components/pages/Locations";
import Login from "../components/pages/Login";
import SignUp from "../components/pages/SignUp";
import Users from "../components/pages/Users";
import Vehicles from "../components/pages/Vehicles";
import SettingsPage from "../components/pages/Settings";
import Accidents from "../components/pages/Accidents";
import UnknownPage from "../components/pages/404";

export default [
	{
		id: "Home",
		path: "/",
		component: HomePage,
		exact: true,
		requireLogin: true,
		title: "Home",
		sidebar: { icon: Home, location: "top" },
		wrapPaper: true
	},
	{
		id: "Bookings",
		path: "/bookings",
		component: Bookings,
		requireLogin: true,
		title: "Bookings",
		sidebar: { icon: ChromeReaderMode, location: "top" },
		wrapPaper: true
	},
	{
		id: "Locations",
		path: "/locations",
		component: Locations,
		requireLogin: true,
		title: "Locations",
		sidebar: { icon: Place, location: "top" },
		wrapPaper: true
	},
	{ id: "Login", path: "/login", component: Login },
	{ id: "SignUp", path: "/signup", component: SignUp, wrapPaper: true },
	{
		id: "Users",
		path: "/users",
		component: Users,
		requireLogin: true,
		access: [roles.KEY_MANAGER, roles.ADMIN],
		title: "Users",
		sidebar: { icon: SupervisedUserCircle, location: "top" },
		wrapPaper: true
	},
	{
		id: "Vehicles",
		path: "/vehicles",
		component: Vehicles,
		requireLogin: true,
		title: "Vehicles",
		sidebar: { icon: DirectionsCar, location: "top" },
		wrapPaper: true
	},
	{
		id: "Accidents",
		path: "/accidents",
		component: Accidents,
		requireLogin: true,
		title: "Accidents",
		access: [roles.KEY_MANAGER, roles.ADMIN],
		sidebar: { icon: Warning, location: "top" },
		wrapPaper: true
	},
	{
		id: "Accidents",
		path: "/accidents",
		component: Accidents,
		requireLogin: true,
		title: "Report an Accident",
		access: [roles.GUEST],
		sidebar: { icon: Warning, location: "bottom" },
		wrapPaper: true
	},
	{
		id: "Settings",
		path: "/settings",
		component: SettingsPage,
		requireLogin: true,
		title: "Settings",
		sidebar: { icon: Settings, location: "bottom" },
		wrapPaper: true
	},
	{ id: "All", path: "/", component: UnknownPage, exact: false }
];
