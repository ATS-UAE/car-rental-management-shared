"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingFormCreateValidator = void 0;
var yup = __importStar(require("yup"));
var DateUtils_1 = require("../../DateUtils");
var typings_1 = require("../../../typings");
var FormUtils_1 = require("../../FormUtils");
var BookingFormCreateValidator = /** @class */ (function () {
    function BookingFormCreateValidator() {
    }
    BookingFormCreateValidator.validate = function (values, bookings) {
        try {
            BookingFormCreateValidator.formBookingCreateValidationSchema.validateSync(values, {
                abortEarly: false,
                context: {
                    bookings: bookings
                }
            });
        }
        catch (e) {
            return FormUtils_1.FormUtils.getFieldErrorsFromYupValidationError(e);
        }
        return {};
    };
    BookingFormCreateValidator.useReplacementBookingFields = function (bookingType, schema) {
        if (bookingType === typings_1.BookingType.REPLACEMENT) {
            return schema.required();
        }
        return schema.nullable().transform(function () { return null; });
    };
    BookingFormCreateValidator.canUserBookVehiclesOn = function (user, userBookings, bookingFormValues) {
        if (bookingFormValues.bookingType === typings_1.BookingType.REPLACEMENT) {
            return true;
        }
        var isTimeslotTaken = userBookings.some(function (booking) {
            var isSameUser = booking.userId === user.id;
            var isReplacementBooking = booking.bookingType === typings_1.BookingType.REPLACEMENT;
            if (isSameUser && !isReplacementBooking) {
                var dateOverlapsWithAnotherBooking = DateUtils_1.DateUtils.doesDateIntervalOverlaps({
                    start: DateUtils_1.DateUtils.getDate(bookingFormValues.from),
                    end: DateUtils_1.DateUtils.getDate(bookingFormValues.to)
                }, {
                    start: DateUtils_1.DateUtils.getDate(booking.from),
                    end: DateUtils_1.DateUtils.getDate(booking.to)
                });
                if (dateOverlapsWithAnotherBooking) {
                    return true;
                }
            }
            return false;
        });
        return !isTimeslotTaken;
    };
    BookingFormCreateValidator.formBookingCreateValidationSchema = yup.object().shape({
        from: yup
            .mixed()
            .required("Required")
            .test("not-greater-than-to", 'Value should not be greater than the value of "to"', function (from) {
            var to = this.parent.to;
            if (from) {
                return DateUtils_1.DateUtils.dateIsBefore(from, to);
            }
            return false;
        })
            .when("$bookings", function (bookings, schema) {
            return schema.test("no-same-schedules", "You already have a booking during this time.", function (from) {
                var _a = this.parent, userId = _a.userId, to = _a.to, bookingType = _a.bookingType;
                if (from instanceof Date && to instanceof Date) {
                    return BookingFormCreateValidator.canUserBookVehiclesOn({ id: userId }, bookings, { from: from, to: to, bookingType: bookingType });
                }
                return true;
            });
        }),
        to: yup
            .mixed()
            .required("Required")
            .test("not-greater-than-to", 'Value should not be lesser than the value of "from"', function (to) {
            var from = this.parent.from;
            return DateUtils_1.DateUtils.dateIsAfter(to, from);
        })
            .when("$bookings", function (bookings, schema) {
            return schema.test("no-same-schedules", "You already have a booking during this time.", function (to) {
                var _a = this.parent, userId = _a.userId, from = _a.from, bookingType = _a.bookingType;
                if (from instanceof Date && to instanceof Date) {
                    return BookingFormCreateValidator.canUserBookVehiclesOn({ id: userId }, bookings, { from: from, to: to, bookingType: bookingType });
                }
                return true;
            });
        }),
        locationId: yup.number().required("Required"),
        userId: yup.number().required("Required"),
        vehicleId: yup.number().required("Required"),
        bookingType: yup
            .mixed()
            .oneOf(Object.values(typings_1.BookingType))
            .required("Required"),
        replacePlateNumber: yup
            .string()
            .when(["bookingType"], BookingFormCreateValidator.useReplacementBookingFields),
        replaceBrand: yup
            .string()
            .when(["bookingType"], BookingFormCreateValidator.useReplacementBookingFields),
        replaceModel: yup
            .string()
            .when(["bookingType"], BookingFormCreateValidator.useReplacementBookingFields),
        replaceVin: yup
            .string()
            .when(["bookingType"], BookingFormCreateValidator.useReplacementBookingFields)
    });
    return BookingFormCreateValidator;
}());
exports.BookingFormCreateValidator = BookingFormCreateValidator;
