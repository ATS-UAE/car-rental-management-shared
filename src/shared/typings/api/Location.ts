import {
	LocationAttributes,
	DatePropsToUnix,
	ServerResponse,
	RemoveImmutableSequelizeProperties,
	ClientAttributes,
	ExtractServerResponseData
} from "../";

// TODO: No nested models.
export type LocationServerResponseGet = ServerResponse<
	DatePropsToUnix<LocationAttributes> & { clients: ClientAttributes[] }
>;

export type LocationServerResponseGetAll = ServerResponse<
	ExtractServerResponseData<LocationServerResponseGet>[]
>;
export type LocationServerParamsPatch = DatePropsToUnix<
	Partial<RemoveImmutableSequelizeProperties<LocationAttributes>>
>;
export type LocationServerResponsePatch = LocationServerResponseGet;
export type LocationServerResponseDelete = LocationServerResponseGet;
