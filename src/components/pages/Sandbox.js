import React from "react";
import { Typography, Paper } from "@material-ui/core";

import Login from "../containers/Login";

export default function Locations() {
	return (
		<Paper>
			<Typography variant="h1">Sandbox Page</Typography>
			<Paper>
				<Login />
			</Paper>
		</Paper>
	);
}
