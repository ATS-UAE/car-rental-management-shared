import React, { Fragment } from "react";
import { withRouter } from "react-router";
import { Button } from "@material-ui/core";
import VehicleFormCreate from "./VehicleFormCreate";
import FormPage from "../../../pages/FormPage";
import Can from "../../layout/Can";
import { resources, actions } from "../../../../variables/enums";

function VehicleFormCreateButtonDialog({ history }) {
	return (
		<Fragment>
			<FormPage
				path="/vehicles/new"
				check={({ path }) => path.slice(-3) === "new"}
				exitPath="/vehicles"
				render={() => (
					<VehicleFormCreate onSubmit={() => history.push("/vehicles")} />
				)}
			/>
			<Can
				action={actions.CREATE}
				resource={resources.VEHICLES}
				yes={() => (
					<Button
						variant="contained"
						onClick={() => history.push("/vehicles/new")}
					>
						New
					</Button>
				)}
			/>
		</Fragment>
	);
}

export default withRouter(VehicleFormCreateButtonDialog);
