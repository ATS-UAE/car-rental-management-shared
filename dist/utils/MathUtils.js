"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MathUtils = void 0;
var MathUtils = /** @class */ (function () {
    function MathUtils() {
    }
    MathUtils.rangeOverlap = function (x1, x2, y1, y2) { return Math.max(x1, y1) <= Math.min(x2, y2); };
    return MathUtils;
}());
exports.MathUtils = MathUtils;
