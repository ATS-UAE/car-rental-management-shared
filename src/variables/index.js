import Home from "../components/pages/Home";
import Bookings from "../components/pages/Bookings";
import Locations from "../components/pages/Locations";
import Login from "../components/pages/Login";
import SignUp from "../components/pages/SignUp";
import Users from "../components/pages/Users";
import Vehicles from "../components/pages/Vehicles";
import Sandbox from "../components/pages/Sandbox";

export const pages = [
	{ label: "Bookings", path: "/bookings", component: Bookings },
	{ label: "Home", path: "/", component: Home },
	{ label: "Locations", path: "/locations", component: Locations },
	{ label: "Login", path: "/login", component: Login },
	{ label: "SignUp", path: "/signup", component: SignUp },
	{ label: "Users", path: "/users", component: Users },
	{ label: "Vehicles", path: "/vehicles", component: Vehicles },
	{ label: "Sandbox", path: "/sandbox", component: Sandbox }
];
