import React, { Component, Fragment } from "react";
import { Route, withRouter, Switch } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import { compose } from "recompose";
import Dialog from "../../presentational/display/Dialog";
import { DialogChildren } from "../../presentational/forms/ConfirmDialog";
import UserForm from "../forms/users/UserForm";
import UserFormUpdate from "../forms/users/UserFormUpdate";
import * as reduxActions from "../../../actions";
import { Resource, Action, Role } from "../../../variables/enums";
import RBAC from "../../../utils/rbac";
import { toTitleWords, api } from "../../../utils/helpers";

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
import Visibility from "@material-ui/icons/Visibility";
import Block from "@material-ui/icons/Block";
import CheckCircle from "@material-ui/icons/CheckCircle";
import Refresh from "@material-ui/icons/Refresh";

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
	constructor(props) {
		super(props);
		this.state = {
			userData: [],
			userActions: [],
			loadingRows: [],
			isLoading: false,
			isTableLoading: false,
			formData: null,
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

		if (props.auth.data.role.name === Role.MASTER) {
			this.state.userColumns.push({
				title: "Client",
				field: "client"
			});
		}
	}

	componentDidUpdate(prevProps, prevState) {
		const { auth, users, clients } = this.props;
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
			clients !== prevProps.clients ||
			loadingRows !== prevState.loadingRows
		) {
			this.reduceUserData();
		}
	}

	resetActions = async () => {
		const { auth, history } = this.props;
		const { loadingRows } = this.state;
		const newActions = [
			{
				icon: Refresh,
				tooltip: "Refresh User List",
				isFreeAction: true,
				onClick: () => {
					this.setState({
						isTableLoading: true
					});
					this.props.fetchUsers().then(() =>
						this.setState({
							isTableLoading: false
						})
					);
				}
			}
		];
		if (auth && auth.data) {
			newActions.push(
				({ user, canDelete }) => {
					const visible = canDelete;
					const rowStatus = loadingRows.indexOf(user.id);
					return {
						icon: user.blocked ? CheckCircle : Block,
						tooltip: user.blocked ? "Unblock" : "Block",
						hidden: !visible,
						disabled: rowStatus >= 0,

						onClick: (event, { user }) => {
							history.push(`/users/${user.id}/delete`);
						}
					};
				},
				({ user, canUpdate }) => {
					const visible = canUpdate;
					const rowStatus = loadingRows.indexOf(user.id);
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
					const rowStatus = loadingRows.indexOf(user.id);
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
			);
		}
		this.setState({ userActions: newActions });
	};

	reduceUserData = async () => {
		const { auth, users, clients } = this.props;

		if (auth && auth.data && users && users.data) {
			let newUserData = [];

			for (let user of users.data) {
				let accessible = await RBAC.can(
					auth.data.role.name,
					Action.READ,
					Resource.USERS,
					{ targetUser: user, user: auth.data, role: auth.data.role }
				);
				if (accessible) {
					const userRole = auth.data.role.name;
					const canUpdate =
						user.id === 1
							? false
							: await RBAC.can(userRole, Action.UPDATE, Resource.USERS, {
									targetUser: user,
									user: auth.data,
									role: auth.data.role
							  });
					const canDelete =
						user.id === 1
							? false
							: await RBAC.can(userRole, Action.DELETE, Resource.USERS);
					const userSignUpDate = moment(user.createdAt, "X");

					const data = {
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
					};

					if (auth.data.role.name === Role.MASTER && clients && clients.data) {
						const clientName = clients.data.find(
							client => client.id === user.clientId
						);
						data["client"] =
							(clientName && clientName.name) || user.role.name === Role.MASTER
								? toTitleWords(Role.MASTER)
								: "Unassigned";
					}
					newUserData.push(data);
				}
				this.setState({ userData: newUserData });
			}
		}
	};

	render() {
		const { history, auth, fetchUsers, users } = this.props;
		const {
			formData,
			isLoading,
			userColumns,
			userData,
			userActions,
			isTableLoading
		} = this.state;

		const renderDialog = ({ match, children }) => (
			<Dialog
				onMount={async () => {
					try {
						const user = await api
							.fetchUser(match.params.id)
							.catch(() => history.replace("/users"));

						const read = {
							access: await RBAC.can(
								auth.data.role.name,
								Action.READ,
								Resource.USERS,
								{
									user: auth.data,
									targetUser: user.data,
									role: auth.data.role
								}
							),
							exclude: RBAC.getExcludedFields(
								auth.data.role.name,
								Action.READ,
								Resource.USERS,
								{
									user: auth.data,
									targetUser: user.data,
									role: auth.data.role
								}
							)
						};
						if (user.data.role.name !== Role.GUEST)
							read.exclude.push("categories");

						const update = {
							access: await RBAC.can(
								auth.data.role.name,
								Action.UPDATE,
								Resource.USERS,
								{
									user: auth.data,
									targetUser: user.data,
									role: auth.data.role
								}
							),
							exclude: RBAC.getExcludedFields(
								auth.data.role.name,
								Action.UPDATE,
								Resource.USERS,
								{
									user: auth.data,
									targetUser: user.data,
									role: auth.data.role
								}
							)
						};

						const destroy = {
							access: await RBAC.can(
								auth.data.role.name,
								Action.DELETE,
								Resource.USERS,
								{
									user: auth.data,
									targetUser: user.data,
									role: auth.data.role
								}
							)
						};

						return {
							user,
							read,
							update,
							destroy
						};
					} catch (e) {
						history.replace("/users");
					}
				}}
				onClose={() => {
					history.push("/users");
					this.setState({ formData: null });
				}}
				open={true}
				children={children}
			/>
		);

		return (
			<Fragment>
				<Switch>
					<Route
						path="/users/:id(\d+)/edit"
						render={({ match }) =>
							renderDialog({
								match,
								children: async ({ user, update, read }) => {
									if (formData === null && user) {
										this.setState({
											formData: user.data
										});
									}
									if (formData && update && update.access) {
										return (
											<UserFormUpdate
												values={formData}
												exclude={read.exclude}
												readOnly={update.exclude}
												showFooter={true}
												onChangeEvent={(data, name, event) =>
													event.target.files
														? this.setState({
																formData: {
																	...data,
																	[name]: event.target.files[0] || ""
																}
														  })
														: this.setState({
																formData: data
														  })
												}
												onSubmit={() => {
													history.replace("/users");
													this.setState({ formData: null });
												}}
												title={"Update User"}
											/>
										);
									} else if (update && !update.access) {
										history.replace("/users");
									}
									return null;
								}
							})
						}
					/>
					<Route
						path="/users/:id(\d+)/delete"
						render={({ match }) =>
							renderDialog({
								match,
								children: async ({ user, destroy }) => {
									if (user && destroy && destroy.access) {
										const { blocked, username, id } = user.data;
										return (
											<DialogChildren
												onUnmount={() => {
													this.setState({
														isLoading: false
													});
												}}
												title={`${blocked ? "Unblock" : "Block"} ${username}?`}
												content={
													blocked
														? "This user will able to login again."
														: "This user will not be able to login."
												}
												disabled={isLoading}
												yes={() => {
													this.setState({
														isLoading: true
													});
													api
														.updateUser({
															id,
															blocked: !blocked
														})
														.then(() => {
															fetchUsers().then(() => {
																history.replace("/users");
																this.setState({
																	isLoading: false
																});
															});
														});
												}}
												no={() => history.replace("/users")}
											/>
										);
									} else if (destroy && !destroy.access) {
										history.replace("/users");
									}
									return null;
								}
							})
						}
					/>
					<Route
						path="/users/:id(\d+)"
						render={({ match }) =>
							renderDialog({
								match,
								children: async ({ user, read }) => {
									if (formData === null && user) {
										this.setState({
											formData: user.data
										});
									}
									if (formData && read && read.access) {
										return (
											<UserForm
												values={formData}
												exclude={read.exclude}
												readOnly={true}
												showFooter={false}
												onChangeEvent={(data, name, event) =>
													event.target.files
														? this.setState({
																formData: {
																	...data,
																	[name]: event.target.files[0] || ""
																}
														  })
														: this.setState({
																formData: data
														  })
												}
												title={"User Details"}
												hints={""}
												onSubmit={() => {
													history.push("/users");
													this.setState({
														formData: null
													});
												}}
											/>
										);
									} else if (read && !read.access) {
										history.replace("/users");
									}
									return null;
								}
							})
						}
					/>
				</Switch>
				<MaterialTable
					icons={tableIcons}
					columns={userColumns}
					isLoading={users === null || isTableLoading}
					data={userData}
					title="Users"
					options={{
						filtering: true,
						grouping: true,
						columnsButton: true
					}}
					actions={userActions}
				/>
			</Fragment>
		);
	}
}

const mapStateToProps = ({ enums, auth, users, clients }) => ({
	users,
	enums,
	auth,
	clients
});

export default compose(
	connect(
		mapStateToProps,
		reduxActions
	),
	withRouter
)(UserTableView);
