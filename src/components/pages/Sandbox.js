import React from "react";
import { Typography, Paper } from "@material-ui/core";

import Login from "../containers/forms/Login";
import UserCreate from "../containers/forms/UserCreate";
import UserUpdateTable from "../containers/forms/UserUpdateTable";
import GuestInvite from "../containers/forms/GuestInvite";
import GuestSignUp from "../containers/forms/GuestSignUp";
import VehicleCreate from "../containers/forms/VehicleCreate";
import BookingCreate from "../containers/forms/BookingCreate";
import VehicleTableView from "../containers/display/VehicleTableView";

export default function Locations() {
	return (
		<Paper>
			<Typography headlineMapping={{ h1: "h6" }}>Sandbox Page</Typography>
			<Login />
			<UserCreate />
			<UserUpdateTable />
			<GuestInvite />
			<GuestSignUp />
			<VehicleCreate />
			<VehicleTableView />
			<BookingCreate />
		</Paper>
	);
}
