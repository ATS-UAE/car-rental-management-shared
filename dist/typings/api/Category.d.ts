import { CategoryAttributes, DatePropsToUnix, ServerResponse, RemoveImmutableSequelizeProperties } from "..";
import { UseParameters } from "../utils";
export interface CategoryRelationAttributes extends DatePropsToUnix<CategoryAttributes> {
    vehicles: number[];
    users: number[];
}
export declare type CategoryServerResponseGet = ServerResponse<CategoryRelationAttributes>;
export declare type CategoryServerResponseGetAll = ServerResponse<CategoryRelationAttributes[]>;
export declare type CategoryServerParamsPatch = DatePropsToUnix<Partial<RemoveImmutableSequelizeProperties<CategoryAttributes>>>;
export declare type CategoryServerResponsePost = CategoryServerResponseGet;
export declare type CategoryServerParamsPost = UseParameters<CategoryAttributes, "name" | "clientId", "bookingCharge" | "bookingChargeCount" | "bookingChargeUnit">;
export declare type CategoryServerResponsePatch = CategoryServerResponseGet;
export declare type CategoryServerResponseDelete = CategoryServerResponseGet;
