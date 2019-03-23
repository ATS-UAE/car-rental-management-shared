import React from "react";
import { Typography, Paper } from "@material-ui/core";

import Login from "../containers/forms/Login";
import UserCreate from "../containers/forms/UserCreate";
import UserUpdateTable from "../presentational/forms/UserUpdateTable";

export default function Locations() {
	return (
		<Paper>
			<Typography headlineMapping={{ h1: "h6" }}>Sandbox Page</Typography>
			<Paper>
				<Login />
			</Paper>
			<Paper>
				<UserCreate />
			</Paper>
			<Paper>
				<UserUpdateTable />
			</Paper>
		</Paper>
	);
}
