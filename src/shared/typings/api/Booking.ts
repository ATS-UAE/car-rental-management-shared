import {
	BookingAttributes,
	DatePropsToUnix,
	ServerResponse,
	RemoveImmutableSequelizeProperties,
	ExtractServerResponseData
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

export type BookingServerResponsePatch = BookingServerResponseGet;
export type BookingServerResponseDelete = BookingServerResponseGet;
