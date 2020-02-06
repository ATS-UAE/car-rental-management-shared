import React, { useEffect } from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import RBAC from "../../../../utils/rbac";
import { Resource, Action } from "../../../../variables/enums";
import * as reduxActions from "../../../../actions";
import UserFormCreate from "./UserFormCreate";
import Dialog from "../../../presentational/display/Dialog";

function Users({ fetchUsers, fetchCurrentUserDetails, history }) {
	useEffect(() => {
		fetchCurrentUserDetails();
	}, []);
	return (
		<Dialog
			open={true}
			onClose={() => history.push("/users")}
			children={() => (
				<UserFormCreate
					onSubmit={() => {
						fetchUsers();
						history.push("/users");
					}}
				/>
			)}
		/>
	);
}

export default compose(withRouter, connect(null, reduxActions))(Users);
