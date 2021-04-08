"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserUtils_1 = require("./UserUtils");
var typings_1 = require("../typings");
describe("UserUtils", function () {
    describe("is role better comparation.", function () {
        it("returns true if a better role is given.", function () {
            var isBetter = UserUtils_1.UserUtils.isRoleBetter(typings_1.Role.GUEST, typings_1.Role.ADMIN);
            expect(isBetter).toBeTruthy();
        });
        it("returns worse if a worse role is given.", function () {
            var isBetter = UserUtils_1.UserUtils.isRoleBetter(typings_1.Role.ADMIN, typings_1.Role.GUEST);
            expect(isBetter).toBeFalsy();
        });
    });
});
