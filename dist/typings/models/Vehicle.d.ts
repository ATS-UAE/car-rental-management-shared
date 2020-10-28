import { SequelizeBaseAttributes } from ".";
import { BookingChargeUnit } from "..";
export interface VehicleAttributes extends SequelizeBaseAttributes {
    id: number;
    brand: string;
    model: string;
    plateNumber: string;
    vin: string;
    defleeted: boolean;
    parkingLocation: string | null;
    vehicleImageSrc: string | null;
    bookingChargeCount: number;
    bookingCharge: number;
    wialonUnitId: number | null;
    bookingChargeUnit: BookingChargeUnit | null;
    clientId: number | null;
    locationId: number | null;
    categoryCostId: number | null;
}
