import React, { Component, forwardRef } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "recompose";
import { Location, History } from "history";
import * as reduxActions from "../../../actions";
import api from "../../../utils/helpers/api";
import { ReduxState } from "../../../reducers";
import {
	ExtractServerResponseData,
	ClientServerResponseGet
} from "../../../../shared/typings";
import { ModalSwitch } from "../../presentational/display/ModalSwitch";
import MaterialTable, { Column, Icons } from "material-table";
import {
	DialogModal,
	DialogModalProps
} from "../../presentational/display/DialogModal";
import LocationTransferListForm from "../forms/clients/LocationTransferListForm";
import UserTransferListForm from "../forms/clients/UserTransferListForm";
import VehicleTransferListForm from "../forms/clients/VehicleTransferListForm";
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
	Refresh,
	LocationCity,
	DirectionsCar,
	People
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
	clientColumns: Column<ExtractServerResponseData<ClientServerResponseGet>>[];
	clientData: ExtractServerResponseData<ClientServerResponseGet>[];
	clientSelected: ExtractServerResponseData<ClientServerResponseGet> | null;
}

type Props = {
	location: Location<{ modal?: boolean }>;
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

		const renderModal = (props: Omit<DialogModalProps, "open" | "onClose">) => {
			return (
				<DialogModal
					title={props.title}
					open={true}
					onClose={() => history.replace("/clients")}
					content={props.content}
				/>
			);
		};
		return (
			<>
				<ModalSwitch
					location={location}
					history={history}
					routes={[
						{
							path: "/clients/users/edit",
							render: () =>
								renderModal({
									title: "Add users to client",
									content: (this.state.clientSelected && (
										<UserTransferListForm
											clientId={this.state.clientSelected.id}
											onSubmit={() => {
												this.props.fetchUsers();
												this.props.history.replace("/clients");
											}}
										/>
									)) || <Redirect to="/clients" />
								})
						},
						{
							path: "/clients/vehicles/edit",
							render: () =>
								renderModal({
									title: "Add vehicles to client",
									content: (this.state.clientSelected && (
										<VehicleTransferListForm
											clientId={this.state.clientSelected.id}
											onSubmit={() => {
												this.props.fetchVehicles();
												this.props.history.replace("/clients");
											}}
										/>
									)) || <Redirect to="/clients" />
								})
						},
						{
							path: "/clients/locations/edit",
							render: () =>
								renderModal({
									title: "Add locations to client",
									content: (this.state.clientSelected && (
										<LocationTransferListForm
											clientId={this.state.clientSelected.id}
											onSubmit={() => {
												this.props.fetchLocations();
												this.props.history.replace("/clients");
											}}
										/>
									)) || <Redirect to="/clients" />
								})
						}
					]}
				/>
				<MaterialTable
					editable={{
						onRowUpdate: ({ id, name }) =>
							new Promise(resolve => {
								api
									.updateClient(id, { name })
									.then(fetchClients)
									.then(() => resolve());
							}),
						onRowAdd: ({ name }) =>
							new Promise(resolve => {
								api
									.createClient({
										name
									})
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
							onClick: (event, data) =>
								Promise.all([
									this.props.fetchClients(),
									this.props.fetchUsers(),
									this.props.fetchVehicles(),
									this.props.fetchLocations()
								])
						},
						{
							icon: () => <DirectionsCar />,
							tooltip: "Add vehicles",
							onClick: (event, data) => {
								this.setState({
									clientSelected: data as ExtractServerResponseData<
										ClientServerResponseGet
									>
								});
								history.replace("/clients/vehicles/edit", { modal: true });
							}
						},
						{
							icon: () => <LocationCity />,
							tooltip: "Add Locations",
							onClick: (event, data) => {
								this.setState({
									clientSelected: data as ExtractServerResponseData<
										ClientServerResponseGet
									>
								});
								history.replace("/clients/locations/edit", { modal: true });
							}
						},
						{
							icon: () => <People />,
							tooltip: "Add Users",
							onClick: (event, data) => {
								this.setState({
									clientSelected: data as ExtractServerResponseData<
										ClientServerResponseGet
									>
								});
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
	connect(mapStateToProps, reduxActions)
)(ClientTableView);
