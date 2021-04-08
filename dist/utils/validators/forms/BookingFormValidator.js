"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingFormValidator = void 0;
var BookingFormCreateValidator_1 = require("./BookingFormCreateValidator");
var BookingFormValidator = /** @class */ (function () {
    function BookingFormValidator() {
    }
    BookingFormValidator.validateBookingCreate = function (values, bookings) {
        var errors = BookingFormCreateValidator_1.BookingFormCreateValidator.validate(values, bookings);
        return errors;
    };
    return BookingFormValidator;
}());
exports.BookingFormValidator = BookingFormValidator;
