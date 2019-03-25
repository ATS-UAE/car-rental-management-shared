import React, { useState } from "react";
import { Dialog, Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import UserUpdate from "./UserUpdate";
import UserTable from "../../containers/display/UserTable";
function UserUpdateTable({ classes, onSubmit, isDialogOpen, setIsDialogOpen }) {
	const [isDialogOpenState, setIsDialogOpenState] = useState(false);
	const [userUpdateData, setUserUpdateData] = useState({});
	const open = isDialogOpen === undefined ? isDialogOpenState : isDialogOpen;
	const setIsOpen =
		setIsDialogOpen === undefined ? setIsDialogOpenState : setIsDialogOpen;
	return (
		<Paper className={classes.paper}>
			<UserTable
				onClick={user => {
					setIsOpen(true);
					setUserUpdateData({
						userId: user.id,
						username: user.username,
						firstName: user.firstName,
						lastName: user.lastName,
						email: user.email,
						mobileNumber: user.mobileNumber,
						gender: user.gender,
						roleId: user.role.id
					});
				}}
			/>
			<Dialog open={open} onClose={() => setIsOpen(false)}>
				<UserUpdate
					values={userUpdateData}
					onChange={user => {
						setUserUpdateData({ id: user.userId, ...user });
					}}
					onSubmit={() => {
						onSubmit && onSubmit(userUpdateData);
					}}
				/>
			</Dialog>
		</Paper>
	);
}

const style = theme => ({
	paper: {
		padding: theme.spacing.unit * 3
	}
});

export default withStyles(style)(UserUpdateTable);
