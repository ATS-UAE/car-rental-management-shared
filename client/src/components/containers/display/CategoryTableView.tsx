import React, { Component, forwardRef } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "recompose";
import * as reduxActions from "../../../actions";
import { api } from "../../../utils/helpers";
import { ReduxState } from "../../../typings";
import MaterialTable, { Column, Icons } from "material-table";
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
import { Role } from "../../../variables/enums";

const tableIcons: Icons = {
	Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
	Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
	Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
	DetailPanel: forwardRef((props, ref) => (
		<ChevronRight {...props} ref={ref} />
	)),
	Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
	Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
	Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
	FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
	LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
	NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
	PreviousPage: forwardRef((props, ref) => (
		<ChevronLeft {...props} ref={ref} />
	)),
	ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
	SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
	ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
	ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

export interface CategoryTableViewStateProps {
	auth: ReduxState["auth"];
	categories: ReduxState["categories"];
	vehicles: ReduxState["vehicles"];
	clients: ReduxState["clients"];
}

type Props = CategoryTableViewStateProps & typeof reduxActions;

interface RowData {
	id: number;
	name: string;
	count: number;
	clientId: number;
}

interface State {
	categoryColumns: Column<RowData>[];
	masterColumns: Column<RowData>[];
	categoryData: RowData[];
}

class CategoryTableView extends Component<Props, State> {
	constructor(props) {
		super(props);
		this.state = {
			categoryColumns: [
				{ title: "Category", field: "name" },
				{
					title: "Vehicle Count",
					type: "numeric",
					field: "count",
					editable: "never"
				}
			],
			masterColumns: [],
			categoryData: []
		};
	}

	componentDidMount = () => {
		this.reduceCategoryData();
		this.reduceCategoryColumn();
	};

	componentDidUpdate = prevProps => {
		const { categories, vehicles } = this.props;
		if (
			categories !== prevProps.categories ||
			vehicles !== prevProps.vehicles
		) {
			this.reduceCategoryData();
			this.reduceCategoryColumn();
		}
	};

	reduceCategoryColumn = () => {
		if (
			this.props.auth &&
			this.props.auth?.data?.role === Role.MASTER &&
			this.props.clients?.data
		) {
			const lookupValue = this.props.clients.data.reduce<{
				[key: number]: string;
			}>((acc, client) => {
				acc[client.id] = client.name;
				return acc;
			}, {});
			this.setState({
				masterColumns: [
					{
						title: "Client",
						field: "clientId",
						lookup: lookupValue
					}
				]
			});
		}
	};

	reduceCategoryData = () => {
		const { categories, vehicles } = this.props;

		let categoryData: RowData[] = [];
		if (categories?.data && vehicles?.data) {
			categoryData = categories.data.map(({ id, name, clientId }) => {
				let count = 0;

				for (const vehicle of vehicles.data!) {
					if (vehicle.categories.includes(id)) count++;
				}
				return {
					id,
					name,
					count,
					clientId
				};
			});
		}

		this.setState({ categoryData });
	};

	render() {
		const { categories, fetchCategories, fetchVehicles } = this.props;
		const { categoryColumns, masterColumns, categoryData } = this.state;
		console.log(categoryData);
		return (
			<MaterialTable
				editable={{
					onRowAdd: async ({ name, clientId }) => {
						await api.createCategories({
							name,
							clientId
						});
						await fetchVehicles();
						await fetchCategories();
					},
					onRowUpdate: async ({ id, name, clientId }) => {
						await api.updateCategory({ id, name, clientId });
						await fetchVehicles();
						await fetchCategories();
					},
					onRowDelete: async ({ id }) => {
						await api.deleteCategory(id);
						await fetchVehicles();
						await fetchCategories();
					}
				}}
				isLoading={categories === null}
				title="Vehicle categories"
				columns={[...categoryColumns, ...masterColumns]}
				data={categoryData}
				icons={tableIcons}
			/>
		);
	}
}

const mapStateToProps = ({ auth, clients, categories, vehicles }) => ({
	auth,
	clients,
	categories,
	vehicles
});

export default compose(
	withRouter,
	connect(mapStateToProps, reduxActions)
)(CategoryTableView);
