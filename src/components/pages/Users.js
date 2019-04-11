import React from "react";
import { Paper } from "@material-ui/core";
import UserCreate from "../containers/forms/UserCreate";
import UserTable from "../containers/display/UserTable";

export default function Users() {
	return (
		<Paper>
			<UserCreate />
			<UserTable />
		</Paper>
	);
}
