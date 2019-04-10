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
	{ id: "Bookings", path: "/bookings", component: Bookings },
	{ id: "Home", path: "/", component: Home },
	{ id: "Locations", path: "/locations", component: Locations },
	{ id: "Login", path: "/login", component: Login },
	{ id: "SignUp", path: "/signup", component: SignUp },
	{ id: "Users", path: "/users", component: Users },
	{ id: "Vehicles", path: "/vehicles", component: Vehicles },
	{ id: "Sandbox", path: "/sandbox", component: Sandbox }
];
