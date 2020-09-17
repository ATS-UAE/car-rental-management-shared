import { BookingChargeUnit } from "../typings";
export declare class CalculatedCost {
    cost: number;
    count: number;
    unit: BookingChargeUnit;
    constructor(cost: number, count: number, unit: BookingChargeUnit);
    static calculateCost: (bookingParams: {
        from: Date;
        to: Date;
        startMileage: number | null;
        endMileage: number | null;
    }, costParams: {
        bookingChargeUnit: BookingChargeUnit | null;
        bookingChargeCount: number;
        bookingCharge: number;
    }) => CalculatedCost | null;
}
