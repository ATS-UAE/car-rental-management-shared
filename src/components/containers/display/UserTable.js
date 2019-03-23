import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import Table from "../../presentational/display/TableWithPagination";

function UserTable({ users, enums, fetchEnums, fetchUsers }) {
	useEffect(() => {
		fetchUsers();
		fetchEnums();
	}, []);
	const tableBody = users
		? users.data.map(user => {
				let row = [];
				row.push(
					user.username,
					user.firstName,
					user.lastName,
					user.gender,
					user.email,
					user.mobileNumber
				);
				if (enums && enums.data) {
					let userRole = enums.data.roles.find(
						role => user.role.id === role.id
					);
					if (userRole) {
						row.push(userRole.name);
					} else {
						row.push(user.role);
					}
				} else {
					row.push(user.role);
				}
				return row;
		  })
		: [];
	return (
		<Table
			data={{
				headers: [
					[
						{ value: "Username" },
						{ value: "First Name" },
						{ value: "Last Name" },
						{ value: "Gender" },
						{ value: "Email" },
						{ value: "Mobile Number" },
						{ value: "Role" }
					]
				],
				body: tableBody
			}}
		/>
	);
}

const mapStateToProps = ({ users, enums }) => ({ users, enums });

export default connect(
	mapStateToProps,
	actions
)(UserTable);
