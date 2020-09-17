import { AccidentAttributes, DatePropsToUnix, ServerResponse, RemoveImmutableSequelizeProperties } from "..";
import { UseParameters } from "../utils";
export declare type AccidentServerResponseGet = ServerResponse<DatePropsToUnix<AccidentAttributes>>;
export declare type AccidentServerResponseGetAll = ServerResponse<DatePropsToUnix<AccidentAttributes>[]>;
export declare type AccidentServerParamsPatch = DatePropsToUnix<Partial<RemoveImmutableSequelizeProperties<AccidentAttributes>>>;
export declare type AccidentServerResponsePatch = AccidentServerResponseGet;
export declare type AccidentServerResponseDelete = AccidentServerResponseGet;
export declare type AccidentServerParamsPost = DatePropsToUnix<UseParameters<RemoveImmutableSequelizeProperties<AccidentAttributes>, "message" | "userId" | "vehicleId" | "bookingId", "accidentImageSrc" | "accidentVideoSrc" | "lat" | "lng">>;
export declare type AccidentServerResponsePost = AccidentServerResponseGet;
