import {
	BookingAttributes,
	DatePropsToUnix,
	ServerResponse,
	RemoveImmutableSequelizeProperties,
	ExtractServerResponseData,
	UseParameters
} from "../";

export type BookingServerResponseGet = ServerResponse<
	DatePropsToUnix<BookingAttributes> & {
		vehicle: {
			id: number;
			vin: string;
			plateNumber: string;
			brand: string;
			model: string;
		};
	}
>;
export type BookingServerResponseGetAll = ServerResponse<
	DatePropsToUnix<ExtractServerResponseData<BookingServerResponseGet>>[]
>;
export type BookingServerParamsPatch = Partial<
	DatePropsToUnix<RemoveImmutableSequelizeProperties<BookingAttributes>>
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
>;
export type BookingServerResponsePatch = BookingServerResponseGet;
export type BookingServerResponseDelete = BookingServerResponseGet;
