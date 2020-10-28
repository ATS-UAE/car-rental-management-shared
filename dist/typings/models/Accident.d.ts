import { SequelizeBaseAttributes } from ".";
export interface AccidentAttributes extends SequelizeBaseAttributes {
    id: number;
    message: string;
    accidentImageSrc: string | null;
    accidentVideoSrc: string | null;
    lat: number;
    lng: number;
    userId: number;
    vehicleId: number;
    bookingId: number;
}
