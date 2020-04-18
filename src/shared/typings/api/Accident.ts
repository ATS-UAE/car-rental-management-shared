import {
	AccidentAttributes,
	DatePropsToUnix,
	ServerResponse,
	RemoveImmutableSequelizeProperties
} from "..";

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
