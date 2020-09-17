import { Role } from "../typings";
export declare class RoleUtils {
    /**
     * Lower index, higher permissions.
     */
    static roleRanks: Role[];
    /**
     * @param requiredRole The role required to be higher or equal to.
     * @param role The role to be compared.
     */
    static isRoleBetter: (requiredRole: Role, role: Role | string) => boolean;
}
