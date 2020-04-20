import { Role } from "../typings";

export class RoleUtils {
	/**
	 * Lower index, higher permissions.
	 */
	static roleRanks = [Role.MASTER, Role.ADMIN, Role.KEY_MANAGER, Role.GUEST];

	/**
	 * @param requiredRole The role required to be higher or equal to.
	 * @param role The role to be compared.
	 */
	static isRoleBetter = (requiredRole: Role, role: Role | string): boolean => {
		const requiredRoleIndex = RoleUtils.roleRanks.findIndex(
			value => value === requiredRole
		);

		const roleIndex = RoleUtils.roleRanks.findIndex(value => value === role);

		if (requiredRoleIndex >= 0 && roleIndex >= 0) {
			return roleIndex <= requiredRoleIndex;
		}

		return false;
	};
}
