import {
	LocationAttributes,
	DatePropsToUnix,
	ServerResponse,
	RemoveImmutableSequelizeProperties,
	ExtractServerResponseData
} from "../";
import { UseParameters } from "../utils";

export type LocationServerResponseGet = ServerResponse<
	DatePropsToUnix<LocationAttributes>
>;

export type LocationServerResponseGetAll = ServerResponse<
	ExtractServerResponseData<LocationServerResponseGet>[]
>;
export type LocationServerParamsPatch = DatePropsToUnix<
	Partial<RemoveImmutableSequelizeProperties<LocationAttributes>>
>;
export type LocationServerResponsePatch = LocationServerResponseGet;
export type LocationServerResponseDelete = LocationServerResponseGet;
export type LocationServerResponsePost = LocationServerResponseGet;
export type LocationServerParamsPost = DatePropsToUnix<
	UseParameters<
		RemoveImmutableSequelizeProperties<LocationAttributes>,
		"name" | "lat" | "lng" | "address",
		"locationImageSrc"
	>
>;
