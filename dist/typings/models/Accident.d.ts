export interface AccidentAttributes {
    id: number;
    message: string;
    accidentImageSrc: string | null;
    accidentVideoSrc: string | null;
    lat: number;
    lng: number;
    userId: number;
    vehicleId: number;
    bookingId: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
