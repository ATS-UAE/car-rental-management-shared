"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingFormUtils = void 0;
var typings_1 = require("../../../typings");
var DateUtils_1 = require("../../DateUtils");
var BookingFormUtils = /** @class */ (function () {
    function BookingFormUtils() {
    }
    BookingFormUtils.createBookingFormValues = function (override) {
        var THIRTY_MINUTES_IN_SECONDS = 60 * 30;
        var bookingFormValues = __assign({ from: new Date(), to: DateUtils_1.DateUtils.addSecondsToDate(new Date(), THIRTY_MINUTES_IN_SECONDS), userId: 1, bookingType: typings_1.BookingType.PRIVATE, locationId: 1, vehicleId: 1 }, override);
        return bookingFormValues;
    };
    return BookingFormUtils;
}());
exports.BookingFormUtils = BookingFormUtils;
