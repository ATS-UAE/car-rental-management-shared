import { BookingChargeUnit } from "../enums";
export interface CategoryAttributes {
    id: number;
    name: string;
    clientId: number;
    bookingChargeCount: number;
    bookingCharge: number;
    bookingChargeUnit: BookingChargeUnit | null;
    readonly createdAt: Date;
    readonly updatedAt: Date | null;
}
