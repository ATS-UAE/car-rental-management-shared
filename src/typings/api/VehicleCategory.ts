import { ServerResponse } from ".";
import { VehicleCategoryAttributes } from "../models";
import { DatePropsToUnix } from "../utils";

export type VehicleCategoryServerResponseGetAll = ServerResponse<
	DatePropsToUnix<VehicleCategoryAttributes>[]
>;
