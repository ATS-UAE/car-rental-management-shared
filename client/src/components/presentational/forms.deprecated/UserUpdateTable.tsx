import React, { useState } from "react";
import PropTypes from "prop-types";
import { Dialog, Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import UserUpdate from "./UserUpdate";
import UserTable from "../../containers.deprecated/display/UserTableView";
function UserUpdateTable({
	classes,
	onSubmit,
	isDialogOpen,
	setIsDialogOpen,
	onTableRowClick,
	onUserUpdateChange,
	userUpdateData
}) {
	const [isDialogOpenState, setIsDialogOpenState] = useState(false);
	const open = isDialogOpen === undefined ? isDialogOpenState : isDialogOpen;
	const setIsOpen =
		setIsDialogOpen === undefined ? setIsDialogOpenState : setIsDialogOpen;
	return (
		<Paper className={classes.paper}>
			<UserTable
				onClick={user => {
					setIsOpen(true);
					onTableRowClick(user);
				}}
			/>
			<Dialog open={open} onClose={() => setIsOpen(false)}>
				<UserUpdate
					values={userUpdateData}
					onChange={user => {
						onUserUpdateChange(user);
					}}
					onSubmit={() => {
						onSubmit && onSubmit();
					}}
				/>
			</Dialog>
		</Paper>
	);
}

UserUpdateTable.propTypes = {
	onSubmit: PropTypes.func,
	isDialogOpen: PropTypes.bool,
	setIsDialogOpen: PropTypes.func,
	onTableRowClick: PropTypes.func,
	onUserUpdateChange: PropTypes.func,
	userUpdateData: PropTypes.shape({
		userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
			.isRequired,
		username: PropTypes.string.isRequired,
		firstName: PropTypes.string.isRequired,
		lastName: PropTypes.string.isRequired,
		mobileNumber: PropTypes.string.isRequired,
		gender: PropTypes.string.isRequired,
		roleId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
	}).isRequired
};

const style = theme => ({
	paper: {
		padding: theme.spacing(3)
	}
});

export default withStyles(style)(UserUpdateTable);
