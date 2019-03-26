import React, { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import { api } from "../../../utils";
import UserUpdateTable from "../../presentational/forms/UserUpdateTable";

function UserUpdateTableContainer({ fetchUsers }) {
	const [userData, setUserData] = useState({
		userId: "",
		username: "",
		firstName: "",
		lastName: "",
		email: "",
		mobileNumber: "",
		gender: "",
		roleId: ""
	});
	return (
		<UserUpdateTable
			userUpdateData={{
				userId: userData.userId,
				username: userData.username,
				firstName: userData.firstName,
				lastName: userData.lastName,
				email: userData.email,
				mobileNumber: userData.mobileNumber,
				gender: userData.gender,
				roleId: userData.roleId
			}}
			onTableRowClick={user =>
				setUserData({ userId: user.id, roleId: user.role.id, ...user })
			}
			onUserUpdateChange={user =>
				setUserData({ userId: user.id, roleId: user.role.id, ...user })
			}
			onSubmit={() => api.updateUser(userData).then(() => fetchUsers())}
		/>
	);
}

export default connect(
	null,
	actions
)(UserUpdateTableContainer);
