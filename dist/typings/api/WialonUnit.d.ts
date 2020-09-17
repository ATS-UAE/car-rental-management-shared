import { ServerResponse } from "..";
export interface WialonUnitAttributes {
    name: string;
    imei: string;
    lat: number | null;
    lng: number | null;
    mileage: number | null;
}
export declare type WialonUnitServerResponseGet = ServerResponse<WialonUnitAttributes | null>;
export declare type WialonUnitServerResponseGetAll = ServerResponse<WialonUnitAttributes[]>;
