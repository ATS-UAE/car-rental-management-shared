"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YupUtils = void 0;
var YupUtils = /** @class */ (function () {
    function YupUtils() {
    }
    YupUtils.transformEmptyStringTo = function (value) { return function (yupValue, originalValue) {
        if (originalValue === "") {
            return value;
        }
        return yupValue;
    }; };
    return YupUtils;
}());
exports.YupUtils = YupUtils;
