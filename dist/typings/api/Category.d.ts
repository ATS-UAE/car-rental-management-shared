import { CategoryAttributes, DatePropsToUnix, ServerResponse, RemoveImmutableSequelizeProperties } from "..";
export declare type CategoryServerResponseGet = ServerResponse<DatePropsToUnix<CategoryAttributes>>;
export declare type CategoryServerResponseGetAll = ServerResponse<DatePropsToUnix<CategoryAttributes>[]>;
export declare type CategoryServerParamsPatch = DatePropsToUnix<Partial<RemoveImmutableSequelizeProperties<CategoryAttributes>>>;
export declare type CategoryServerParamsPost = Pick<CategoryAttributes, "name" | "clientId">;
export declare type CategoryServerResponsePatch = CategoryServerResponseGet;
export declare type CategoryServerResponseDelete = CategoryServerResponseGet;
