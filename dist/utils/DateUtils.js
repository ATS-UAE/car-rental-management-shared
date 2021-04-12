"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateUtils = void 0;
var date_fns_1 = require("date-fns");
var MathUtils_1 = require("./MathUtils");
var DateUtils = /** @class */ (function () {
    function DateUtils() {
    }
    DateUtils.getDate = function (date) {
        if (typeof date === "number") {
            return DateUtils.getDateFromUnixTimestamp(date);
        }
        return date;
    };
    DateUtils.formatToLongDateFormat = function (date) {
        var LONG_DATE_FORMAT = "MMM d yyyy h:mm aa";
        return date_fns_1.format(DateUtils.getDate(date), LONG_DATE_FORMAT);
    };
    DateUtils.relativeFromNow = function (date) { return date_fns_1.formatRelative(DateUtils.getDate(date), new Date()); };
    DateUtils.getDateFromUnixTimestamp = function (unix) { return date_fns_1.fromUnixTime(unix); };
    DateUtils.getUnixTimestampFromDate = function (date) { return date_fns_1.getUnixTime(date); };
    DateUtils.dateIsBefore = function (date, compare) { return date_fns_1.isBefore(date, compare); };
    DateUtils.dateIsAfter = function (date, compare) { return date_fns_1.isAfter(date, compare); };
    DateUtils.doesDateIntervalOverlaps = function (interval1, interval2) { return MathUtils_1.MathUtils.rangeOverlap(interval1.start.valueOf(), interval1.end.valueOf(), interval2.start.valueOf(), interval2.end.valueOf()); };
    DateUtils.addSecondsToDate = function (date, seconds) { return date_fns_1.addSeconds(date, seconds); };
    return DateUtils;
}());
exports.DateUtils = DateUtils;
