import { BookingChargeUnit } from "../typings";
import { CalculatedCost, BookingParams, CostParams } from "./CalculatedCost";

const getBookingParams = (
	overrides?: Partial<BookingParams>
): BookingParams => {
	return {
		from: new Date(),
		to: new Date(),
		startMileage: 100,
		endMileage: 200,
		...overrides
	};
};

const getCostParams = (overrides?: Partial<CostParams>): CostParams => {
	return {
		bookingChargeUnit: BookingChargeUnit.KILOMETER,
		bookingChargeCount: 5,
		bookingCharge: 5,
		...overrides
	};
};

describe("CalculatedCost", () => {
	describe("Free bookings", () => {
		it("Returns true on free bookings.", () => {
			const bookingParams = getBookingParams();
			const costParams = getCostParams({
				bookingChargeUnit: null
			});

			const calculation = CalculatedCost.calculateBookingCost(
				bookingParams,
				costParams
			);
			expect(calculation.hasCost()).toBeFalsy();
		});
		it("Returns false on free bookings.", () => {
			const bookingParams = getBookingParams();
			const costParams = getCostParams({
				bookingChargeUnit: BookingChargeUnit.SECOND
			});

			const calculation = CalculatedCost.calculateBookingCost(
				bookingParams,
				costParams
			);
			expect(calculation.hasCost()).toBeTruthy();
		});
	});
	describe("Calculating cost by mileage", () => {
		it("Calculates a mileage based booking cost.", () => {
			const START_MILEAGE = 0;
			const END_MILEAGE = 5;

			const bookingParams = getBookingParams({
				startMileage: START_MILEAGE,
				endMileage: END_MILEAGE
			});
			const costParams = getCostParams({
				bookingCharge: 20,
				bookingChargeCount: 1,
				bookingChargeUnit: BookingChargeUnit.KILOMETER
			});
			const cost =
				((END_MILEAGE - START_MILEAGE) / costParams.bookingChargeCount) *
				costParams.bookingCharge;

			const calculation = CalculatedCost.calculateBookingCost(
				bookingParams,
				costParams
			);

			expect(calculation.getCost()).toEqual(cost);
		});
	});
	describe("Calculating cost by time", () => {
		it("Calculates monthly costs.", () => {
			const bookingParams = getBookingParams({
				from: new Date("2021-04-30T20:00:00.000Z"),
				to: new Date("2021-06-30T20:00:00.000Z")
			});
			const costParams = getCostParams({
				bookingChargeUnit: BookingChargeUnit.MONTH
			});
			const TWO_MONTHS = 2;
			const cost =
				(TWO_MONTHS / costParams.bookingChargeCount) * costParams.bookingCharge;

			const calculation = CalculatedCost.calculateBookingCost(
				bookingParams,
				costParams
			);
			expect(calculation.getCost()).toEqual(cost);
		});
		it("Calculates weekly costs.", () => {
			const bookingParams = getBookingParams({
				from: new Date("2021-02-01T20:00:00.000Z"),
				to: new Date("2021-02-15T20:00:00.000Z")
			});
			const costParams = getCostParams({
				bookingChargeUnit: BookingChargeUnit.WEEK
			});
			const TWO_WEEKS = 2;
			const cost =
				(TWO_WEEKS / costParams.bookingChargeCount) * costParams.bookingCharge;

			const calculation = CalculatedCost.calculateBookingCost(
				bookingParams,
				costParams
			);
			expect(calculation.getCost()).toEqual(cost);
		});
		it("Calculates daily costs.", () => {
			const bookingParams = getBookingParams({
				from: new Date("2021-04-01T20:00:00.000Z"),
				to: new Date("2021-04-11T20:00:00.000Z")
			});
			const costParams = getCostParams({
				bookingChargeUnit: BookingChargeUnit.DAY
			});
			const TEN_DAYS = 10;
			const cost =
				(TEN_DAYS / costParams.bookingChargeCount) * costParams.bookingCharge;

			const calculation = CalculatedCost.calculateBookingCost(
				bookingParams,
				costParams
			);
			expect(calculation.getCost()).toEqual(cost);
		});
		it("Calculates hourly costs.", () => {
			const bookingParams = getBookingParams({
				from: new Date("2021-04-30T10:00:00.000Z"),
				to: new Date("2021-04-30T20:00:00.000Z")
			});
			const costParams = getCostParams({
				bookingChargeUnit: BookingChargeUnit.HOUR
			});
			const TEN_HOURS = 10;
			const cost =
				(TEN_HOURS / costParams.bookingChargeCount) * costParams.bookingCharge;

			const calculation = CalculatedCost.calculateBookingCost(
				bookingParams,
				costParams
			);

			expect(calculation.getCost()).toEqual(cost);
		});
		it("Calculates per second costs.", () => {
			const bookingParams = getBookingParams({
				from: new Date("2021-04-30T20:00:00.000Z"),
				to: new Date("2021-04-30T20:00:10.000Z")
			});
			const costParams = getCostParams({
				bookingChargeUnit: BookingChargeUnit.SECOND
			});
			const TEN_SECONDS = 10;
			const cost =
				(TEN_SECONDS / costParams.bookingChargeCount) * costParams.bookingCharge;

			const calculation = CalculatedCost.calculateBookingCost(
				bookingParams,
				costParams
			);
			expect(calculation.getCost()).toEqual(cost);
		});
	});
});
