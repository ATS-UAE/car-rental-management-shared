import React, { FC } from "react";
import { connect, MapStateToProps } from "react-redux";
import { BarChart } from "../presentational";
import { ReduxState } from "../../typings";
import { Role } from "../../variables/enums";

interface UserDashBoardStateProps {
	users: ReduxState["users"];
}

type Props = UserDashBoardStateProps;

const UserDashBoardBase: FC<Props> = ({ users }) => {
	const data: any[] | null =
		users &&
		users.data &&
		users.data.reduce(
			(acc, user) => {
				switch (user.role) {
					case Role.MASTER: {
						acc[0]["Master"]++;
						break;
					}
					case Role.ADMIN: {
						acc[0]["Admin"]++;
						break;
					}
					case Role.KEY_MANAGER: {
						acc[0]["Key Manager"]++;
						break;
					}
					case Role.GUEST: {
						acc[0]["User"]++;
						break;
					}
				}
				return acc;
			},
			[{ Master: 0, Admin: 0, "Key Manager": 0, User: 0, name: "User roles" }]
		);

	return (
		<BarChart
			title="User Count"
			data={data || []}
			bars={["Master", "Admin", "Key Manager", "User"]}
		/>
	);
};

const mapStateToProps: MapStateToProps<
	UserDashBoardStateProps,
	{},
	ReduxState
> = ({ users }) => ({ users });

export const UserDashBoard = connect(mapStateToProps)(UserDashBoardBase);
