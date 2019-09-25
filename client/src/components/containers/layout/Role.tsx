import React, { FC } from "react";
import { connect } from "react-redux";
import { Role as RoleEnum } from "../../../variables/enums";
import { ReduxState } from "../../../typings";
const RoleFC: FC<{}> = () => {
	return null;
};

const mapStateToProps = ({
	auth
}: ReduxState): { role: RoleEnum | false | null } => ({
	role: auth === null ? null || false : auth && auth.data && auth.data.role.name
});

export const Role = connect(mapStateToProps)(RoleFC);
