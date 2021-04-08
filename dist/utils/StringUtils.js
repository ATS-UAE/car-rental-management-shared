"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringUtils = void 0;
var StringUtils = /** @class */ (function () {
    function StringUtils() {
    }
    StringUtils.toTitleWords = function (word) {
        var delimiter = "_";
        var splitWord = word.split(delimiter);
        var result = "";
        splitWord.forEach(function (item, index, array) {
            for (var i = 0; i < item.length; i++) {
                var letter = item[i];
                if (i === 0) {
                    result += letter.toUpperCase();
                }
                else {
                    result += letter.toLowerCase();
                }
            }
            if (index < array.length - 1) {
                result += " ";
            }
        });
        return result;
    };
    return StringUtils;
}());
exports.StringUtils = StringUtils;
