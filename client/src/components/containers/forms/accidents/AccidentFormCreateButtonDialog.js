import React, { Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { withRouter } from "react-router";
import { Button } from "@material-ui/core";
import AccidentFormCreate from "./AccidentFormCreate";
import FormPage from "../../../pages/FormPage";
import Can from "../../layout/Can";
import { resources, actions } from "../../../../variables/enums";

function AccidentFormCreateButtonDialog({ history, classes }) {
	return (
		<Fragment>
			<FormPage
				path="/accidents/new"
				check={({ path }) => path.slice(-3) === "new"}
				exitPath="/accidents"
				render={({ location }) => {
					let exclude = [];
					if (
						location.state &&
						location.state.createAccess &&
						location.state.createAccess.excludedFields
					) {
						exclude = location.state.createAccess.excludedFields;
					}
					return (
						<AccidentFormCreate
							exclude={exclude}
							onSubmit={() => history.push("/accidents")}
						/>
					);
				}}
			/>
			<Can
				action={actions.CREATE}
				resource={resources.ACCIDENTS}
				yes={createAccess => (
					<Button
						className={classes.button}
						type="submit"
						variant="contained"
						color="primary"
						onClick={() => history.push("/accidents/new", { createAccess })}
					>
						Report an accident
					</Button>
				)}
			/>
		</Fragment>
	);
}

const mapStateToProps = ({ bookings, auth, vehicles }) => ({
	bookings,
	auth,
	vehicles
});

export default compose(
	withRouter,
	connect(mapStateToProps)
)(AccidentFormCreateButtonDialog);
