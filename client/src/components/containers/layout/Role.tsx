import React, { FC } from "react";
import { connect } from "react-redux";
import { Role as RoleEnum } from "../../../variables/enums";
import { ReduxState } from "../../../typings";

export { permission } from "../../../variables/permissions";

export interface RoleProps {
	roles: RoleEnum[];
}

interface RoleStateProps {
	role?: RoleEnum;
}

type Props = RoleProps & RoleStateProps;

const Component: FC<Props> = ({ roles, children, role }) => {
	if (role && roles.includes(role)) {
		return <>{children}</>;
	}
	return null;
};

const mapStateToProps = ({ auth }: ReduxState): RoleStateProps => ({
	role: (auth && auth.data && auth.data.role.name) || undefined
});

export const Role = connect(mapStateToProps)(Component);
