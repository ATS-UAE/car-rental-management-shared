import {
	differenceInMonths,
	differenceInWeeks,
	differenceInDays,
	differenceInHours,
	differenceInSeconds
} from "date-fns";
import { BookingChargeUnit } from "../typings";

export interface BookingParams {
	from: Date;
	to: Date;
	startMileage: number | null;
	endMileage: number | null;
}

export interface CostParams {
	bookingChargeUnit: BookingChargeUnit | null;
	bookingChargeCount: number;
	bookingCharge: number;
}

export class CalculatedCost {
	private constructor(
		private bookingParams: BookingParams,
		private costParams: CostParams
	) {}

	public static calculateBookingCost = (
		bookingParams: BookingParams,
		costParams: CostParams
	) => {
		return new CalculatedCost(bookingParams, costParams);
	};

	public hasCost = () => {
		const {
			bookingCharge,
			bookingChargeCount,
			bookingChargeUnit
		} = this.costParams;
		return (
			bookingChargeUnit !== null && bookingChargeCount > 0 && bookingCharge > 0
		);
	};

	public getCost = () => {
		const { from, to, endMileage, startMileage } = this.bookingParams;
		const {
			bookingCharge,
			bookingChargeCount,
			bookingChargeUnit
		} = this.costParams;
		switch (bookingChargeUnit) {
			case BookingChargeUnit.KILOMETER: {
				if (startMileage !== null && endMileage !== null) {
					const mileageUsed = endMileage - startMileage;
					const cost = (mileageUsed / bookingChargeCount) * bookingCharge;
					return cost;
				}
				break;
			}
			case BookingChargeUnit.MONTH: {
				const count = differenceInMonths(to, from);
				const cost = (count / bookingChargeCount) * bookingCharge;
				return cost;
			}
			case BookingChargeUnit.WEEK: {
				const count = differenceInWeeks(to, from);
				const cost = (count / bookingChargeCount) * bookingCharge;
				return cost;
			}
			case BookingChargeUnit.DAY: {
				const count = differenceInDays(to, from);
				const cost = (count / bookingChargeCount) * bookingCharge;
				return cost;
			}
			case BookingChargeUnit.HOUR: {
				const count = differenceInHours(to, from);
				const cost = (count / bookingChargeCount) * bookingCharge;
				return cost;
			}
			case BookingChargeUnit.SECOND: {
				const count = differenceInSeconds(to, from);
				const cost = (count / bookingChargeCount) * bookingCharge;
				return cost;
			}
			default:
				return null;
		}
		return null;
	};

	// public get cost(): number {
	// const { from, to, endMileage, startMileage } = bookingParams;
	// const { bookingCharge, bookingChargeCount, bookingChargeUnit } = costParams;
	// }
	// public get count(): number {}
	// public get unit(): BookingChargeUnit {}

	// public hasCost = () => {
	// 	const {
	// 		bookingCharge,
	// 		bookingChargeCount,
	// 		bookingChargeUnit
	// 	} = this.costParams;
	// 	if (
	// 		bookingChargeUnit !== null &&
	// 		bookingChargeCount > 0 &&
	// 		bookingCharge > 0
	// 	) {
	// 		return true;
	// 	}
	// 	return false;
	// };

	// private getCostOrFail = () => {};

	// public getMileageUsed = () => {
	// 	const { endMileage, startMileage } = this.bookingParams;
	// 	if (startMileage !== null && endMileage !== null) {
	// 		return endMileage - startMileage;
	// 	}
	// 	return null;
	// };

	// public getBookingCostByTime = (count: number) => {
	// 	const { bookingCharge, bookingChargeCount } = this.costParams;
	// 	const cost = (count / bookingChargeCount) * bookingCharge;
	// 	return cost;
	// };

	// public static calculateCost = (
	// 	bookingParams: BookingParams,
	// 	costParams: CostParams
	// ): CalculatedCost | null => {
	// 	// return new CalculatedCost(bookingParams, costParams);
	// 	if (
	// 		bookingChargeUnit !== null &&
	// 		bookingChargeCount > 0 &&
	// 		bookingCharge > 0
	// 	) {
	// 		switch (bookingChargeUnit) {
	// 			case BookingChargeUnit.KILOMETER: {
	// 				if (startMileage !== null && endMileage !== null) {
	// 					const mileageUsed = endMileage - startMileage;
	// 					const cost = (mileageUsed / bookingChargeCount) * bookingCharge;
	// 					return new CalculatedCost(cost, mileageUsed, bookingChargeUnit);
	// 				}
	// 				break;
	// 			}
	// 			case BookingChargeUnit.MONTH: {
	// 				const count = differenceInMonths(to, from);
	// 				const cost = (count / bookingChargeCount) * bookingCharge;
	// 				return new CalculatedCost(cost, count, bookingChargeUnit);
	// 			}
	// 			case BookingChargeUnit.WEEK: {
	// 				const count = differenceInWeeks(to, from);
	// 				const cost = (count / bookingChargeCount) * bookingCharge;
	// 				return new CalculatedCost(cost, count, bookingChargeUnit);
	// 			}
	// 			case BookingChargeUnit.DAY: {
	// 				const count = differenceInDays(to, from);
	// 				const cost = (count / bookingChargeCount) * bookingCharge;
	// 				return new CalculatedCost(cost, count, bookingChargeUnit);
	// 			}
	// 			case BookingChargeUnit.HOUR: {
	// 				const count = differenceInHours(to, from);
	// 				const cost = (count / bookingChargeCount) * bookingCharge;
	// 				return new CalculatedCost(cost, count, bookingChargeUnit);
	// 			}
	// 			case BookingChargeUnit.SECOND: {
	// 				const count = differenceInSeconds(to, from);
	// 				const cost = (count / bookingChargeCount) * bookingCharge;
	// 				return new CalculatedCost(cost, count, bookingChargeUnit);
	// 			}
	// 			default:
	// 				return null;
	// 		}
	// 	}
	// 	return null;
	// };
}
