"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleUtils = void 0;
var typings_1 = require("../typings");
var RoleUtils = /** @class */ (function () {
    function RoleUtils() {
    }
    /**
     * Lower index, higher permissions.
     */
    RoleUtils.roleRanks = [typings_1.Role.MASTER, typings_1.Role.ADMIN, typings_1.Role.KEY_MANAGER, typings_1.Role.GUEST];
    /**
     * @param requiredRole The role required to be higher or equal to.
     * @param role The role to be compared.
     */
    RoleUtils.isRoleBetter = function (requiredRole, role) {
        var requiredRoleIndex = RoleUtils.roleRanks.findIndex(function (value) { return value === requiredRole; });
        var roleIndex = RoleUtils.roleRanks.findIndex(function (value) { return value === role; });
        if (requiredRoleIndex >= 0 && roleIndex >= 0) {
            return roleIndex <= requiredRoleIndex;
        }
        return false;
    };
    return RoleUtils;
}());
exports.RoleUtils = RoleUtils;
