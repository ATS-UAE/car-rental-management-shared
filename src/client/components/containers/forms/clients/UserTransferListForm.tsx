import React, { useEffect, FC, useState } from "react";
import { connect } from "react-redux";
import api from "../../../../utils/helpers/api";
import { ReduxState } from "../../../../reducers";
import {
	UserServerResponseGet,
	UserServerResponseGetAll,
	ExtractServerResponseData
} from "../../../../../shared/typings";
import TransferList from "../../../presentational/display/TransferList";
import { Role } from "../../../../../shared/typings";
import { toTitleWords } from "../../../../utils/helpers";

interface UserTransferListFormProps {
	clientId: number;
	onSubmit?: () => void;
}

interface Props extends UserTransferListFormProps {
	users: ReduxState["users"];
}

const UserTransferListForm: FC<Props> = ({ users, clientId, onSubmit }) => {
	const [items, setItems] = useState<
		ExtractServerResponseData<UserServerResponseGetAll>
	>([]);
	const [right, setRight] = useState<
		ExtractServerResponseData<UserServerResponseGetAll>
	>([]);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		if (users && users.data) {
			const left: ExtractServerResponseData<UserServerResponseGetAll> = [];
			const right: ExtractServerResponseData<UserServerResponseGetAll> = [];

			for (const user of users.data) {
				if (clientId === user.clientId) {
					right.push(user);
				} else if (user.clientId === null && user.role !== Role.MASTER) {
					left.push(user);
				}
			}
			console.log(left, right);
			setItems([...left, ...right]);
			setRight(right);
		}
	}, [users]);

	return (
		<TransferList<ExtractServerResponseData<UserServerResponseGet>>
			onSubmit={(e, data) => {
				setLoading(true);
				api
					.updateClient(clientId, {
						users: data.map(value => value.id)
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
				primaryLabel: `${item.firstName} ${item.lastName}`,
				secondaryLabel: `${item.username} ${toTitleWords(item.role)}`
			})}
		/>
	);
};

const mapStateToProps = ({ users }: ReduxState) => ({
	users
});

export default connect(mapStateToProps)(UserTransferListForm);
