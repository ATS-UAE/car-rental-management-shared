import React, { Fragment, useState } from "react";
import { Dialog } from "@material-ui/core";
import UserUpdate from "./UserUpdate";
import UserTable from "../../containers/display/UserTable";
export default function UserUpdateTable() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [userUpdateData, setUserUpdateData] = useState({});
	return (
		<Fragment>
			<UserTable
				onClick={user => {
					console.log(user);
					setIsDialogOpen(true);
					setUserUpdateData(user);
				}}
			/>
			<Dialog open={isDialogOpen} values={userUpdateData}>
				<UserUpdate />
			</Dialog>
		</Fragment>
	);
}
