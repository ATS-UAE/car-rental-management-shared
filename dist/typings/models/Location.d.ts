export interface LocationAttributes {
    id: number;
    name: string;
    lat: number;
    lng: number;
    address: string;
    locationImageSrc: string | null;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
