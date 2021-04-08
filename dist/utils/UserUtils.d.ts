import { Role } from "../typings";
export declare abstract class UserUtils {
    private static roleRanks;
    static isRoleBetter: (requiredRole: Role, role: Role | string) => boolean;
}
