import { ServerResponse } from "..";
export interface WialonUnitAttributes {
    id: number;
    name: string;
    imei: string;
    lat: number | null;
    lng: number | null;
    mileage: number | null;
}
export declare type WialonUnitServerResponseGet = ServerResponse<WialonUnitAttributes>;
export declare type WialonUnitServerResponseGetAll = ServerResponse<WialonUnitAttributes[]>;
