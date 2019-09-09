"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BookingStatus;
(function (BookingStatus) {
    BookingStatus["UNKNOWN"] = "UNKNOWN";
    BookingStatus["ONGOING"] = "ONGOING";
    BookingStatus["FINISHED"] = "FINISHED";
    BookingStatus["APPROVED"] = "APPROVED";
    BookingStatus["EXPIRED"] = "EXPIRED";
    BookingStatus["DENIED"] = "DENIED";
    BookingStatus["PENDING"] = "PENDING";
})(BookingStatus || (BookingStatus = {}));
exports.default = BookingStatus;
