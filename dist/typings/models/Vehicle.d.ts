import { BookingChargeUnit } from "..";
export interface VehicleAttributes {
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
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
