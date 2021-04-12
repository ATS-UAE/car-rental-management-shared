"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BookingFormCreateValidator_1 = require("./BookingFormCreateValidator");
var typings_1 = require("../../../typings");
var DateUtils_1 = require("../../DateUtils");
var BookingFormUtils_1 = require("../../test-utils/forms/BookingFormUtils");
describe("BookingFormCreateValidator", function () {
    describe("Booking interval validations", function () {
        it("Does not allow when the start is greater than end.", function () {
            var formValues = BookingFormUtils_1.BookingFormUtils.createBookingFormValues({
                from: DateUtils_1.DateUtils.addSecondsToDate(new Date(), 100),
                to: new Date()
            });
            var errors = BookingFormCreateValidator_1.BookingFormCreateValidator.validate(formValues, []);
            expect(errors.from).toBeDefined();
            expect(errors.to).toBeDefined();
        });
    });
    describe("Bookings when the user already have a booking on the specified time.", function () {
        it("Does not allow bookings when the selected interval already has a booking.", function () {
            var formValues = BookingFormUtils_1.BookingFormUtils.createBookingFormValues();
            var existingBookings = [
                {
                    bookingType: formValues.bookingType,
                    from: DateUtils_1.DateUtils.getUnixTimestampFromDate(formValues.from),
                    to: DateUtils_1.DateUtils.getUnixTimestampFromDate(formValues.to),
                    userId: formValues.userId
                }
            ];
            var errors = BookingFormCreateValidator_1.BookingFormCreateValidator.validate(formValues, existingBookings);
            expect(errors.from).toBeDefined();
            expect(errors.to).toBeDefined();
        });
        it("Allow bookings when the selected interval does not have a booking.", function () {
            var formValues = BookingFormUtils_1.BookingFormUtils.createBookingFormValues();
            var errors = BookingFormCreateValidator_1.BookingFormCreateValidator.validate(formValues, []);
            expect(Object.values(errors)).toHaveLength(0);
        });
        it("Allows bookings when the selected interval already has a booking and a replacement booking.", function () {
            var formValues = BookingFormUtils_1.BookingFormUtils.createBookingFormValues({
                bookingType: typings_1.BookingType.REPLACEMENT,
                replaceBrand: "TEST",
                replaceModel: "TEST",
                replacePlateNumber: "TEST",
                replaceVin: "TEST"
            });
            var existingBookings = [
                {
                    bookingType: formValues.bookingType,
                    from: DateUtils_1.DateUtils.getUnixTimestampFromDate(formValues.from),
                    to: DateUtils_1.DateUtils.getUnixTimestampFromDate(formValues.to),
                    userId: formValues.userId
                }
            ];
            var errors = BookingFormCreateValidator_1.BookingFormCreateValidator.validate(formValues, existingBookings);
            expect(Object.values(errors)).toHaveLength(0);
        });
    });
    describe("Replacement bookings", function () {
        it("Requires the replacement vehicle fields when a booking is a replacement type.", function () {
            var formValues = BookingFormUtils_1.BookingFormUtils.createBookingFormValues({
                bookingType: typings_1.BookingType.REPLACEMENT
            });
            var existingBookings = [
                {
                    bookingType: formValues.bookingType,
                    from: DateUtils_1.DateUtils.getUnixTimestampFromDate(formValues.from),
                    to: DateUtils_1.DateUtils.getUnixTimestampFromDate(formValues.to),
                    userId: formValues.userId
                }
            ];
            var errors = BookingFormCreateValidator_1.BookingFormCreateValidator.validate(formValues, existingBookings);
            expect(errors.replaceBrand).toBeDefined();
            expect(errors.replaceModel).toBeDefined();
            expect(errors.replaceVin).toBeDefined();
            expect(errors.replacePlateNumber).toBeDefined();
        });
        it("Does not require the replacement vehicle fields when a booking is NOT a replacement type.", function () { });
    });
    it("Gives an error on empty required fields.", function () {
        var errors = BookingFormCreateValidator_1.BookingFormCreateValidator.validate({}, []);
        expect(errors.from).toBeDefined();
        expect(errors.to).toBeDefined();
        expect(errors.userId).toBeDefined();
        expect(errors.bookingType).toBeDefined();
        expect(errors.locationId).toBeDefined();
        expect(errors.vehicleId).toBeDefined();
    });
    it("Does not give any errors on valid values", function () {
        var formValues = BookingFormUtils_1.BookingFormUtils.createBookingFormValues();
        var errors = BookingFormCreateValidator_1.BookingFormCreateValidator.validate(formValues, []);
        expect(Object.values(errors)).toHaveLength(0);
    });
});
