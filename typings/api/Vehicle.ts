import {
	VehicleAttributes,
	DatePropsToUnix,
	ServerResponse,
	RemoveImmutableSequelizeProperties,
	ExtractServerResponseData
} from "../";
import { UseParameters } from "../utils";
// TODO: Do not allow nested models.
export type VehicleServerResponseGet = ServerResponse<
	DatePropsToUnix<
		VehicleAttributes & {
			categories: number[];
		}
	>
>;
export type VehicleServerResponseGetAll = ServerResponse<
	(DatePropsToUnix<ExtractServerResponseData<VehicleServerResponseGet>> & {
		categories: number[];
	})[]
>;
export type VehicleServerParamsPatch = DatePropsToUnix<
	Partial<RemoveImmutableSequelizeProperties<VehicleAttributes>>
>;

export type VehicleServerParamsPost = DatePropsToUnix<
	UseParameters<
		RemoveImmutableSequelizeProperties<VehicleAttributes>,
		"brand" | "model" | "plateNumber" | "vin",
		| "wialonUnitId"
		| "bookingCharge"
		| "bookingChargeCount"
		| "bookingChargeUnit"
		| "clientId"
		| "defleeted"
		| "vehicleImageSrc"
		| "parkingLocation"
		| "locationId"
	>
>;
export type VehicleServerResponsePost = VehicleServerResponseGet;
export type VehicleServerResponsePatch = VehicleServerResponseGet;
export type VehicleServerResponseDelete = VehicleServerResponseGet;
