import { ServerResponse } from "..";
export declare enum WialonUnitCommand {
    DOOR_UNLOCK = "DOOR_UNLOCK",
    DOOR_LOCK = "DOOR_LOCK",
    IMMOBILIZER_ON = "IMMOBILIZER_ON",
    IMMOBILIZER_OFF = "IMMOBILIZER_OFF"
}
export interface WialonUnitAttributes {
    id: number;
    name: string;
    imei: string;
    lat: number | null;
    lng: number | null;
    mileage: number | null;
    supportedCommands: WialonUnitCommand[];
}
export declare type WialonUnitServerResponseGet = ServerResponse<WialonUnitAttributes>;
export declare type WialonUnitServerResponseGetAll = ServerResponse<WialonUnitAttributes[]>;
