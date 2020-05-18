import {
	CategoryAttributes,
	DatePropsToUnix,
	ServerResponse,
	RemoveImmutableSequelizeProperties
} from "../";
import { UseParameters } from "../utils";

export type CategoryServerResponseGet = ServerResponse<
	DatePropsToUnix<CategoryAttributes>
>;
export type CategoryServerResponseGetAll = ServerResponse<
	DatePropsToUnix<CategoryAttributes>[]
>;
export type CategoryServerParamsPatch = DatePropsToUnix<
	Partial<RemoveImmutableSequelizeProperties<CategoryAttributes>>
>;
export type CategoryServerResponsePost = CategoryServerResponseGet;
export type CategoryServerParamsPost = UseParameters<
	CategoryAttributes,
	"name" | "clientId"
>;
export type CategoryServerResponsePatch = CategoryServerResponseGet;
export type CategoryServerResponseDelete = CategoryServerResponseGet;
