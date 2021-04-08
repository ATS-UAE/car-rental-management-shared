import { DateUtils, DateInterval } from "./DateUtils";

describe("DateUtils", () => {
	describe("Conversion of date to unix timestamp.", () => {
		it("Returns the correct unix timestamp", () => {
			const date = new Date();
			const timestamp = DateUtils.getUnixTimestampFromDate(date);

			expect(timestamp).toEqual(DateUtils.getUnixTimestampFromDate(date));
		});
	});
	describe("Get date from date object or timestamp.", () => {
		it("Returns the correct unix timestamp from date object.", () => {
			const date = new Date();
			const date2 = DateUtils.getDate(date);

			expect(DateUtils.getUnixTimestampFromDate(date2)).toEqual(
				DateUtils.getUnixTimestampFromDate(date)
			);
		});
		it("Returns the correct date object from unix timestamp.", () => {
			const timestamp = DateUtils.getUnixTimestampFromDate(new Date());
			const date = DateUtils.getDate(timestamp);

			expect(DateUtils.getUnixTimestampFromDate(date)).toEqual(timestamp);
		});
	});
	describe("Formatting dates to string", () => {
		it("Returns the correct long date format", () => {
			const date = new Date("Wed Apr 07 2021 13:40:47");

			const timestring = DateUtils.formatToLongDateFormat(date);

			expect(timestring).toEqual("Apr 7 2021 1:40 PM");
		});
	});
	describe("Getting time relative from now.", () => {
		it("It returns a string", () => {
			const date = new Date("Wed Apr 07 2021 13:40:47");

			const relativeFromNow = DateUtils.relativeFromNow(date);

			expect(typeof relativeFromNow).toEqual("string");
		});
	});
	describe("Getting date from unix timestamp.", () => {
		it("It returns a string", () => {
			const timestamp = Math.floor(new Date().valueOf() / 1000);

			const date = DateUtils.getDateFromUnixTimestamp(timestamp);

			expect(Math.floor(date.valueOf() / 1000)).toEqual(timestamp);
		});
	});
	describe("Getting unix timestamp from date.", () => {
		it("It returns a string", () => {
			const date = new Date();

			const timestamp = DateUtils.getUnixTimestampFromDate(date);

			expect(Math.floor(new Date().valueOf() / 1000)).toEqual(timestamp);
		});
	});
	describe("Adding seconds to date.", () => {
		it("Adds positve seconds to date.", () => {
			const date = new Date();
			const SECONDS = 100;

			const addedSeconds = DateUtils.addSecondsToDate(date, SECONDS);

			expect(
				DateUtils.getUnixTimestampFromDate(addedSeconds) -
					DateUtils.getUnixTimestampFromDate(date)
			).toEqual(SECONDS);
		});
		it("Adds negative seconds to date.", () => {
			const date = new Date();
			const SECONDS = -100;

			const addedSeconds = DateUtils.addSecondsToDate(date, SECONDS);

			expect(
				DateUtils.getUnixTimestampFromDate(addedSeconds) -
					DateUtils.getUnixTimestampFromDate(date)
			).toEqual(SECONDS);
		});
	});
	describe("Date comparing", () => {
		describe("Comparing if date is before another date.", () => {
			it("Should be before another date", () => {});
		});
		describe("Comparing if date is after another date.", () => {
			it("Should be after another date", () => {});
		});
		describe("Comparing if a date interval overlaps with another date interval.", () => {
			const currentDate = new Date();
			it("Should return false on non overlapping dates. a a b b", () => {
				const interval1: DateInterval = {
					start: DateUtils.addSecondsToDate(currentDate, 0),
					end: DateUtils.addSecondsToDate(currentDate, 1)
				};
				const interval2: DateInterval = {
					start: DateUtils.addSecondsToDate(currentDate, 2),
					end: DateUtils.addSecondsToDate(currentDate, 3)
				};
				const isOverlapping = DateUtils.doesDateIntervalOverlaps(
					interval1,
					interval2
				);
				expect(isOverlapping).toBeFalsy();
			});
			it("Should return true on overlapping dates. a b b a", () => {
				const interval1: DateInterval = {
					start: DateUtils.addSecondsToDate(currentDate, 0),
					end: DateUtils.addSecondsToDate(currentDate, 3)
				};
				const interval2: DateInterval = {
					start: DateUtils.addSecondsToDate(currentDate, 1),
					end: DateUtils.addSecondsToDate(currentDate, 2)
				};
				const isOverlapping = DateUtils.doesDateIntervalOverlaps(
					interval1,
					interval2
				);
				expect(isOverlapping).toBeTruthy();
			});
			it("Should return true on overlapping dates. a b a b", () => {
				const interval1: DateInterval = {
					start: DateUtils.addSecondsToDate(currentDate, 0),
					end: DateUtils.addSecondsToDate(currentDate, 2)
				};
				const interval2: DateInterval = {
					start: DateUtils.addSecondsToDate(currentDate, 1),
					end: DateUtils.addSecondsToDate(currentDate, 3)
				};
				const isOverlapping = DateUtils.doesDateIntervalOverlaps(
					interval1,
					interval2
				);
				expect(isOverlapping).toBeTruthy();
			});
			it("Should return true on overlapping dates. b a a b", () => {
				const interval1: DateInterval = {
					start: DateUtils.addSecondsToDate(currentDate, 1),
					end: DateUtils.addSecondsToDate(currentDate, 2)
				};
				const interval2: DateInterval = {
					start: DateUtils.addSecondsToDate(currentDate, 0),
					end: DateUtils.addSecondsToDate(currentDate, 3)
				};
				const isOverlapping = DateUtils.doesDateIntervalOverlaps(
					interval1,
					interval2
				);
				expect(isOverlapping).toBeTruthy();
			});
			it("Should return true on overlapping dates with equal intervals.", () => {
				const interval1: DateInterval = {
					start: DateUtils.addSecondsToDate(currentDate, 0),
					end: DateUtils.addSecondsToDate(currentDate, 1)
				};
				const interval2: DateInterval = {
					start: DateUtils.addSecondsToDate(currentDate, 1),
					end: DateUtils.addSecondsToDate(currentDate, 2)
				};
				const isOverlapping = DateUtils.doesDateIntervalOverlaps(
					interval1,
					interval2
				);
				expect(isOverlapping).toBeTruthy();
			});
		});
	});
});
