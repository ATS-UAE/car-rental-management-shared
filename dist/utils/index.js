"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBookingTimeSlotTaken = exports.toTitleWords = exports.rangeOverlap = exports.hasActiveBooking = exports.getBookingStatus = void 0;
var moment_1 = __importDefault(require("moment"));
var typings_1 = require("../typings");
__exportStar(require("./RoleUtils"), exports);
__exportStar(require("./CalculatedCost"), exports);
exports.getBookingStatus = function (booking) {
    var status = typings_1.BookingStatus.UNKNOWN;
    var currentTime = moment_1.default();
    var hasPassedFrom = moment_1.default(booking.from, "X").isSameOrBefore(currentTime);
    var hasPassedTo = moment_1.default(booking.to, "X").isSameOrBefore(currentTime);
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
exports.hasActiveBooking = function (bookings, bookingId) {
    return bookings.some(function (booking) {
        var status = exports.getBookingStatus(booking);
        if (status === typings_1.BookingStatus.PENDING ||
            status === typings_1.BookingStatus.ONGOING ||
            status === typings_1.BookingStatus.APPROVED) {
            if (!bookingId || bookingId !== booking.id) {
                return true;
            }
        }
        return false;
    });
};
exports.rangeOverlap = function (x1, x2, y1, y2) {
    return Math.max(x1, y1) <= Math.min(x2, y2);
};
exports.toTitleWords = function (word, delimiter) {
    if (delimiter === void 0) { delimiter = "_"; }
    var splitWord = word.split(delimiter);
    var result = "";
    splitWord.forEach(function (item) {
        for (var i = 0; i < item.length; i++) {
            var letter = item[i];
            if (i === 0) {
                result += letter.toUpperCase();
            }
            else {
                result += letter.toLowerCase();
            }
        }
        result += " ";
    });
    return result;
};
exports.isBookingTimeSlotTaken = function (bookings, from, to, bookingId) {
    return bookings.some(function (booking) {
        var taken = exports.rangeOverlap(from, to, booking.from, booking.to);
        if ((taken && !bookingId) || bookingId !== booking.id) {
            return taken;
        }
        return false;
    });
};
