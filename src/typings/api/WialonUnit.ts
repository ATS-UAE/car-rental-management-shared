import { ServerResponse } from "..";

export interface WialonUnitCommand {
	label: string;
	value: string;
}
export interface WialonUnitAttributes {
	id: number;
	name: string;
	imei: string;
	lat: number | null;
	lng: number | null;
	mileage: number | null;
	commands: WialonUnitCommand[];
}

export type WialonUnitServerResponseGet = ServerResponse<WialonUnitAttributes>;
export type WialonUnitServerResponseGetAll = ServerResponse<
	WialonUnitAttributes[]
>;
