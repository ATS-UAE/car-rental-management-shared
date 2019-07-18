import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "recompose";
import * as reduxActions from "../../../actions";
import { api } from "../../../utils";

import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

const tableIcons = {
	Add: AddBox,
	Check: Check,
	Clear: Clear,
	Delete: DeleteOutline,
	DetailPanel: ChevronRight,
	Edit: Edit,
	Export: SaveAlt,
	Filter: FilterList,
	FirstPage: FirstPage,
	LastPage: LastPage,
	NextPage: ChevronRight,
	PreviousPage: ChevronLeft,
	ResetSearch: Clear,
	Search: Search,
	SortArrow: ArrowUpward,
	ThirdStateCheck: Remove,
	ViewColumn: ViewColumn
};

class CategoryTableView extends Component {
	state = {
		categoryColumns: [
			{ title: "Category", field: "name" },
			{
				title: "Vehicle Count",
				type: "numeric",
				field: "count",
				editable: "never"
			}
		],
		categoryData: []
	};

	componentDidMount = () => {
		this.reduceCategoryData();
	};

	componentDidUpdate = prevProps => {
		const { categories } = this.props;
		if (categories !== prevProps.categories) {
			this.reduceCategoryData();
		}
	};

	reduceCategoryData = () => {
		const { categories, vehicles } = this.props;

		let categoryData = [];
		if (categories && categories.data && vehicles && vehicles.data) {
			categoryData = categories.data.map(({ id, name }) => {
				let count = 0;

				for (const vehicle of vehicles.data) {
					if (vehicle.categories.includes(id)) count++;
				}
				return {
					id,
					name,
					count
				};
			});
		}

		this.setState({ categoryData });
	};

	render() {
		const { categories, fetchCategories, fetchVehicles } = this.props;
		const { categoryColumns, categoryData } = this.state;
		return (
			<MaterialTable
				editable={{
					onRowAdd: ({ name }) =>
						api
							.createCategories({ name })
							.then(fetchVehicles)
							.then(fetchCategories),
					onRowUpdate: ({ id, name }) =>
						api
							.updateCategory({ id, name })
							.then(fetchVehicles)
							.then(fetchCategories),
					onRowDelete: ({ id }) =>
						api
							.deleteCategory({ id })
							.then(fetchVehicles)
							.then(fetchCategories)
				}}
				isLoading={categories === null}
				title="Vehicle categories"
				columns={categoryColumns}
				data={categoryData}
				icons={tableIcons}
			/>
		);
	}
}

const mapStateToProps = ({ categories, vehicles }) => ({
	categories,
	vehicles
});

export default compose(
	withRouter,
	connect(
		mapStateToProps,
		reduxActions
	)
)(CategoryTableView);
