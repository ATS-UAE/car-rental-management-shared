import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core";

import * as actions from "../../actions";
import VehicleFormCreateButtonDialog from "../containers/forms/vehicles/VehicleFormCreateButtonDialog";
import VehicleCardList from "../containers/display/VehicleCardList";

function Vehicles({ classes, fetchVehicles, fetchLocations }) {
	useEffect(() => {
		fetchVehicles();
		fetchLocations();
	}, []);
	return (
		<Paper className={classes.root}>
			<VehicleFormCreateButtonDialog />
			<VehicleCardList />
		</Paper>
	);
}
const styles = theme => ({
	root: {
		padding: theme.spacing(3),
		[theme.breakpoints.down("sm")]: {
			padding: theme.spacing(1)
		},
		height: "100%",
		overflow: "auto"
	}
});

export default compose(
	connect(
		null,
		actions
	),
	withStyles(styles)
)(Vehicles);
