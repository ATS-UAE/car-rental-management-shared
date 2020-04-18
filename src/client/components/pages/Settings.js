import React, { useEffect, useState } from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { Paper, Tabs, Tab, withStyles } from "@material-ui/core";
import * as actions from "../../actions";
import PasswordChangeButtonDialog from "../containers/forms/PasswordChangeButtonDialog";
import CategoryTableView from "../containers/display/CategoryTableView";
import { Role, permission } from "../containers/layout/Role";

const Settings = ({
	classes,
	fetchCategories,
	fetchCurrentUserDetails,
	fetchVehicles,
	fetchClients,
	location,
	match,
	history
}) => {
	useEffect(() => {
		fetchCategories();
		fetchCurrentUserDetails();
		fetchVehicles();
		fetchClients();
	}, []);

	const [value, setValue] = useState(0);
	const handleChange = (event, newValue) => setValue(newValue);

	const getTabContent = value => {
		switch (value) {
			case 0:
				return <PasswordChangeButtonDialog />;
			case 1:
				return (
					<Role roles={permission.CREATE_CATEGORIES}>
						<CategoryTableView
							location={location}
							match={match}
							history={history}
						/>
					</Role>
				);
			default:
				return null;
		}
	};

	return (
		<Paper className={classes.root}>
			<Tabs
				className={classes.tabs}
				value={value}
				onChange={handleChange}
				indicatorColor="primary"
				textColor="primary"
				centered
			>
				<Tab label="Account" />
				<Tab label="Misc." />
			</Tabs>
			<div>{getTabContent(value)}</div>
		</Paper>
	);
};

const styles = theme => ({
	root: {
		padding: theme.spacing(3),
		[theme.breakpoints.down("sm")]: {
			padding: theme.spacing(1)
		},
		height: "100%",
		overflow: "auto"
	},
	tabs: {
		marginBottom: theme.spacing(1)
	}
});

const mapStateToProps = ({ categories }) => ({
	categories
});

export default compose(
	connect(mapStateToProps, actions),
	withStyles(styles)
)(Settings);
