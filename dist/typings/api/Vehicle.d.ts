import {
	VehicleAttributes,
	CategoryAttributes,
	DatePropsToUnix,
	ServerResponse,
	RemoveImmutableSequelizeProperties,
	ExtractServerResponseData
} from "..";
import { UseParameters } from "../utils";
export declare type VehicleServerResponseGet = ServerResponse<
	DatePropsToUnix<
		VehicleAttributes & {
			categories: Pick<CategoryAttributes, "name" | "id">[];
		}
	>
>;
export declare type VehicleServerResponseGetAll = ServerResponse<
	DatePropsToUnix<ExtractServerResponseData<VehicleServerResponseGet>>[]
>;
export declare type VehicleServerParamsPatch = DatePropsToUnix<
	Partial<RemoveImmutableSequelizeProperties<VehicleAttributes>>
>;
export declare type VehicleServerParamsPost = DatePropsToUnix<
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
export declare type VehicleServerResponsePost = VehicleServerResponseGet;
export declare type VehicleServerResponsePatch = VehicleServerResponseGet;
export declare type VehicleServerResponseDelete = VehicleServerResponseGet;
