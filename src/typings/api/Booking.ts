import {
	BookingAttributes,
	DatePropsToUnix,
	ServerResponse,
	RemoveImmutableSequelizeProperties,
	ExtractServerResponseData,
	UseParameters
} from "..";

export type BookingServerResponseGet = ServerResponse<
	DatePropsToUnix<BookingAttributes>
>;
export type BookingServerResponseGetAll = ServerResponse<
	DatePropsToUnix<ExtractServerResponseData<BookingServerResponseGet>>[]
>;
export type BookingServerParamsPatch = DatePropsToUnix<
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
		| "replaceVin"
		| "replaceBrand"
		| "replaceModel"
		| "replacePlateNumber"
	>
>;

export type BookingServerParamsPost = DatePropsToUnix<
	UseParameters<
		RemoveImmutableSequelizeProperties<BookingAttributes>,
		"vehicleId" | "from" | "to" | "userId" | "bookingType",
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
		| "replaceVin"
		| "replaceBrand"
		| "replaceModel"
		| "replacePlateNumber"
	>
>;
export type BookingServerResponsePost = BookingServerResponseGet;
export type BookingServerResponsePatch = BookingServerResponseGet;
export type BookingServerResponseDelete = BookingServerResponseGet;
