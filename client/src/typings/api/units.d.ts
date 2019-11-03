import { CoreSearchItemsResponse } from "node-wialon";
import { FlattenIfArray } from "../utils";
export type Unit = FlattenIfArray<CoreSearchItemsResponse["items"]>;
