import { SequelizeBaseAttributes } from ".";
import { BookingChargeUnit } from "../enums";
export interface CategoryAttributes extends SequelizeBaseAttributes {
    id: number;
    name: string;
    clientId: number;
    bookingChargeCount: number;
    bookingCharge: number;
    bookingChargeUnit: BookingChargeUnit | null;
}
