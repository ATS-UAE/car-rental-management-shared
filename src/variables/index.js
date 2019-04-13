import Home from "../components/pages/Home";
import Bookings from "../components/pages/Bookings";
import Locations from "../components/pages/Locations";
import Login from "../components/pages/Login";
import SignUp from "../components/pages/SignUp";
import Users from "../components/pages/Users";
import Vehicles from "../components/pages/Vehicles";
import Sandbox from "../components/pages/Sandbox";
import All from "../components/pages/All";

export const pages = [
	{ id: "All", path: "/", component: All, exact: false },
	{
		id: "Bookings",
		path: "/bookings",
		component: Bookings,
		requireLogin: true
	},
	{ id: "Home", path: "/", component: Home, exact: true },
	{
		id: "Locations",
		path: "/locations",
		component: Locations,
		requireLogin: true
	},
	{ id: "Login", path: "/login", component: Login },
	{ id: "SignUp", path: "/signup", component: SignUp },
	{ id: "Users", path: "/users", component: Users, requireLogin: true },
	{
		id: "Vehicles",
		path: "/vehicles",
		component: Vehicles,
		requireLogin: true
	},
	{ id: "Sandbox", path: "/sandbox", component: Sandbox, requireLogin: true }
];

export const ROLES = {
	GUEST: "GUEST",
	KEY_MANAGER: "KEY_MANAGER",
	ADMIN: "ADMIN"
};
