import React, { Fragment, FC } from "react";
import { withRouter } from "react-router";
import { Button } from "@material-ui/core";
import VehicleFormCreate from "./VehicleFormCreate";
import FormPage from "../../../pages/FormPage";

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
			<Button variant="contained" onClick={() => history.push("/vehicles/new")}>
				New Vehicle
			</Button>
		</Fragment>
	);
}

export default withRouter(VehicleFormCreateButtonDialog);
