import { LocationAttributes, DatePropsToUnix, ServerResponse, RemoveImmutableSequelizeProperties, ExtractServerResponseData } from "..";
import { UseParameters } from "../utils";
export declare type LocationServerResponseGet = ServerResponse<DatePropsToUnix<LocationAttributes>>;
export declare type LocationServerResponseGetAll = ServerResponse<ExtractServerResponseData<LocationServerResponseGet>[]>;
export declare type LocationServerParamsPatch = DatePropsToUnix<Partial<RemoveImmutableSequelizeProperties<LocationAttributes>>> & {
    users?: number[];
};
export declare type LocationServerResponsePatch = LocationServerResponseGet;
export declare type LocationServerResponseDelete = LocationServerResponseGet;
export declare type LocationServerResponsePost = LocationServerResponseGet;
export declare type LocationServerParamsPost = DatePropsToUnix<UseParameters<RemoveImmutableSequelizeProperties<LocationAttributes>, "name" | "lat" | "lng" | "address", "locationImageSrc">> & {
    users?: number[];
};
