"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DateUtils_1 = require("./DateUtils");
describe("DateUtils", function () {
    describe("Conversion of date to unix timestamp.", function () {
        it("Returns the correct unix timestamp", function () {
            var date = new Date();
            var timestamp = DateUtils_1.DateUtils.getUnixTimestampFromDate(date);
            expect(timestamp).toEqual(DateUtils_1.DateUtils.getUnixTimestampFromDate(date));
        });
    });
    describe("Get date from date object or timestamp.", function () {
        it("Returns the correct unix timestamp from date object.", function () {
            var date = new Date();
            var date2 = DateUtils_1.DateUtils.getDate(date);
            expect(DateUtils_1.DateUtils.getUnixTimestampFromDate(date2)).toEqual(DateUtils_1.DateUtils.getUnixTimestampFromDate(date));
        });
        it("Returns the correct date object from unix timestamp.", function () {
            var timestamp = DateUtils_1.DateUtils.getUnixTimestampFromDate(new Date());
            var date = DateUtils_1.DateUtils.getDate(timestamp);
            expect(DateUtils_1.DateUtils.getUnixTimestampFromDate(date)).toEqual(timestamp);
        });
    });
    describe("Formatting dates to string", function () {
        it("Returns the correct long date format", function () {
            var date = new Date("Wed Apr 07 2021 13:40:47");
            var timestring = DateUtils_1.DateUtils.formatToLongDateFormat(date);
            expect(timestring).toEqual("Apr 7 2021 1:40 PM");
        });
    });
    describe("Getting time relative from now.", function () {
        it("It returns a string", function () {
            var date = new Date("Wed Apr 07 2021 13:40:47");
            var relativeFromNow = DateUtils_1.DateUtils.relativeFromNow(date);
            expect(typeof relativeFromNow).toEqual("string");
        });
    });
    describe("Getting date from unix timestamp.", function () {
        it("It returns a string", function () {
            var timestamp = Math.floor(new Date().valueOf() / 1000);
            var date = DateUtils_1.DateUtils.getDateFromUnixTimestamp(timestamp);
            expect(Math.floor(date.valueOf() / 1000)).toEqual(timestamp);
        });
    });
    describe("Getting unix timestamp from date.", function () {
        it("It returns a string", function () {
            var date = new Date();
            var timestamp = DateUtils_1.DateUtils.getUnixTimestampFromDate(date);
            expect(Math.floor(new Date().valueOf() / 1000)).toEqual(timestamp);
        });
    });
    describe("Adding seconds to date.", function () {
        it("Adds positve seconds to date.", function () {
            var date = new Date();
            var SECONDS = 100;
            var addedSeconds = DateUtils_1.DateUtils.addSecondsToDate(date, SECONDS);
            expect(DateUtils_1.DateUtils.getUnixTimestampFromDate(addedSeconds) -
                DateUtils_1.DateUtils.getUnixTimestampFromDate(date)).toEqual(SECONDS);
        });
        it("Adds negative seconds to date.", function () {
            var date = new Date();
            var SECONDS = -100;
            var addedSeconds = DateUtils_1.DateUtils.addSecondsToDate(date, SECONDS);
            expect(DateUtils_1.DateUtils.getUnixTimestampFromDate(addedSeconds) -
                DateUtils_1.DateUtils.getUnixTimestampFromDate(date)).toEqual(SECONDS);
        });
    });
    describe("Date comparing", function () {
        describe("Comparing if date is before another date.", function () {
            it("Should be before another date", function () { });
        });
        describe("Comparing if date is after another date.", function () {
            it("Should be after another date", function () { });
        });
        describe("Comparing if a date interval overlaps with another date interval.", function () {
            var currentDate = new Date();
            it("Should return false on non overlapping dates. a a b b", function () {
                var interval1 = {
                    start: DateUtils_1.DateUtils.addSecondsToDate(currentDate, 0),
                    end: DateUtils_1.DateUtils.addSecondsToDate(currentDate, 1)
                };
                var interval2 = {
                    start: DateUtils_1.DateUtils.addSecondsToDate(currentDate, 2),
                    end: DateUtils_1.DateUtils.addSecondsToDate(currentDate, 3)
                };
                var isOverlapping = DateUtils_1.DateUtils.doesDateIntervalOverlaps(interval1, interval2);
                expect(isOverlapping).toBeFalsy();
            });
            it("Should return true on overlapping dates. a b b a", function () {
                var interval1 = {
                    start: DateUtils_1.DateUtils.addSecondsToDate(currentDate, 0),
                    end: DateUtils_1.DateUtils.addSecondsToDate(currentDate, 3)
                };
                var interval2 = {
                    start: DateUtils_1.DateUtils.addSecondsToDate(currentDate, 1),
                    end: DateUtils_1.DateUtils.addSecondsToDate(currentDate, 2)
                };
                var isOverlapping = DateUtils_1.DateUtils.doesDateIntervalOverlaps(interval1, interval2);
                expect(isOverlapping).toBeTruthy();
            });
            it("Should return true on overlapping dates. a b a b", function () {
                var interval1 = {
                    start: DateUtils_1.DateUtils.addSecondsToDate(currentDate, 0),
                    end: DateUtils_1.DateUtils.addSecondsToDate(currentDate, 2)
                };
                var interval2 = {
                    start: DateUtils_1.DateUtils.addSecondsToDate(currentDate, 1),
                    end: DateUtils_1.DateUtils.addSecondsToDate(currentDate, 3)
                };
                var isOverlapping = DateUtils_1.DateUtils.doesDateIntervalOverlaps(interval1, interval2);
                expect(isOverlapping).toBeTruthy();
            });
            it("Should return true on overlapping dates. b a a b", function () {
                var interval1 = {
                    start: DateUtils_1.DateUtils.addSecondsToDate(currentDate, 1),
                    end: DateUtils_1.DateUtils.addSecondsToDate(currentDate, 2)
                };
                var interval2 = {
                    start: DateUtils_1.DateUtils.addSecondsToDate(currentDate, 0),
                    end: DateUtils_1.DateUtils.addSecondsToDate(currentDate, 3)
                };
                var isOverlapping = DateUtils_1.DateUtils.doesDateIntervalOverlaps(interval1, interval2);
                expect(isOverlapping).toBeTruthy();
            });
            it("Should return true on overlapping dates with equal intervals.", function () {
                var interval1 = {
                    start: DateUtils_1.DateUtils.addSecondsToDate(currentDate, 0),
                    end: DateUtils_1.DateUtils.addSecondsToDate(currentDate, 1)
                };
                var interval2 = {
                    start: DateUtils_1.DateUtils.addSecondsToDate(currentDate, 1),
                    end: DateUtils_1.DateUtils.addSecondsToDate(currentDate, 2)
                };
                var isOverlapping = DateUtils_1.DateUtils.doesDateIntervalOverlaps(interval1, interval2);
                expect(isOverlapping).toBeTruthy();
            });
        });
    });
});
