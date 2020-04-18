import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core";

import { Role, permission } from "../containers/layout/Role";
import * as actions from "../../actions";
import VehicleFormCreateButtonDialog from "../containers/forms/vehicles/VehicleFormCreateButtonDialog";
import VehicleCardList from "../containers/display/VehicleCardList";

const Vehicles = ({
	classes,
	fetchVehicles,
	fetchLocations,
	fetchUsers,
	fetchCategories,
	fetchWialonUnits
}) => {
	useEffect(() => {
		fetchVehicles();
		fetchLocations();
		fetchUsers();
		fetchCategories();
		fetchWialonUnits();
	}, []);
	return (
		<Paper className={classes.root}>
			<Role roles={permission.CREATE_VEHICLE}>
				<VehicleFormCreateButtonDialog />
			</Role>
			<VehicleCardList />
		</Paper>
	);
};
const styles = theme => ({
	root: {
		padding: theme.spacing(3),
		"& > :not(:last-child)": {
			marginBottom: theme.spacing(3)
		},
		[theme.breakpoints.down("sm")]: {
			padding: theme.spacing(1),
			"& > :not(:last-child)": {
				marginBottom: theme.spacing(1)
			}
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
