import {
	BookingAttributes,
	DatePropsToUnix,
	ServerResponse,
	RemoveImmutableSequelizeProperties,
	ExtractServerResponseData,
	UseParameters,
} from "../";
import { ReplaceVehicleAttributes } from "../models";

export type BookingServerResponseGet = ServerResponse<
	DatePropsToUnix<BookingAttributes>
>;
export type BookingServerResponseGetAll = ServerResponse<
	DatePropsToUnix<ExtractServerResponseData<BookingServerResponseGet>>[]
>;
export type BookingServerParamsPatch = 
	DatePropsToUnix<
		UseParameters<
			BookingAttributes,
			never,
			| "userId"
			| "paid"
			| "amount"
			| "from"
			| "to"
			| "approved"
			| "finished"
			| "startMileage"
			| "endMileage"
			| "startFuel"
			| "endFuel"
			| "vehicleId"
			| "bookingType"
			| "returnDate"
			| "pickupDate"
		> & {
			replaceVehicle?: UseParameters<
				ReplaceVehicleAttributes,
				"vin" | "brand" | "model" | "plateNumber"
			>;
		}
	>;

export type BookingServerParamsPost = DatePropsToUnix<
	UseParameters<
		RemoveImmutableSequelizeProperties<BookingAttributes>,
		"vehicleId" | "from" | "to" | "userId" | "bookingType",
		| "replaceVehicleId"
		| "amount"
		| "approved"
		| "finished"
		| "startMileage"
		| "endMileage"
		| "startFuel"
		| "endFuel"
		| "pickupDate"
		| "paid"
		| "returnDate"
	>
> & {
	replaceVehicle?: UseParameters<
		ReplaceVehicleAttributes,
		"vin" | "brand" | "model" | "plateNumber"
	>;
};
export type BookingServerResponsePost = BookingServerResponseGet;
export type BookingServerResponsePatch = BookingServerResponseGet;
export type BookingServerResponseDelete = BookingServerResponseGet;
