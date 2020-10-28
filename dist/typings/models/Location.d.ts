import { SequelizeBaseAttributes } from ".";
export interface LocationAttributes extends SequelizeBaseAttributes {
    id: number;
    name: string;
    lat: number;
    lng: number;
    address: string;
    locationImageSrc: string | null;
}
