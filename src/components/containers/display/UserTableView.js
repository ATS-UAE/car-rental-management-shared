import React, { Component, Fragment } from "react";
import { Route, withRouter, Switch } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import { compose } from "recompose";
import { Dialog } from "@material-ui/core";

import * as reduxActions from "../../../actions";
import { resources, actions, roles } from "../../../variables/enums";
import { RBAC } from "../../../config/rbac";
import {
	toTitleWords,
	api,
	getBookingStatus,
	getRelatedDataById
} from "../../../utils";

import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Delete from "@material-ui/icons/Delete";
import Visibility from "@material-ui/icons/Visibility";

const tableIcons = {
	Add: AddBox,
	Check: Check,
	Clear: Clear,
	Delete: DeleteOutline,
	DetailPanel: ChevronRight,
	Edit: Edit,
	Export: SaveAlt,
	Filter: FilterList,
	FirstPage: FirstPage,
	LastPage: LastPage,
	NextPage: ChevronRight,
	PreviousPage: ChevronLeft,
	ResetSearch: Clear,
	Search: Search,
	SortArrow: ArrowUpward,
	ThirdStateCheck: Remove,
	ViewColumn: ViewColumn
};
class UserTableView extends Component {
	state = {
		userData: [],
		userActions: [],
		loadingRows: [],
		userColumns: [
			{
				title: "ID",
				type: "numeric",
				field: "id"
			},
			{
				title: "Username",
				field: "username"
			},
			{
				title: "First Name",
				field: "firstName"
			},
			{
				title: "Last Name",
				field: "lastName"
			},
			{
				title: "Email",
				field: "email"
			},
			{
				title: "Mobile Number",
				field: "mobileNumber"
			},
			{
				title: "Role",
				field: "role"
			},
			{
				title: "Sign Up Date",
				type: "datetime",
				field: "createdAt",
				hidden: true
			}
		]
	};

	componentDidUpdate(prevProps, prevState) {
		const { auth, users } = this.props;
		const { loadingRows } = this.state;
		if (
			auth !== prevProps.auth ||
			users !== prevProps.users ||
			loadingRows !== prevState.loadingRows
		) {
			this.resetActions();
		}

		if (
			auth !== prevProps.auth ||
			users !== prevProps.users ||
			loadingRows !== prevState.loadingRows
		) {
			this.reduceUserData();
		}
	}

	resetActions = async () => {
		const { auth, history } = this.props;
		if (auth && auth.data) {
			const newActions = [
				({ user, canDelete }) => {
					const visible = canDelete;
					const rowStatus = this.state.loadingRows.indexOf(user.id);
					return {
						icon: Delete,
						tooltip: "Delete",
						hidden: !visible,
						disabled: rowStatus >= 0,

						onClick: (event, { user }) => {
							history.push(`/users/${user.id}/delete`);
						}
					};
				},
				({ user, canUpdate }) => {
					const visible = canUpdate;
					const rowStatus = this.state.loadingRows.indexOf(user.id);
					return {
						icon: Edit,
						tooltip: "Edit",
						hidden: !visible,
						disabled: rowStatus >= 0,

						onClick: (event, { user }) => {
							history.push(`/users/${user.id}/edit`);
						}
					};
				},
				({ user, canUpdate }) => {
					const visible = !canUpdate;
					const rowStatus = this.state.loadingRows.indexOf(user.id);
					return {
						icon: Visibility,
						tooltip: "View",
						hidden: !visible,
						disabled: rowStatus >= 0,

						onClick: (event, { user }) => {
							history.push(`/users/${user.id}`);
						}
					};
				}
			];
			this.setState({ userActions: newActions });
		}
	};

	reduceUserData = async () => {
		const { auth, users } = this.props;

		if (auth && auth.data && users && users.data) {
			let newUserData = [];
			for (let user of users.data) {
				let accessible = await RBAC.can(
					auth.data.role.name,
					actions.READ,
					resources.USERS,
					{ targetUser: user, user: auth.data, role: auth.data.role }
				);
				if (accessible) {
					const userRole = auth.data.role.name;
					const canUpdate = await RBAC.can(
						userRole,
						actions.UPDATE,
						resources.USERS,
						{ targetUser: user, user: auth.data, role: auth.data.role }
					);
					const canDelete = await RBAC.can(
						userRole,
						actions.DELETE,
						resources.USERS
					);
					const userSignUpDate = moment(user.createdAt, "X");
					newUserData.push({
						id: user.id,
						username: user.username,
						firstName: user.firstName,
						lastName: user.lastName,
						email: user.email,
						mobileNumber: user.mobileNumber,
						role: toTitleWords(user.role.name),
						createdAt: userSignUpDate.toDate(),
						user,
						canDelete,
						canUpdate
					});
				}
				this.setState({ userData: newUserData });
			}
		}
	};

	render() {
		const { history } = this.props;
		return (
			<Fragment>
				<Switch>
					<Route
						path="/users/:id"
						render={() => {
							return (
								<Dialog open={true} onClose={() => history.push("/users")}>
									Loading
								</Dialog>
							);
						}}
					/>
					<Route
						path="/users/:id/edit"
						render={() => {
							return (
								<Dialog open={true} onClose={() => history.push("/users")}>
									Loading
								</Dialog>
							);
						}}
					/>
					<Route
						path="/users/:id/delete"
						render={() => {
							return (
								<Dialog open={true} onClose={() => history.push("/users")}>
									Loading
								</Dialog>
							);
						}}
					/>
				</Switch>
				<MaterialTable
					icons={tableIcons}
					columns={this.state.userColumns}
					data={this.state.userData}
					title="Users"
					options={{
						filtering: true,
						grouping: true,
						columnsButton: true
					}}
					actions={this.state.userActions}
				/>
			</Fragment>
		);
	}
}

const mapStateToProps = ({ enums, auth, users }) => ({
	users,
	enums,
	auth
});

export default compose(
	connect(mapStateToProps),
	withRouter
)(UserTableView);

// import React, { useEffect, useState, Fragment } from "react";
// import { withRouter } from "react-router";
// import { compose } from "recompose";
// import { IconButton } from "@material-ui/core";
// import { Edit, Visibility } from "@material-ui/icons";
// import { connect } from "react-redux";
// import * as reduxActions from "../../../actions";
// import TableView from "../../presentational/forms/TableView";
// import UserFormUpdate from "../forms/users/UserFormUpdate";
// import FormPage from "../../pages/FormPage";
// import { api, toTitleWords } from "../../../utils";
// import { actions, resources } from "../../../variables/enums";
// import Can from "../layout/Can";
// function UserTable({ users, auth, fetchEnums, fetchUsers, history }) {
// 	useEffect(() => {
// 		fetchUsers();
// 		fetchEnums();
// 	}, []);
// 	const [open, setOpen] = useState(false);
// 	const [formData, setFormData] = useState({});
// 	const tableBody = users
// 		? users.data.map(user => {
// 				let row = {
// 					metadata: user,
// 					values: [
// 						{ value: user.username },
// 						{ value: user.firstName },
// 						{ value: user.lastName },
// 						{ value: user.gender },
// 						{ value: user.email },
// 						{ value: user.mobileNumber },
// 						{ value: toTitleWords(user.role.name) },
// 						{
// 							value: (
// 								<Can
// 									action={actions.READ}
// 									resource={resources.USERS}
// 									yes={readAccess => (
// 										<Can
// 											action={actions.UPDATE}
// 											resource={resources.USERS}
// 											params={{
// 												role: user.role,
// 												updateUser: { id: user.id },
// 												currentUser: { id: auth.data.id }
// 											}}
// 											yes={updateAccess => (
// 												<IconButton
// 													onClick={() => {
// 														api.fetchUser(user.id).then(() =>
// 															history.push(`/users/${user.id}/edit`, {
// 																user: { ...user, roleId: user.role.id },
// 																updateAccess,
// 																readAccess
// 															})
// 														);
// 													}}
// 												>
// 													<Edit />
// 												</IconButton>
// 											)}
// 											no={() => (
// 												<IconButton
// 													onClick={() => {
// 														api.fetchUser(user.id).then(() =>
// 															history.push(`/users/${user.id}/edit`, {
// 																user: { ...user, roleId: user.role.id },
// 																readAccess
// 															})
// 														);
// 													}}
// 												>
// 													<Visibility />
// 												</IconButton>
// 											)}
// 										/>
// 									)}
// 								/>
// 							)
// 						}
// 					]
// 				};

// 				return row;
// 		  })
// 		: [];
// 	return (
// 		<Fragment>
// 			<FormPage
// 				check={({ location }) => /\/users\/\d+/.test(location.pathname)}
// 				path="/users/:id"
// 				exitPath="/users"
// 				onMount={({ location }) => setFormData(location.state.user)}
// 				render={({ location }) => {
// 					let readOnly = [];
// 					let exclude = [];
// 					let showFooter = false;
// 					if (location.state.updateAccess) {
// 						exclude = location.state.readAccess.excludedFields;
// 						readOnly = location.state.updateAccess.excludedFields;
// 						showFooter = true;
// 					} else {
// 						exclude = location.state.readAccess.excludedFields;
// 						readOnly = true;
// 					}
// 					return (
// 						<UserFormUpdate
// 							values={formData}
// 							readOnly={readOnly}
// 							exclude={exclude}
// 							showFooter={showFooter}
// 							onChangeEvent={(data, name, event) =>
// 								event.target.files
// 									? setFormData({
// 											...data,
// 											[name]: event.target.files[0] || ""
// 									  })
// 									: setFormData(data)
// 							}
// 							title={showFooter ? "Update User" : "User Details"}
// 							hints={showFooter ? "*Required" : ""}
// 							onSubmit={() => history.push("/users")}
// 						/>
// 					);
// 				}}
// 			/>
// 			<TableView
// 				editable={true}
// 				open={open}
// 				onClose={() => setOpen(false)}
// 				tableData={{
// 					headers: [
// 						{
// 							values: [
// 								{ value: "Username" },
// 								{ value: "First Name" },
// 								{ value: "Last Name" },
// 								{ value: "Gender" },
// 								{ value: "Email" },
// 								{ value: "Mobile Number" },
// 								{ value: "Role" },
// 								{ value: "Actions" }
// 							]
// 						}
// 					],
// 					body: tableBody
// 				}}
// 			/>
// 		</Fragment>
// 	);
// }

// const mapStateToProps = ({ users, auth, enums }) => ({ users, auth, enums });

// export default compose(
// 	withRouter,
// 	connect(
// 		mapStateToProps,
// 		reduxActions
// 	)
// )(UserTable);
