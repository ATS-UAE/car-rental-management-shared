import React, { Fragment } from "react";
import { withRouter } from "react-router";
import { Button } from "@material-ui/core";
import UserFormCreate from "./UserFormCreate";
import FormPage from "../../../pages/FormPage";
import Can from "../../layout/Can";
import { actions, resources, roles } from "../../../../variables/enums";

function UserFormCreateButtonDialog({ history }) {
	return (
		<Fragment>
			<FormPage
				path="/users/new"
				check={({ location }) => /\/users\/new/.test(location.pathname)}
				exitPath="/users"
				render={() => (
					<UserFormCreate onSubmit={() => history.push("/users")} />
				)}
			/>
			<Can
				action={actions.CREATE}
				resource={resources.USERS}
				params={{ role: roles.KEY_MANAGER }}
				yes={() => (
					<Button onClick={() => history.push("/users/new")}>New</Button>
				)}
			/>
		</Fragment>
	);
}

export default withRouter(UserFormCreateButtonDialog);
