import React, { useEffect, FC, useState } from "react";
import { connect } from "react-redux";
import api from "../../../../utils/helpers/api";
import { ReduxState } from "../../../../typings/redux";
import { UserResponse } from "../../../../typings/api";
import TransferList from "../../../presentational/display/TransferList";
import { Role } from "../../../../variables/enums";
import { toTitleWords } from "../../../../utils/helpers";

interface UserTransferListFormProps {
	clientId: number;
	onSubmit?: () => void;
}

interface Props extends UserTransferListFormProps {
	users: ReduxState["users"];
}

const UserTransferListForm: FC<Props> = ({ users, clientId, onSubmit }) => {
	const [items, setItems] = useState<UserResponse[]>([]);
	const [right, setRight] = useState<UserResponse[]>([]);

	useEffect(() => {
		if (users && users.data) {
			const left: UserResponse[] = [];
			const right: UserResponse[] = [];

			for (const user of users.data) {
				if (clientId === user.clientId) {
					right.push(user);
				} else if (user.clientId === null && user.role.name !== Role.MASTER) {
					left.push(user);
				}
			}
			console.log(left, right);
			setItems([...left, ...right]);
			setRight(right);
		}
	}, [users]);

	return (
		<TransferList<UserResponse>
			onSubmit={(e, data) => {
				api
					.updateClient({
						id: clientId,
						users: data.map(value => value.id)
					})
					.then(() => onSubmit && onSubmit());
			}}
			items={items}
			right={right}
			onChange={right => setRight(right)}
			comparator={(a, b) => a.id === b.id && a.clientId === b.clientId}
			listMapper={item => ({
				id: item.id,
				primaryLabel: `${item.firstName} ${item.lastName}`,
				secondaryLabel: `${item.username} ${toTitleWords(item.role.name)}`
			})}
		/>
	);
};

const mapStateToProps = ({ users }: ReduxState) => ({
	users
});

export default connect(mapStateToProps)(UserTransferListForm);
