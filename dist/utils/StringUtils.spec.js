"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StringUtils_1 = require("./StringUtils");
describe("StringUtils", function () {
    it("Should return a capitalized snake case string to a proper phrase.", function () {
        var SNAKE_CASE = "THIS_IS_ME!";
        var title = StringUtils_1.StringUtils.toTitleWords(SNAKE_CASE);
        expect(title).toEqual("This Is Me!");
    });
});
