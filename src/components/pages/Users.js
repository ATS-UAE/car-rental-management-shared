import React from "react";
import { Grid } from "@material-ui/core";
import UserCreate from "../containers/forms/UserCreate";
import GuestInvite from "../containers/forms/GuestInvite";
import UserTable from "../containers/display/UserTable";

export default function Users() {
	return (
		<div>
			<div>
				<GuestInvite />
			</div>
			<div>
				<UserCreate />
			</div>
			<div>
				<UserTable />
			</div>
		</div>
	);
}
