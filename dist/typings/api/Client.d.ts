import { ClientAttributes, DatePropsToUnix, ServerResponse, RemoveImmutableSequelizeProperties } from "..";
import { UseParameters } from "../utils";
export declare type ClientServerResponseGet = ServerResponse<DatePropsToUnix<ClientAttributes>>;
export declare type ClientServerResponseGetAll = ServerResponse<DatePropsToUnix<ClientAttributes>[]>;
export declare type ClientServerResponsePost = ClientServerResponseGet;
export declare type ClientServerParamsPost = DatePropsToUnix<UseParameters<RemoveImmutableSequelizeProperties<ClientAttributes>, "name", never>>;
export interface ClientServerParamsPatch extends DatePropsToUnix<Partial<RemoveImmutableSequelizeProperties<ClientAttributes>>> {
    vehicles?: number[];
    locations?: number[];
    users?: number[];
}
export declare type ClientServerResponsePatch = ClientServerResponseGet;
export declare type ClientServerResponseDelete = ClientServerResponseGet;
