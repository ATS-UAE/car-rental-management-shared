import React, { useEffect, FC, useState } from "react";
import { connect } from "react-redux";
import api from "../../../../utils/helpers/api";
import { ReduxState } from "../../../../reducers";
import {
	VehicleServerResponseGet,
	VehicleServerResponseGetAll,
	ExtractServerResponseData
} from "../../../../../shared/typings";
import TransferList from "../../../presentational/display/TransferList";

interface VehicleTransformListFormProps {
	clientId: number;
	onSubmit?: () => void;
}

interface Props extends VehicleTransformListFormProps {
	vehicles: ReduxState["vehicles"];
}

const VehicleTransferListForm: FC<Props> = ({
	vehicles,
	clientId,
	onSubmit
}) => {
	const [items, setItems] = useState<
		ExtractServerResponseData<VehicleServerResponseGetAll>
	>([]);
	const [right, setRight] = useState<
		ExtractServerResponseData<VehicleServerResponseGetAll>
	>([]);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		if (vehicles && vehicles.data) {
			const left: ExtractServerResponseData<VehicleServerResponseGetAll> = [];
			const right: ExtractServerResponseData<VehicleServerResponseGetAll> = [];

			for (const vehicle of vehicles.data) {
				if (clientId === vehicle.clientId) {
					right.push(vehicle);
				} else if (vehicle.clientId === null) {
					left.push(vehicle);
				}
			}
			setItems([...left, ...right]);
			setRight(right);
		}
	}, [vehicles]);

	return (
		<TransferList<ExtractServerResponseData<VehicleServerResponseGet>>
			onSubmit={(e, data) => {
				setLoading(true);
				api
					.updateClient(clientId, {
						vehicles: data.map(value => value.id)
					})
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
				primaryLabel: item.plateNumber,
				secondaryLabel: `${item.brand} ${item.model}`
			})}
		/>
	);
};

const mapStateToProps = ({ vehicles }: ReduxState) => ({
	vehicles
});

export default connect(mapStateToProps)(VehicleTransferListForm);
