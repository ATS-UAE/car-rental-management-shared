import React, { Fragment } from "react";
import { withRouter } from "react-router";
import BookingFormCreate from "./BookingFormCreate";
import { Button } from "@material-ui/core";
import FormPage from "../../../pages/FormPage";
import Can from "../../layout/Can";
import { resources, actions } from "../../../../variables/enums";

function BookingCreateButtonDialog({ history }) {
	return (
		<Fragment>
			<FormPage
				path="/bookings/new"
				check={({ location }) => /\/bookings\/new/.test(location.pathname)}
				exitPath="/bookings"
				render={({ location }) => (
					<BookingFormCreate
						exclude={
							location &&
							location.state &&
							location.state.createAccess &&
							location.state.createAccess.excludedFields
						}
						onSubmit={() => history.push()}
						ticksMap={{
							xs: 3,
							sm: 4,
							md: 4,
							lg: 4,
							xl: 4
						}}
					/>
				)}
			/>
			<Can
				action={actions.CREATE}
				resource={resources.BOOKINGS}
				yes={createAccess => (
					<Button
						variant="contained"
						color="primary"
						onClick={() => history.push("/bookings/new", { createAccess })}
					>
						New
					</Button>
				)}
			/>
		</Fragment>
	);
}
export default withRouter(BookingCreateButtonDialog);
