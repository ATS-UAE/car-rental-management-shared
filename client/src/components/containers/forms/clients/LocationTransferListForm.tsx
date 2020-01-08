import React, { useEffect, FC, useState } from "react";
import { connect } from "react-redux";
import * as reduxActions from "../../../../actions";
import api from "../../../../utils/helpers/api";
import { ReduxState } from "../../../../typings/redux";
import {
	LocationResponse,
	ClientResponse,
	WithServerResponse
} from "../../../../typings/api";
import TransferList, {
	TransferListProps
} from "../../../presentational/display/TransferList";
import Loading from "../../../presentational/Loading";
interface LocationTransferListFormProps {
	clientId: number;
	onSubmit?: () => void;
}

interface LocationTransferListFormStateProps {
	locations: ReduxState["locations"];
}

type Props = LocationTransferListFormProps &
	typeof reduxActions &
	LocationTransferListFormStateProps;

const LocationTransferListForm: FC<Props> = ({
	locations,
	clientId,
	fetchLocations,
	onSubmit
}) => {
	const [items, setItems] = useState<LocationResponse[]>([]);
	const [right, setRight] = useState<LocationResponse[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [clientData, setClientData] = useState<WithServerResponse<
		ClientResponse
	> | null>(null);

	useEffect(() => {
		const getClientData = async () => {
			const clientData = await api.fetchClient(clientId);
			setClientData(clientData);
		};
		getClientData();
	}, []);

	useEffect(() => {
		if (locations && locations.data) {
			const left: LocationResponse[] = [];
			const right: LocationResponse[] = [];

			for (const location of locations.data) {
				if (
					locations.data &&
					locations.data.find(location =>
						location.clients.find(client => client.id === clientId)
					)
				) {
					right.push(location);
				} else {
					left.push(location);
				}
			}
			setItems([...left, ...right]);
			setRight(right);
		}
	}, [locations, clientData]);

	return (
		(clientData && (
			<TransferList<LocationResponse>
				onSubmit={(e, data) => {
					setLoading(true);
					api
						.updateClient({
							id: clientId,
							locations: data.map(value => value.id)
						})
						.then(fetchLocations)
						.then(() => {
							setLoading(false);
							onSubmit && onSubmit();
						});
				}}
				loading={loading}
				items={items}
				right={right}
				onChange={right => setRight(right)}
				comparator={(a, b) => a.id === b.id && a.clientId === b.clientId}
				listMapper={item => ({
					id: item.id,
					primaryLabel: item.name,
					secondaryLabel: item.address
				})}
			/>
		)) || <Loading />
	);
};

const mapStateToProps = ({
	locations
}: ReduxState): LocationTransferListFormStateProps => ({
	locations
});

export default connect<
	LocationTransferListFormStateProps,
	typeof reduxActions,
	LocationTransferListFormProps,
	ReduxState
>(
	mapStateToProps,
	() => reduxActions
)(LocationTransferListForm);
