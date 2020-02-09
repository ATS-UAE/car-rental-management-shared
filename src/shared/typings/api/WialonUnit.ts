import { CoreSearchItemsResponse } from "node-wialon";
import { FlattenIfArray, ServerResponse } from "../";

export type WialonUnitAttributes = FlattenIfArray<
	CoreSearchItemsResponse["items"]
>;

export type WialonUnitServerResponseGet = ServerResponse<WialonUnitAttributes>;
export type WialonUnitServerResponseGetAll = ServerResponse<
	WialonUnitAttributes[]
>;
