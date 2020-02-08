import React, { FC } from "react";
import { connect, MapStateToProps } from "react-redux";
import { BarChart } from "../presentational";
import { ReduxState } from "../../reducers";
import { Role } from "../../../shared/typings";

interface UserDashBoardStateProps {
	users: ReduxState["users"];
	auth: ReduxState["auth"];
}

type Props = UserDashBoardStateProps;

const UserDashBoardBase: FC<Props> = ({ users, auth }) => {
	const bars = ["Admin", "Key Manager", "User"];
	if (auth && auth.data && auth.data.role === Role.MASTER) {
		bars.unshift("Master");
	}
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

	return <BarChart title="User Count" data={data || []} bars={bars} />;
};

const mapStateToProps: MapStateToProps<
	UserDashBoardStateProps,
	{},
	ReduxState
> = ({ users, auth }) => ({ users, auth });

export const UserDashBoard = connect(mapStateToProps)(UserDashBoardBase);
