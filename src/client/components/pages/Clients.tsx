import React, { FC, useEffect } from "react";
import { connect } from "react-redux";
import { Location, History } from "history";
import * as actions from "../../actions";
import ClientTableView from "../containers/display/ClientTableView";

interface Props {
	location: Location;
	history: History;
}

const Clients: FC<Props & typeof actions> = ({
	fetchClients,
	fetchLocations,
	fetchUsers,
	fetchVehicles,
	location,
	history
}) => {
	useEffect(() => {
		fetchClients();
		fetchLocations();
		fetchUsers();
		fetchVehicles();
	}, []);
	return <ClientTableView />;
};

export default connect<{}, {}, Props>(
	null,
	actions
)(Clients);
