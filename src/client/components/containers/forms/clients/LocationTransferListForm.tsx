import React, { useEffect, FC, useState } from "react";
import { connect } from "react-redux";
import * as reduxActions from "../../../../actions";
import api from "../../../../utils/helpers/api";
import { ReduxState } from "../../../../reducers";
import {
	LocationServerResponseGet,
	LocationServerResponseGetAll,
	ExtractServerResponseData
} from "../../../../../shared/typings";
import TransferList from "../../../presentational/display/TransferList";
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
	const [items, setItems] = useState<
		ExtractServerResponseData<LocationServerResponseGetAll>
	>([]);
	const [right, setRight] = useState<
		ExtractServerResponseData<LocationServerResponseGetAll>
	>([]);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		if (locations && locations.data) {
			const left: ExtractServerResponseData<LocationServerResponseGetAll> = [];
			const right: ExtractServerResponseData<LocationServerResponseGetAll> = [];

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
	}, [locations]);

	return (
		<TransferList<ExtractServerResponseData<LocationServerResponseGet>>
			onSubmit={(e, data) => {
				setLoading(true);
				api
					.updateClient(clientId, {
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
			comparator={(a, b) => a.id === b.id}
			listMapper={item => ({
				id: item.id,
				primaryLabel: item.name,
				secondaryLabel: item.address
			})}
		/>
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
