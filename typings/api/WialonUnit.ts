import { ServerResponse } from "../";

export interface WialonUnitAttributes {
	name: string;
	imei: string;
	lat: number | null;
	lng: number | null;
	mileage: number | null;
}

export type WialonUnitServerResponseGet = ServerResponse<WialonUnitAttributes | null>;
export type WialonUnitServerResponseGetAll = ServerResponse<
	WialonUnitAttributes[]
>;
