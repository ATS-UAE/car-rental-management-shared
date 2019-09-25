import React, { useEffect, useState } from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { Paper, Tabs, Tab, withStyles } from "@material-ui/core";
import * as actions from "../../actions";
import { Role } from "../../variables/enums";
import PasswordChangeButtonDialog from "../containers/forms/PasswordChangeButtonDialog";
import CategoryTableView from "../containers/display/CategoryTableView";

const Settings = ({
	classes,
	fetchCategories,
	fetchCurrentUserDetails,
	fetchVehicles,
	location,
	match,
	history,
	auth
}) => {
	useEffect(() => {
		fetchCategories();
		fetchCurrentUserDetails();
		fetchVehicles();
	}, []);

	const [value, setValue] = useState(0);
	const handleChange = (event, newValue) => setValue(newValue);

	const getTabContent = value => {
		switch (value) {
			case 0:
				return <PasswordChangeButtonDialog />;
			case 1:
				if (auth && auth && auth.role.name === Role.ADMIN) {
					return (
						<CategoryTableView
							location={location}
							match={match}
							history={history}
						/>
					);
				} else return null;
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

const mapStateToProps = ({ auth, categories }) => ({
	auth,
	categories
});

export default compose(
	connect(
		mapStateToProps,
		actions
	),
	withStyles(styles)
)(Settings);
