import moment from "moment";
import { BookingChargeUnit } from "../typings";

export class CalculatedCost {
	constructor(
		public cost: number,
		public count: number,
		public unit: BookingChargeUnit
	) {}

	public static calculateCost = (
		bookingParams: {
			from: Date;
			to: Date;
			startMileage: number | null;
			endMileage: number | null;
		},
		costParams: {
			bookingChargeUnit: BookingChargeUnit | null;
			bookingChargeCount: number;
			bookingCharge: number;
		}
	): CalculatedCost | null => {
		const { from, to, endMileage, startMileage } = bookingParams;
		const {
			bookingCharge,
			bookingChargeCount,
			bookingChargeUnit
		} = costParams;
		// If bookingChargeUnit !== null, and bookingChargcount and bookingCharge > 0
		if (
			bookingChargeUnit !== null &&
			bookingChargeCount > 0 &&
			bookingCharge > 0
		) {
			switch (bookingChargeUnit) {
				case BookingChargeUnit.KILOMETER: {
					if (startMileage !== null && endMileage !== null) {
						const mileageUsed = endMileage - startMileage;
						const cost =
							(mileageUsed / bookingChargeCount) * bookingCharge;
						return new CalculatedCost(
							cost,
							mileageUsed,
							bookingChargeUnit
						);
					}
					break;
				}
				case BookingChargeUnit.MONTH: {
					const count = moment(to).diff(from, "months");
					const cost = (count / bookingChargeCount) * bookingCharge;
					return new CalculatedCost(cost, count, bookingChargeUnit);
				}
				case BookingChargeUnit.WEEK: {
					const count = moment(to).diff(from, "weeks");
					const cost = (count / bookingChargeCount) * bookingCharge;
					return new CalculatedCost(cost, count, bookingChargeUnit);
				}
				case BookingChargeUnit.DAY: {
					const count = moment(to).diff(from, "days");
					const cost = (count / bookingChargeCount) * bookingCharge;
					return new CalculatedCost(cost, count, bookingChargeUnit);
				}
				case BookingChargeUnit.HOUR: {
					const count = moment(to).diff(from, "hours");
					const cost = (count / bookingChargeCount) * bookingCharge;
					return new CalculatedCost(cost, count, bookingChargeUnit);
				}
				case BookingChargeUnit.SECOND: {
					const count = moment(to).diff(from, "seconds");
					const cost = (count / bookingChargeCount) * bookingCharge;
					return new CalculatedCost(cost, count, bookingChargeUnit);
				}
			}
		}
		return null;
	};
}
