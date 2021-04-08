"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typings_1 = require("../typings");
var BookingUtils_1 = require("./BookingUtils");
var DateUtils_1 = require("./DateUtils");
describe("BookingUtils", function () {
    describe("Getting booking status.", function () {
        it("Returns pending booking.", function () {
            var status = BookingUtils_1.BookingUtils.getBookingStatus({
                from: new Date(),
                to: new Date(),
                approved: null
            });
            expect(status).toEqual(typings_1.BookingStatus.PENDING);
        });
        it("Returns approved booking.", function () {
            var status = BookingUtils_1.BookingUtils.getBookingStatus({
                from: DateUtils_1.DateUtils.addSecondsToDate(new Date(), 100),
                to: DateUtils_1.DateUtils.addSecondsToDate(new Date(), 101),
                approved: true
            });
            expect(status).toEqual(typings_1.BookingStatus.APPROVED);
        });
        it("Returns denied booking.", function () {
            var status = BookingUtils_1.BookingUtils.getBookingStatus({
                from: DateUtils_1.DateUtils.addSecondsToDate(new Date(), 100),
                to: DateUtils_1.DateUtils.addSecondsToDate(new Date(), 101),
                approved: false
            });
            expect(status).toEqual(typings_1.BookingStatus.DENIED);
        });
        it("Returns ongoing booking.", function () {
            var status = BookingUtils_1.BookingUtils.getBookingStatus({
                from: DateUtils_1.DateUtils.addSecondsToDate(new Date(), -100),
                to: DateUtils_1.DateUtils.addSecondsToDate(new Date(), 101),
                approved: true
            });
            expect(status).toEqual(typings_1.BookingStatus.ONGOING);
        });
        it("Returns finished booking.", function () {
            var status = BookingUtils_1.BookingUtils.getBookingStatus({
                from: DateUtils_1.DateUtils.addSecondsToDate(new Date(), -100),
                to: DateUtils_1.DateUtils.addSecondsToDate(new Date(), -101),
                approved: true
            });
            expect(status).toEqual(typings_1.BookingStatus.FINISHED);
        });
    });
    describe("Is Booking timeslot taken.", function () {
        it("Should be taken", function () {
            var isTaken = BookingUtils_1.BookingUtils.isBookingTimeSlotTaken([
                {
                    from: DateUtils_1.DateUtils.addSecondsToDate(new Date(), -100),
                    to: DateUtils_1.DateUtils.addSecondsToDate(new Date(), 100),
                    id: 1
                }
            ], new Date(), new Date());
            expect(isTaken).toBeTruthy();
        });
        it("Should not be taken", function () {
            var isTaken = BookingUtils_1.BookingUtils.isBookingTimeSlotTaken([
                {
                    from: DateUtils_1.DateUtils.addSecondsToDate(new Date(), -100),
                    to: DateUtils_1.DateUtils.addSecondsToDate(new Date(), 100),
                    id: 1
                }
            ], DateUtils_1.DateUtils.addSecondsToDate(new Date(), 200), DateUtils_1.DateUtils.addSecondsToDate(new Date(), 201));
            expect(isTaken).toBeFalsy();
        });
    });
});
