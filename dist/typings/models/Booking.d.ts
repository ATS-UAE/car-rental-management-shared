import { SequelizeBaseAttributes } from ".";
import { BookingType } from "..";
export interface BookingAttributes extends SequelizeBaseAttributes {
    id: number;
    paid: boolean;
    amount: number | null;
    from: Date;
    to: Date;
    approved: boolean | null;
    finished: boolean;
    startMileage: number | null;
    endMileage: number | null;
    startFuel: number | null;
    endFuel: number | null;
    userId: number;
    vehicleId: number;
    bookingType: BookingType;
    returnDate: Date | null;
    pickupDate: Date | null;
    replacePlateNumber: string | null;
    replaceBrand: string | null;
    replaceModel: string | null;
    replaceVin: string | null;
}
