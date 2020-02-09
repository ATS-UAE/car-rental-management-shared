import React, { FC } from "react";
import { Role as RoleEnum } from "../../../shared/typings";

export { permission } from "../../variables/permissions";

export interface RoleProps {
	role?: RoleEnum;
	roles?: RoleEnum[];
	excludes?: RoleEnum[];
}

export const RoleView: FC<RoleProps> = ({
	roles = [],
	children,
	role,
	excludes = []
}) => {
	if (
		role &&
		((roles && roles.includes(role)) || (excludes && !excludes.includes(role)))
	) {
		return <>{children}</>;
	}
	return null;
};
