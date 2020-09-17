import {
	CategoryAttributes,
	DatePropsToUnix,
	ServerResponse,
	RemoveImmutableSequelizeProperties
} from "../";
import { UseParameters } from "../utils";

export interface CategoryRelationAttributes
	extends DatePropsToUnix<CategoryAttributes> {
	vehicles: number[];
	users: number[];
}

export type CategoryServerResponseGet = ServerResponse<
	CategoryRelationAttributes
>;
export type CategoryServerResponseGetAll = ServerResponse<
	CategoryRelationAttributes[]
>;
export type CategoryServerParamsPatch = DatePropsToUnix<
	Partial<RemoveImmutableSequelizeProperties<CategoryAttributes>>
>;
export type CategoryServerResponsePost = CategoryServerResponseGet;
export type CategoryServerParamsPost = UseParameters<
	CategoryAttributes,
	"name" | "clientId",
	"bookingCharge" | "bookingChargeCount" | "bookingChargeUnit"
>;
export type CategoryServerResponsePatch = CategoryServerResponseGet;
export type CategoryServerResponseDelete = CategoryServerResponseGet;
