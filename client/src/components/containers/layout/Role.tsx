import React, { FC } from "react";
import { connect } from "react-redux";
import { Role as RoleEnum } from "../../../variables/enums";
import { ReduxState } from "../../../typings";

export interface RoleProps {
	roles?: RoleEnum[];
}

interface RoleStateProps {
	role?: RoleEnum;
}

const Role: FC<RoleProps & RoleStateProps> = ({
	roles = [],
	children,
	role
}) => {
	if (role && roles.includes(role)) {
		return <>{children}</>;
	}
	return null;
};

const mapStateToProps = ({ auth }: ReduxState): RoleStateProps => ({
	role: (auth && auth.data && auth.data.role.name) || undefined
});

export default connect(mapStateToProps)(Role);
