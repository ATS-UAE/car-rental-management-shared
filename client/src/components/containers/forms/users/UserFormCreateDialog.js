import React, { useEffect } from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import RBAC from "../../../../utils/rbac";
import { Resource, Action } from "../../../../variables/enums";
import * as reduxActions from "../../../../actions";
import UserFormCreate from "./UserFormCreate";
import Dialog from "../../../presentational/display/Dialog";

function Users({ auth, fetchUsers, fetchCurrentUserDetails, history }) {
	useEffect(() => {
		fetchCurrentUserDetails();
	}, []);
	return (
		<Dialog
			onMount={async () => {
				try {
					const create = {
						access: await RBAC.can(
							auth.data.role.name,
							Action.CREATE,
							Resource.USERS
						)
					};

					return {
						create
					};
				} catch (e) {
					history.replace("/users");
				}
			}}
			open={true}
			onClose={() => history.push("/users")}
			children={async ({ create }) => {
				if (create && create.access) {
					return (
						<UserFormCreate
							onSubmit={() => {
								fetchUsers();
								history.push("/users");
							}}
						/>
					);
				} else if (create && !create.access) {
					history.push("/users");
				}
				return null;
			}}
		/>
	);
}

export default compose(
	withRouter,
	connect(
		({ auth }) => ({ auth }),
		reduxActions
	)
)(Users);
