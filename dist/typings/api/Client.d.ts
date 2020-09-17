import { ClientAttributes, DatePropsToUnix, ServerResponse, RemoveImmutableSequelizeProperties } from "..";
export declare type ClientServerResponseGet = ServerResponse<DatePropsToUnix<ClientAttributes>>;
export declare type ClientServerResponseGetAll = ServerResponse<DatePropsToUnix<ClientAttributes>[]>;
export declare type ClientServerResponsePost = Pick<ClientAttributes, "name">;
export interface ClientServerParamsPatch extends DatePropsToUnix<Partial<RemoveImmutableSequelizeProperties<ClientAttributes>>> {
    vehicles?: number[];
    locations?: number[];
    users?: number[];
}
export declare type ClientServerResponsePatch = ClientServerResponseGet;
export declare type ClientServerResponseDelete = ClientServerResponseGet;
