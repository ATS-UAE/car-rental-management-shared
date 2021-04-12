"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingUtils = void 0;
var pluralize_1 = __importDefault(require("pluralize"));
var typings_1 = require("../typings");
var DateUtils_1 = require("./DateUtils");
var MathUtils_1 = require("./MathUtils");
var BookingUtils = /** @class */ (function () {
    function BookingUtils() {
    }
    BookingUtils.getBookingStatus = function (booking) {
        var status = typings_1.BookingStatus.UNKNOWN;
        var currentTime = new Date();
        var hasPassedFrom = booking.from <= currentTime;
        var hasPassedTo = booking.to <= currentTime;
        if (booking.approved) {
            if (hasPassedFrom && !hasPassedTo) {
                status = typings_1.BookingStatus.ONGOING;
            }
            else if (hasPassedTo) {
                status = typings_1.BookingStatus.FINISHED;
            }
            else {
                status = typings_1.BookingStatus.APPROVED;
            }
        }
        else if (booking.approved === null) {
            status = typings_1.BookingStatus.PENDING;
        }
        else if (booking.approved === false) {
            status = typings_1.BookingStatus.DENIED;
        }
        return status;
    };
    BookingUtils.isBookingTimeSlotTaken = function (bookings, from, to, bookingId) {
        return bookings.some(function (booking) {
            var taken = MathUtils_1.MathUtils.rangeOverlap(DateUtils_1.DateUtils.getUnixTimestampFromDate(DateUtils_1.DateUtils.getDate(from)), DateUtils_1.DateUtils.getUnixTimestampFromDate(DateUtils_1.DateUtils.getDate(to)), DateUtils_1.DateUtils.getUnixTimestampFromDate(DateUtils_1.DateUtils.getDate(booking.from)), DateUtils_1.DateUtils.getUnixTimestampFromDate(DateUtils_1.DateUtils.getDate(booking.to)));
            if ((taken && !bookingId) || bookingId !== booking.id) {
                return taken;
            }
            return false;
        });
    };
    BookingUtils.getBookingCostString = function (bookingCharge, bookingChargeCount, bookingChargeUnit) {
        if (bookingChargeUnit && bookingChargeCount > 0 && bookingCharge > 0) {
            return bookingCharge + " AED per " + (bookingChargeCount > 0 ? bookingChargeCount + " " : " ") + pluralize_1.default(bookingChargeUnit, Number(bookingChargeCount));
        }
        return null;
    };
    return BookingUtils;
}());
exports.BookingUtils = BookingUtils;
