import React, { useEffect, useState, Fragment } from "react";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { IconButton } from "@material-ui/core";
import { Edit, Visibility } from "@material-ui/icons";
import { connect } from "react-redux";
import * as reduxActions from "../../../actions";
import TableView from "../../presentational/forms/TableView";
import UserFormUpdate from "../forms/users/UserFormUpdate";
import FormPage from "../../pages/FormPage";
import { api, toTitleWords } from "../../../utils";
import { actions, resources } from "../../../variables/enums";
import Can from "../layout/Can";
function UserTable({ users, auth, fetchEnums, fetchUsers, history }) {
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
						{ value: user.mobileNumber },
						{ value: toTitleWords(user.role.name) },
						{
							value: (
								<Can
									action={actions.READ}
									resource={resources.USERS}
									yes={readAccess => (
										<Can
											action={actions.UPDATE}
											resource={resources.USERS}
											params={{
												role: user.role,
												updateUser: { id: user.id },
												currentUser: { id: auth.data.id }
											}}
											yes={updateAccess => (
												<IconButton
													onClick={() => {
														api.fetchUser(user.id).then(() =>
															history.push(`/users/${user.id}/edit`, {
																user: { ...user, roleId: user.role.id },
																updateAccess,
																readAccess
															})
														);
													}}
												>
													<Edit />
												</IconButton>
											)}
											no={() => (
												<IconButton
													onClick={() => {
														api.fetchUser(user.id).then(() =>
															history.push(`/users/${user.id}/edit`, {
																user: { ...user, roleId: user.role.id },
																readAccess
															})
														);
													}}
												>
													<Visibility />
												</IconButton>
											)}
										/>
									)}
								/>
							)
						}
					]
				};

				return row;
		  })
		: [];
	return (
		<Fragment>
			<FormPage
				check={({ location }) => /\/users\/\d+/.test(location.pathname)}
				path="/users/:id"
				exitPath="/users"
				onMount={({ location }) => setFormData(location.state.user)}
				render={({ location }) => {
					let readOnly = [];
					let exclude = [];
					let showFooter = false;
					if (location.state.updateAccess) {
						exclude = location.state.readAccess.excludedFields;
						readOnly = location.state.updateAccess.excludedFields;
						showFooter = true;
					} else {
						exclude = location.state.readAccess.excludedFields;
						readOnly = true;
					}
					return (
						<UserFormUpdate
							values={formData}
							readOnly={readOnly}
							exclude={exclude}
							showFooter={showFooter}
							onChangeEvent={(data, name, event) =>
								event.target.files
									? setFormData({
											...data,
											[name]: event.target.files[0] || ""
									  })
									: setFormData(data)
							}
							title={showFooter ? "Update User" : "User Details"}
							hints={showFooter ? "*Required" : ""}
							onSubmit={() => history.push("/users")}
						/>
					);
				}}
			/>
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
								{ value: "Role" },
								{ value: "Actions" }
							]
						}
					],
					body: tableBody
				}}
			/>
		</Fragment>
	);
}

const mapStateToProps = ({ users, auth, enums }) => ({ users, auth, enums });

export default compose(
	withRouter,
	connect(
		mapStateToProps,
		reduxActions
	)
)(UserTable);
