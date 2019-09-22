import React, { Component, forwardRef } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "recompose";
import { Location, History } from "history";
import * as reduxActions from "../../../actions";
import api from "../../../utils/helpers/api";
import { ReduxState } from "../../../typings";
import { Client } from "../../../typings/api";
import { ModalSwitch } from "../../presentational/display/ModalSwitch";
import MaterialTable, { Column, Icons } from "material-table";
import { DialogModal } from "../../presentational/display/DialogModal";
import LocationTransferListForm from "../forms/clients/LocationTransferListForm";
import {
	AddBox,
	ArrowUpward,
	Check,
	ChevronLeft,
	ChevronRight,
	Clear,
	DeleteOutline,
	Edit,
	FilterList,
	FirstPage,
	LastPage,
	Remove,
	SaveAlt,
	Search,
	ViewColumn,
	Refresh
} from "@material-ui/icons";

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

interface ClientTableViewProps {}
interface ClientTableViewState {
	clientColumns: Column<Client>[];
	clientData: Client[];
	clientSelected: Client | null;
}

type Props = {
	location: Location;
	history: History;
	clients: ReduxState["clients"];
} & ClientTableViewProps &
	typeof reduxActions;

class ClientTableView extends Component<Props, ClientTableViewState> {
	constructor(props: Props) {
		super(props);
		this.state = {
			clientColumns: [
				{
					title: "ID",
					type: "numeric",
					field: "id",
					editable: "onUpdate"
				},
				{ title: "Name", field: "name" }
			],
			clientData: [],
			clientSelected: null
		};
	}
	componentDidMount = () => {
		this.reduceCategoryData();
	};

	componentDidUpdate = (prevProps: Props) => {
		const { clients } = this.props;
		if (clients !== prevProps.clients) {
			this.reduceCategoryData();
		}
	};

	reduceCategoryData = () => {
		const { clients } = this.props;

		if (clients && clients.data) {
			this.setState({ clientData: clients.data });
		}
	};

	render() {
		const { clients, fetchClients, location, history } = this.props;
		const {
			clientColumns: categoryColumns,
			clientData: categoryData
		} = this.state;
		return (
			<>
				<ModalSwitch
					location={location}
					history={history}
					routes={[
						{
							path: "/clients/users/edit",
							render: () => (
								<DialogModal
									title="Add users to client"
									open={true}
									onClose={() => history.replace("/clients")}
									content="Users form"
								/>
							)
						},
						{
							path: "/clients/vehicles/edit",
							render: () => (
								<DialogModal
									title="Add vehicles to client"
									open={true}
									onClose={() => history.replace("/clients")}
									content="Vehicles form"
								/>
							)
						},
						{
							path: "/clients/locations/edit",
							render: () => (
								<DialogModal
									title="Add location to client"
									open={true}
									onClose={() => {
										this.setState({ clientSelected: null });
										history.replace("/clients");
									}}
									content={
										(this.state.clientSelected && (
											<LocationTransferListForm
												clientId={this.state.clientSelected.id}
											/>
										)) ||
										null
									}
								/>
							)
						}
					]}
				/>
				<MaterialTable
					editable={{
						onRowUpdate: ({ id, name }) =>
							new Promise(resolve => {
								api
									.updateClient({ id, name })
									.then(fetchClients)
									.then(() => resolve());
							}),
						onRowAdd: ({ name }) =>
							new Promise(resolve => {
								api
									.createClient({ name, locations: [] })
									.then(fetchClients)
									.then(() => resolve());
							})
					}}
					isLoading={clients === null}
					title="Clients"
					columns={categoryColumns}
					data={categoryData}
					icons={tableIcons}
					actions={[
						{
							icon: () => <Refresh />,
							tooltip: "Refresh",
							isFreeAction: true,
							onClick: (event, data) => {
								console.log(event);
								console.log(data);
							}
						},
						{
							icon: () => <Refresh />,
							tooltip: "Add vehicles",
							onClick: (event, data) => {
								history.replace("/clients/vehicles/edit", { modal: true });
							}
						},
						{
							icon: () => <Refresh />,
							tooltip: "Add Locations",
							onClick: (event, data) => {
								this.setState({ clientSelected: data as Client });
								history.replace("/clients/locations/edit", { modal: true });
							}
						},
						{
							icon: () => <Refresh />,
							tooltip: "Add Users",
							onClick: (event, data) => {
								history.replace("/clients/users/edit", { modal: true });
							}
						}
					]}
				/>
			</>
		);
	}
}

const mapStateToProps = ({ clients }: { clients: ReduxState["clients"] }) => ({
	clients
});

export default compose<Props & typeof reduxActions, {}>(
	withRouter,
	connect(
		mapStateToProps,
		reduxActions
	)
)(ClientTableView);
