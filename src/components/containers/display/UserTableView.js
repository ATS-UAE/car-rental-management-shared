import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import TableView from "../../presentational/forms/TableView";
import UserForm from "../../presentational/forms/UserForm";
import { api, toTitleWords } from "../../../utils";
import { ROLES } from "../../../variables";
function UserTable({ users, enums, fetchEnums, fetchUsers, onSubmit }) {
	useEffect(() => {
		fetchUsers();
		fetchEnums();
	}, []);
	const [open, setOpen] = useState(false);
	const [formData, setFormData] = useState({});
	const tableBody = users
		? users.data.map(user => {
				let row = {
					metadata: user,
					values: [
						{ value: user.username },
						{ value: user.firstName },
						{ value: user.lastName },
						{ value: user.gender },
						{ value: user.email },
						{ value: user.mobileNumber }
					],
					onClick: () => {
						setOpen(true);
						setFormData({ ...user, roleId: user.role.id });
					}
				};

				return row;
		  })
		: [];
	let roleList = [{ value: "", label: "Loading..." }];
	if (enums && enums.data) {
		let userRole = enums.data.roles.find(role => role.id === formData.roleId);
		if (userRole) {
			roleList = [{ value: userRole.id, label: toTitleWords(userRole.name) }];
		} else {
			roleList = enums.data.roles.reduce((acc, role) => {
				if (role.name !== ROLES.GUEST) {
					acc.push({ value: role.id, label: toTitleWords(role.name) });
				}
				return acc;
			}, []);
		}
	}

	return (
		<TableView
			editable={true}
			open={open}
			onClose={() => setOpen(false)}
			tableData={{
				headers: [
					{
						values: [
							{ value: "Username" },
							{ value: "First Name" },
							{ value: "Last Name" },
							{ value: "Gender" },
							{ value: "Email" },
							{ value: "Mobile Number" },
							{ value: "Role" }
						]
					}
				],
				body: tableBody
			}}
		>
			<UserForm
				values={formData}
				onChange={setFormData}
				onSubmit={() =>
					api.updateUser(formData).then(() => {
						fetchUsers();
						onSubmit && onSubmit();
					})
				}
				roleList={roleList}
				buttonLabel="Update"
				title="Update User"
			/>
		</TableView>
	);
}

const mapStateToProps = ({ users, enums }) => ({ users, enums });

export default connect(
	mapStateToProps,
	actions
)(UserTable);
