import { ServerResponse } from "..";

export type WialonUnitCommand =
	| "DOOR_UNLOCK"
	| "DOOR_LOCK"
	| "IMMOBILIZER_ON"
	| "IMMOBILIZER_OFF";

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
