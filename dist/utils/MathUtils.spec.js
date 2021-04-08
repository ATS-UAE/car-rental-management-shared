"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MathUtils_1 = require("./MathUtils");
describe("MathUtils", function () {
    describe("Number range intersect check.", function () {
        it("Intersects.", function () {
            var intersects = MathUtils_1.MathUtils.rangeOverlap(1, 3, 2, 4);
            expect(intersects).toBeTruthy();
        });
        it("Does not intersect.", function () {
            var intersects = MathUtils_1.MathUtils.rangeOverlap(1, 2, 3, 4);
            expect(intersects).toBeFalsy();
        });
    });
});
