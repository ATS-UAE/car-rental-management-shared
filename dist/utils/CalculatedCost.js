"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculatedCost = void 0;
var moment_1 = __importDefault(require("moment"));
var typings_1 = require("../typings");
var CalculatedCost = /** @class */ (function () {
    function CalculatedCost(cost, count, unit) {
        this.cost = cost;
        this.count = count;
        this.unit = unit;
    }
    CalculatedCost.calculateCost = function (bookingParams, costParams) {
        var from = bookingParams.from, to = bookingParams.to, endMileage = bookingParams.endMileage, startMileage = bookingParams.startMileage;
        var bookingCharge = costParams.bookingCharge, bookingChargeCount = costParams.bookingChargeCount, bookingChargeUnit = costParams.bookingChargeUnit;
        // If bookingChargeUnit !== null, and bookingChargcount and bookingCharge > 0
        if (bookingChargeUnit !== null &&
            bookingChargeCount > 0 &&
            bookingCharge > 0) {
            switch (bookingChargeUnit) {
                case typings_1.BookingChargeUnit.KILOMETER: {
                    if (startMileage !== null && endMileage !== null) {
                        var mileageUsed = endMileage - startMileage;
                        var cost = (mileageUsed / bookingChargeCount) * bookingCharge;
                        return new CalculatedCost(cost, mileageUsed, bookingChargeUnit);
                    }
                    break;
                }
                case typings_1.BookingChargeUnit.MONTH: {
                    var count = moment_1.default(to).diff(from, "months");
                    var cost = (count / bookingChargeCount) * bookingCharge;
                    return new CalculatedCost(cost, count, bookingChargeUnit);
                }
                case typings_1.BookingChargeUnit.WEEK: {
                    var count = moment_1.default(to).diff(from, "weeks");
                    var cost = (count / bookingChargeCount) * bookingCharge;
                    return new CalculatedCost(cost, count, bookingChargeUnit);
                }
                case typings_1.BookingChargeUnit.DAY: {
                    var count = moment_1.default(to).diff(from, "days");
                    var cost = (count / bookingChargeCount) * bookingCharge;
                    return new CalculatedCost(cost, count, bookingChargeUnit);
                }
                case typings_1.BookingChargeUnit.HOUR: {
                    var count = moment_1.default(to).diff(from, "hours");
                    var cost = (count / bookingChargeCount) * bookingCharge;
                    return new CalculatedCost(cost, count, bookingChargeUnit);
                }
                case typings_1.BookingChargeUnit.SECOND: {
                    var count = moment_1.default(to).diff(from, "seconds");
                    var cost = (count / bookingChargeCount) * bookingCharge;
                    return new CalculatedCost(cost, count, bookingChargeUnit);
                }
                default:
                    return null;
            }
        }
        return null;
    };
    return CalculatedCost;
}());
exports.CalculatedCost = CalculatedCost;
