import { BookingChargeUnit, BookingStatus } from "../typings";
import { BookingUtils } from "./BookingUtils";
import { DateUtils } from "./DateUtils";

describe("BookingUtils", () => {
	describe("Getting booking status.", () => {
		it("Returns pending booking.", () => {
			const status = BookingUtils.getBookingStatus({
				from: new Date(),
				to: new Date(),
				approved: null
			});
			expect(status).toEqual(BookingStatus.PENDING);
		});
		it("Returns approved booking.", () => {
			const status = BookingUtils.getBookingStatus({
				from: DateUtils.addSecondsToDate(new Date(), 100),
				to: DateUtils.addSecondsToDate(new Date(), 101),
				approved: true
			});
			expect(status).toEqual(BookingStatus.APPROVED);
		});
		it("Returns denied booking.", () => {
			const status = BookingUtils.getBookingStatus({
				from: DateUtils.addSecondsToDate(new Date(), 100),
				to: DateUtils.addSecondsToDate(new Date(), 101),
				approved: false
			});
			expect(status).toEqual(BookingStatus.DENIED);
		});
		it("Returns ongoing booking.", () => {
			const status = BookingUtils.getBookingStatus({
				from: DateUtils.addSecondsToDate(new Date(), -100),
				to: DateUtils.addSecondsToDate(new Date(), 101),
				approved: true
			});
			expect(status).toEqual(BookingStatus.ONGOING);
		});
		it("Returns finished booking.", () => {
			const status = BookingUtils.getBookingStatus({
				from: DateUtils.addSecondsToDate(new Date(), -100),
				to: DateUtils.addSecondsToDate(new Date(), -101),
				approved: true
			});
			expect(status).toEqual(BookingStatus.FINISHED);
		});
	});
	describe("Is Booking timeslot taken.", () => {
		it("Should be taken", () => {
			const isTaken = BookingUtils.isBookingTimeSlotTaken(
				[
					{
						from: DateUtils.addSecondsToDate(new Date(), -100),
						to: DateUtils.addSecondsToDate(new Date(), 100),
						id: 1
					}
				],
				new Date(),
				new Date()
			);
			expect(isTaken).toBeTruthy();
		});
		it("Should not be taken", () => {
			const isTaken = BookingUtils.isBookingTimeSlotTaken(
				[
					{
						from: DateUtils.addSecondsToDate(new Date(), -100),
						to: DateUtils.addSecondsToDate(new Date(), 100),
						id: 1
					}
				],
				DateUtils.addSecondsToDate(new Date(), 200),
				DateUtils.addSecondsToDate(new Date(), 201)
			);
			expect(isTaken).toBeFalsy();
		});
	});
	describe("Getting booking cost string.", () => {
		it("Should cost 1 aed per day.", () => {
			const bookingCost = BookingUtils.getBookingCostString(
				1,
				1,
				BookingChargeUnit.DAY
			);
			expect(bookingCost).toEqual("1 AED per 1 Day");
		});
		it("It should pluralize booking charge unit.", () => {
			const bookingCost = BookingUtils.getBookingCostString(
				1,
				2,
				BookingChargeUnit.DAY
			);
			expect(bookingCost).toEqual("1 AED per 2 Days");
		});
		it("Should return null for free bookings", () => {
			const bookingCost = BookingUtils.getBookingCostString(1, 1, null);
			expect(bookingCost).toEqual(null);
		});
	});
});
