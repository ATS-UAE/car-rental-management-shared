import { ServerResponse } from ".";
import { VehicleCategoryAttributes } from "../models";
import { DatePropsToUnix } from "../utils";
export declare type VehicleCategoryServerResponseGetAll = ServerResponse<DatePropsToUnix<VehicleCategoryAttributes>[]>;
