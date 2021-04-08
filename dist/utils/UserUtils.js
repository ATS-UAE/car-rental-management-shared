"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUtils = void 0;
var typings_1 = require("../typings");
var UserUtils = /** @class */ (function () {
    function UserUtils() {
    }
    UserUtils.roleRanks = [
        typings_1.Role.MASTER,
        typings_1.Role.ADMIN,
        typings_1.Role.KEY_MANAGER,
        typings_1.Role.GUEST
    ];
    UserUtils.isRoleBetter = function (requiredRole, role) {
        var requiredRoleIndex = UserUtils.roleRanks.findIndex(function (value) { return value === requiredRole; });
        var roleIndex = UserUtils.roleRanks.findIndex(function (value) { return value === role; });
        if (requiredRoleIndex >= 0 && roleIndex >= 0) {
            return roleIndex <= requiredRoleIndex;
        }
        return false;
    };
    return UserUtils;
}());
exports.UserUtils = UserUtils;
