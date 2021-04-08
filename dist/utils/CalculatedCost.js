"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculatedCost = void 0;
var date_fns_1 = require("date-fns");
var typings_1 = require("../typings");
var CalculatedCost = /** @class */ (function () {
    function CalculatedCost(bookingParams, costParams) {
        var _this = this;
        this.bookingParams = bookingParams;
        this.costParams = costParams;
        this.hasCost = function () {
            var _a = _this.costParams, bookingCharge = _a.bookingCharge, bookingChargeCount = _a.bookingChargeCount, bookingChargeUnit = _a.bookingChargeUnit;
            return (bookingChargeUnit !== null && bookingChargeCount > 0 && bookingCharge > 0);
        };
        this.getCost = function () {
            var _a = _this.bookingParams, from = _a.from, to = _a.to, endMileage = _a.endMileage, startMileage = _a.startMileage;
            var _b = _this.costParams, bookingCharge = _b.bookingCharge, bookingChargeCount = _b.bookingChargeCount, bookingChargeUnit = _b.bookingChargeUnit;
            switch (bookingChargeUnit) {
                case typings_1.BookingChargeUnit.KILOMETER: {
                    if (startMileage !== null && endMileage !== null) {
                        var mileageUsed = endMileage - startMileage;
                        var cost = (mileageUsed / bookingChargeCount) * bookingCharge;
                        return cost;
                    }
                    break;
                }
                case typings_1.BookingChargeUnit.MONTH: {
                    var count = date_fns_1.differenceInMonths(to, from);
                    var cost = (count / bookingChargeCount) * bookingCharge;
                    return cost;
                }
                case typings_1.BookingChargeUnit.WEEK: {
                    var count = date_fns_1.differenceInWeeks(to, from);
                    var cost = (count / bookingChargeCount) * bookingCharge;
                    return cost;
                }
                case typings_1.BookingChargeUnit.DAY: {
                    var count = date_fns_1.differenceInDays(to, from);
                    var cost = (count / bookingChargeCount) * bookingCharge;
                    return cost;
                }
                case typings_1.BookingChargeUnit.HOUR: {
                    var count = date_fns_1.differenceInHours(to, from);
                    var cost = (count / bookingChargeCount) * bookingCharge;
                    return cost;
                }
                case typings_1.BookingChargeUnit.SECOND: {
                    var count = date_fns_1.differenceInSeconds(to, from);
                    var cost = (count / bookingChargeCount) * bookingCharge;
                    return cost;
                }
                default:
                    return null;
            }
            return null;
        };
    }
    CalculatedCost.calculateBookingCost = function (bookingParams, costParams) {
        return new CalculatedCost(bookingParams, costParams);
    };
    return CalculatedCost;
}());
exports.CalculatedCost = CalculatedCost;
