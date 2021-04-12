"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var YupUtils_1 = require("./YupUtils");
describe("YupUtils", function () {
    describe("Replace empty string", function () {
        it("Replaces an empty string.", function () {
            var REPLACEMENT = "Test";
            var replaced = YupUtils_1.YupUtils.transformEmptyStringTo(REPLACEMENT)("", "");
            expect(replaced).toEqual(REPLACEMENT);
        });
        it("Does not replace a non-empty string.", function () {
            var REPLACEMENT = "Test";
            var VALUE = "Original Value";
            var replaced = YupUtils_1.YupUtils.transformEmptyStringTo(REPLACEMENT)(VALUE, VALUE);
            expect(replaced).toEqual(VALUE);
        });
    });
});
