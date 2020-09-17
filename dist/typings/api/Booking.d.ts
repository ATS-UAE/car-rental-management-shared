import { BookingAttributes, DatePropsToUnix, ServerResponse, RemoveImmutableSequelizeProperties, ExtractServerResponseData, UseParameters } from "..";
export declare type BookingServerResponseGet = ServerResponse<DatePropsToUnix<BookingAttributes>>;
export declare type BookingServerResponseGetAll = ServerResponse<DatePropsToUnix<ExtractServerResponseData<BookingServerResponseGet>>[]>;
export declare type BookingServerParamsPatch = DatePropsToUnix<UseParameters<BookingAttributes, never, "userId" | "paid" | "amount" | "from" | "to" | "approved" | "finished" | "startMileage" | "endMileage" | "startFuel" | "endFuel" | "vehicleId" | "bookingType" | "returnDate" | "pickupDate" | "replaceVin" | "replaceBrand" | "replaceModel" | "replacePlateNumber">>;
export declare type BookingServerParamsPost = DatePropsToUnix<UseParameters<RemoveImmutableSequelizeProperties<BookingAttributes>, "vehicleId" | "from" | "to" | "userId" | "bookingType", "amount" | "approved" | "finished" | "startMileage" | "endMileage" | "startFuel" | "endFuel" | "pickupDate" | "paid" | "returnDate" | "replaceVin" | "replaceBrand" | "replaceModel" | "replacePlateNumber">>;
export declare type BookingServerResponsePost = BookingServerResponseGet;
export declare type BookingServerResponsePatch = BookingServerResponseGet;
export declare type BookingServerResponseDelete = BookingServerResponseGet;
