import {
	CategoryAttributes,
	DatePropsToUnix,
	ServerResponse,
	RemoveImmutableSequelizeProperties
} from "../";

export type CategoryServerResponseGet = ServerResponse<
	DatePropsToUnix<CategoryAttributes>
>;
export type CategoryServerResponseGetAll = ServerResponse<
	DatePropsToUnix<CategoryAttributes>[]
>;
export type CategoryServerParamsPatch = DatePropsToUnix<
	Partial<RemoveImmutableSequelizeProperties<CategoryAttributes>>
>;
export type CategoryServerParamsPost = Pick<
	CategoryAttributes,
	"name" | "clientId"
>;
export type CategoryServerResponsePatch = CategoryServerResponseGet;
export type CategoryServerResponseDelete = CategoryServerResponseGet;
