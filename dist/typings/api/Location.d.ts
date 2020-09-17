import {
	LocationAttributes,
	DatePropsToUnix,
	ServerResponse,
	RemoveImmutableSequelizeProperties,
	ClientAttributes,
	ExtractServerResponseData
} from "..";
import { UseParameters } from "../utils";
export declare type LocationServerResponseGet = ServerResponse<
	DatePropsToUnix<LocationAttributes> & {
		clients: ClientAttributes[];
	}
>;
export declare type LocationServerResponseGetAll = ServerResponse<
	ExtractServerResponseData<LocationServerResponseGet>[]
>;
export declare type LocationServerParamsPatch = DatePropsToUnix<
	Partial<RemoveImmutableSequelizeProperties<LocationAttributes>>
>;
export declare type LocationServerResponsePatch = LocationServerResponseGet;
export declare type LocationServerResponseDelete = LocationServerResponseGet;
export declare type LocationServerResponsePost = LocationServerResponseGet;
export declare type LocationServerParamsPost = DatePropsToUnix<
	UseParameters<
		RemoveImmutableSequelizeProperties<LocationAttributes>,
		"name" | "lat" | "lng" | "address",
		"locationImageSrc"
	>
>;
