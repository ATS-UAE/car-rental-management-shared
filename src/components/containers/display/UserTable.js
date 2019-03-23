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
					onClick: rowData => {
						console.log(rowData);
					}
				};
				if (enums && enums.data) {
					let userRole = enums.data.roles.find(
						role => user.role.id === role.id
					);
					if (userRole) {
						row.values.push({ value: userRole.name });
					} else {
						row.values.push({ value: user.role });
					}
				} else {
					row.values.push({ value: user.role.name });
				}
				return row;
		  })
		: [];
	return (
		<Table
			data={{
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
		/>
	);
}

const mapStateToProps = ({ users, enums }) => ({ users, enums });

export default connect(
	mapStateToProps,
	actions
)(UserTable);
