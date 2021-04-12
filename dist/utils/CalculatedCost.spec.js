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
var typings_1 = require("../typings");
var CalculatedCost_1 = require("./CalculatedCost");
var getBookingParams = function (overrides) { return (__assign({ from: new Date(), to: new Date(), startMileage: 100, endMileage: 200 }, overrides)); };
var getCostParams = function (overrides) { return (__assign({ bookingChargeUnit: typings_1.BookingChargeUnit.KILOMETER, bookingChargeCount: 5, bookingCharge: 5 }, overrides)); };
describe("CalculatedCost", function () {
    describe("Free bookings", function () {
        it("Returns true on free bookings.", function () {
            var bookingParams = getBookingParams();
            var costParams = getCostParams({
                bookingChargeUnit: null
            });
            var calculation = CalculatedCost_1.CalculatedCost.calculateBookingCost(bookingParams, costParams);
            expect(calculation.hasCost()).toBeFalsy();
        });
        it("Returns false on free bookings.", function () {
            var bookingParams = getBookingParams();
            var costParams = getCostParams({
                bookingChargeUnit: typings_1.BookingChargeUnit.SECOND
            });
            var calculation = CalculatedCost_1.CalculatedCost.calculateBookingCost(bookingParams, costParams);
            expect(calculation.hasCost()).toBeTruthy();
        });
    });
    describe("Calculating cost by mileage", function () {
        it("Calculates a mileage based booking cost.", function () {
            var START_MILEAGE = 0;
            var END_MILEAGE = 5;
            var bookingParams = getBookingParams({
                startMileage: START_MILEAGE,
                endMileage: END_MILEAGE
            });
            var costParams = getCostParams({
                bookingCharge: 20,
                bookingChargeCount: 1,
                bookingChargeUnit: typings_1.BookingChargeUnit.KILOMETER
            });
            var cost = ((END_MILEAGE - START_MILEAGE) / costParams.bookingChargeCount) *
                costParams.bookingCharge;
            var calculation = CalculatedCost_1.CalculatedCost.calculateBookingCost(bookingParams, costParams);
            expect(calculation.getCost()).toEqual(cost);
        });
    });
    describe("Calculating cost by time", function () {
        it("Calculates monthly costs.", function () {
            var bookingParams = getBookingParams({
                from: new Date("2021-04-30T20:00:00.000Z"),
                to: new Date("2021-06-30T20:00:00.000Z")
            });
            var costParams = getCostParams({
                bookingChargeUnit: typings_1.BookingChargeUnit.MONTH
            });
            var TWO_MONTHS = 2;
            var cost = (TWO_MONTHS / costParams.bookingChargeCount) * costParams.bookingCharge;
            var calculation = CalculatedCost_1.CalculatedCost.calculateBookingCost(bookingParams, costParams);
            expect(calculation.getCost()).toEqual(cost);
        });
        it("Calculates weekly costs.", function () {
            var bookingParams = getBookingParams({
                from: new Date("2021-02-01T20:00:00.000Z"),
                to: new Date("2021-02-15T20:00:00.000Z")
            });
            var costParams = getCostParams({
                bookingChargeUnit: typings_1.BookingChargeUnit.WEEK
            });
            var TWO_WEEKS = 2;
            var cost = (TWO_WEEKS / costParams.bookingChargeCount) * costParams.bookingCharge;
            var calculation = CalculatedCost_1.CalculatedCost.calculateBookingCost(bookingParams, costParams);
            expect(calculation.getCost()).toEqual(cost);
        });
        it("Calculates daily costs.", function () {
            var bookingParams = getBookingParams({
                from: new Date("2021-04-01T20:00:00.000Z"),
                to: new Date("2021-04-11T20:00:00.000Z")
            });
            var costParams = getCostParams({
                bookingChargeUnit: typings_1.BookingChargeUnit.DAY
            });
            var TEN_DAYS = 10;
            var cost = (TEN_DAYS / costParams.bookingChargeCount) * costParams.bookingCharge;
            var calculation = CalculatedCost_1.CalculatedCost.calculateBookingCost(bookingParams, costParams);
            expect(calculation.getCost()).toEqual(cost);
        });
        it("Calculates hourly costs.", function () {
            var bookingParams = getBookingParams({
                from: new Date("2021-04-30T10:00:00.000Z"),
                to: new Date("2021-04-30T20:00:00.000Z")
            });
            var costParams = getCostParams({
                bookingChargeUnit: typings_1.BookingChargeUnit.HOUR
            });
            var TEN_HOURS = 10;
            var cost = (TEN_HOURS / costParams.bookingChargeCount) * costParams.bookingCharge;
            var calculation = CalculatedCost_1.CalculatedCost.calculateBookingCost(bookingParams, costParams);
            expect(calculation.getCost()).toEqual(cost);
        });
        it("Calculates per second costs.", function () {
            var bookingParams = getBookingParams({
                from: new Date("2021-04-30T20:00:00.000Z"),
                to: new Date("2021-04-30T20:00:10.000Z")
            });
            var costParams = getCostParams({
                bookingChargeUnit: typings_1.BookingChargeUnit.SECOND
            });
            var TEN_SECONDS = 10;
            var cost = (TEN_SECONDS / costParams.bookingChargeCount) * costParams.bookingCharge;
            var calculation = CalculatedCost_1.CalculatedCost.calculateBookingCost(bookingParams, costParams);
            expect(calculation.getCost()).toEqual(cost);
        });
    });
});
