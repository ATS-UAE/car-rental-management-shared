import React, { useEffect, FC, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
	Grid,
	List,
	Card,
	CardHeader,
	ListItem,
	ListItemText,
	ListItemIcon,
	Checkbox,
	Button,
	Divider
} from "@material-ui/core";
import { connect } from "react-redux";
import api from "../../../../utils/helpers/api";
import { ReduxState } from "../../../../typings/redux";
import { Location } from "../../../../typings/api";
import TransferList from "../../../presentational/display/TransferList";

interface LocationTransferListFormProps {
	clientId: number;
}

interface Props extends LocationTransferListFormProps {
	locations: ReduxState["locations"];
}

const LocationTransferListForm: FC<Props> = ({ locations, clientId }) => {
	const [items, setItems] = useState<Location[]>([]);

	useEffect(() => {
		if (locations && locations.data) {
			const left: Location[] = [];
			const right: Location[] = [];

			for (const location of locations.data) {
				if (clientId === location.clientId) {
					right.push(location);
				} else {
					left.push(location);
				}
			}
		}
	}, [locations]);

	return (
		<TransferList<Location>
			onSubmit={(e, data) => {
				api.updateClient({
					id: clientId,
					locations: data.map(value => value.id)
				});
			}}
			items={(locations && locations.data) || []}
			right={items}
			onChange={right => setItems(right)}
			comparator={(a, b) => a.clientId === b.clientId}
			listMapper={item => ({
				id: item.id,
				primaryLabel: item.name,
				secondaryLabel: item.address
			})}
		/>
	);
};

const mapStateToProps = ({ locations }: ReduxState) => ({
	locations
});

export default connect(mapStateToProps)(LocationTransferListForm);
