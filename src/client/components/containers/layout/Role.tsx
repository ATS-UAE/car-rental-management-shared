import React, { FC, ReactNode } from "react";
import { connect, MapStateToProps } from "react-redux";
import { Role as RoleEnum } from "../../../../shared/typings";
import { ReduxState } from "../../../reducers";

export { permission } from "../../../variables/permissions";

export interface RoleProps {
	roles?: RoleEnum[];
	excludes?: RoleEnum[];
	children: ReactNode;
}

interface RoleStateProps {
	role?: RoleEnum;
}

type Props = RoleProps & RoleStateProps;

const Component: FC<Props> = ({ roles, children, role, excludes }) => {
	if (
		role &&
		((roles && roles.includes(role)) || (excludes && !excludes.includes(role)))
	) {
		return <>{children}</>;
	}
	return null;
};

const mapStateToProps: MapStateToProps<RoleStateProps, {}, ReduxState> = ({
	auth
}) => ({
	role: (auth && auth.data && auth.data.role) || undefined
});

export const Role = connect<RoleStateProps, {}, RoleProps, ReduxState>(
	mapStateToProps
)(Component);
