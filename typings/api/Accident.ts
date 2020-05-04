import {
	AccidentAttributes,
	DatePropsToUnix,
	ServerResponse,
	RemoveImmutableSequelizeProperties
} from "..";
import { UseParameters } from "../utils";

export type AccidentServerResponseGet = ServerResponse<
	DatePropsToUnix<AccidentAttributes>
>;
export type AccidentServerResponseGetAll = ServerResponse<
	DatePropsToUnix<AccidentAttributes>[]
>;
export type AccidentServerParamsPatch = DatePropsToUnix<
	Partial<RemoveImmutableSequelizeProperties<AccidentAttributes>>
>;

export type AccidentServerResponsePatch = AccidentServerResponseGet;
export type AccidentServerResponseDelete = AccidentServerResponseGet;
export type AccidentServerParamsPost = DatePropsToUnix<
	UseParameters<
		RemoveImmutableSequelizeProperties<AccidentAttributes>,
		"message" | "userId" | "vehicleId" | "bookingId",
		"accidentImageSrc" | "accidentVideoSrc" | "lat" | "lng" 
	>
>
export type AccidentServerResponsePost = AccidentServerResponseGet