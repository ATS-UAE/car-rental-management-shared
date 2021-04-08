import { Role } from "../typings";

export abstract class UserUtils {
	private static roleRanks = [
		Role.MASTER,
		Role.ADMIN,
		Role.KEY_MANAGER,
		Role.GUEST
	];

	public static isRoleBetter = (
		requiredRole: Role,
		role: Role | string
	): boolean => {
		const requiredRoleIndex = UserUtils.roleRanks.findIndex(
			(value) => value === requiredRole
		);

		const roleIndex = UserUtils.roleRanks.findIndex((value) => value === role);

		if (requiredRoleIndex >= 0 && roleIndex >= 0) {
			return roleIndex <= requiredRoleIndex;
		}

		return false;
	};
}
