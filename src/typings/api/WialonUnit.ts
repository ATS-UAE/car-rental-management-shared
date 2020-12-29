import { ServerResponse } from "..";

export enum WialonUnitCommand {
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

export type WialonUnitServerResponseGet = ServerResponse<WialonUnitAttributes>;
export type WialonUnitServerResponseGetAll = ServerResponse<
	WialonUnitAttributes[]
>;
