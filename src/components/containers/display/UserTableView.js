import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import TableView from "../../presentational/forms/TableView";
import UserForm from "../../presentational/forms/UserForm";
import { api, toTitleWords } from "../../../utils";
import { Button, Grid } from "@material-ui/core";
import { ROLES, ACTIONS, RESOURCES } from "../../../variables";
import Can from "../layout/Can";
function UserTable({ users, auth, enums, fetchEnums, fetchUsers, onSubmit }) {
	useEffect(() => {
		fetchUsers();
		fetchEnums();
	}, []);
	const [open, setOpen] = useState(false);
	const [formData, setFormData] = useState({});
	let [disableButton, setDisabledButton] = useState(false);
	let [errorNotes, setErrorNotes] = useState([]);
	let [errors, setErrors] = useState({});
	useEffect(() => {
		let validForm = true;
		for (let key in errors) {
			if (errors[key].length) {
				validForm = false;
			}
		}
		setDisabledButton(!validForm);
	}, [errors]);

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
						{ value: toTitleWords(user.role.name) }
					],
					onClick: () => {
						setOpen(true);
						api.fetchUser(user.id).then(res => {
							setFormData({ ...res.data, roleId: user.role.id });
						});
					}
				};

				return row;
		  })
		: [];

	let roles = [
		{
			value: "",
			label: "Loading"
		}
	];
	if (enums && enums.data) {
		roles = enums.data.roles.reduce((acc, role) => {
			if (role.name !== ROLES.GUEST) {
				acc.push({ value: role.id, label: toTitleWords(role.name) });
			}
			return acc;
		}, []);
	}

	return (
		<Can
			action={ACTIONS.READ}
			resource={RESOURCES.USERS}
			yes={() => (
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
					<Can
						action={ACTIONS.UPDATE}
						resource={RESOURCES.USERS}
						params={{
							currentUser: {
								id: auth.data.id
							},
							updateUser: {
								id: formData.id
							},
							role: {
								name: formData.role ? formData.role.name : null
							}
						}}
						yes={access => {
							let footer = (
								<Grid item>
									<Button
										disabled={disableButton}
										type="submit"
										variant="contained"
										color="primary"
										onClick={e => {
											e.preventDefault();
											setDisabledButton(true);
											api
												.updateUser(formData)
												.then(() => {
													fetchUsers();
													onSubmit && onSubmit();
													setOpen(false);
													setDisabledButton(false);
												})

												.catch(e => {
													setErrorNotes([e]);
													setDisabledButton(false);
												});
										}}
									>
										Confirm
									</Button>
								</Grid>
							);
							return (
								<UserForm
									title="Update User"
									values={formData}
									errors={errors}
									onError={setErrors}
									onChange={setFormData}
									errorNotes={errorNotes}
									roleList={roles}
									footer={footer}
									exclude={access.excludedFields}
								/>
							);
						}}
						no={() => (
							<UserForm
								values={formData}
								errors={errors}
								onError={setErrors}
								onChange={setFormData}
								errorNotes={errorNotes}
								roleList={roles}
								readOnly={true}
								exclude={["password", "passwordConfirm"]}
								hints=""
							/>
						)}
					/>
				</TableView>
			)}
		/>
	);
}

const mapStateToProps = ({ users, auth, enums }) => ({ users, auth, enums });

export default connect(
	mapStateToProps,
	actions
)(UserTable);
