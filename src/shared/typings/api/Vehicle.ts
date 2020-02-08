import {
	VehicleAttributes,
	CategoryAttributes,
	DatePropsToUnix,
	ServerResponse,
	RemoveImmutableSequelizeProperties,
	ExtractServerResponseData
} from "../";
// TODO: Do not allow nested models.
export type VehicleServerResponseGet = ServerResponse<
	DatePropsToUnix<VehicleAttributes & { categories: CategoryAttributes[] }>
>;
export type VehicleServerResponseGetAll = ServerResponse<
	DatePropsToUnix<ExtractServerResponseData<VehicleServerResponseGet>>[]
>;
export type VehicleServerParamsPatch = DatePropsToUnix<
	Partial<RemoveImmutableSequelizeProperties<VehicleAttributes>>
>;

export type VehicleServerResponsePatch = VehicleServerResponseGet;
export type VehicleServerResponseDelete = VehicleServerResponseGet;
