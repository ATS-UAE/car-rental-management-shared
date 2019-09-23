import React, { useEffect, FC, useState } from "react";
import { connect } from "react-redux";
import api from "../../../../utils/helpers/api";
import { ReduxState } from "../../../../typings/redux";
import { VehicleResponse } from "../../../../typings/api";
import TransferList from "../../../presentational/display/TransferList";

interface VehicleTransformListFormProps {
	clientId: number;
}

interface Props extends VehicleTransformListFormProps {
	vehicles: ReduxState["vehicles"];
}

const VehicleTransferListForm: FC<Props> = ({ vehicles, clientId }) => {
	const [items, setItems] = useState<VehicleResponse[]>([]);
	const [right, setRight] = useState<VehicleResponse[]>([]);

	useEffect(() => {
		if (vehicles && vehicles.data) {
			const left: VehicleResponse[] = [];
			const right: VehicleResponse[] = [];

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
		<TransferList<VehicleResponse>
			onSubmit={(e, data) => {
				api.updateClient({
					id: clientId,
					vehicles: data.map(value => value.id)
				});
			}}
			items={items}
			right={right}
			onChange={right => setRight(right)}
			comparator={(a, b) => a.clientId === b.clientId}
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
