import {
	ClientAttributes,
	DatePropsToUnix,
	ServerResponse,
	RemoveImmutableSequelizeProperties
} from "../";
import { UseParameters } from "../utils";

export type ClientServerResponseGet = ServerResponse<
	DatePropsToUnix<ClientAttributes>
>;
export type ClientServerResponseGetAll = ServerResponse<
	DatePropsToUnix<ClientAttributes>[]
>;

export type ClientServerResponsePost = Pick<ClientAttributes, "name">;
export type ClientServerParamsPost = DatePropsToUnix<
	UseParameters<
		RemoveImmutableSequelizeProperties<
			ClientAttributes
		>,"name", never
	>
>
export interface ClientServerParamsPatch
	extends DatePropsToUnix<
		Partial<RemoveImmutableSequelizeProperties<ClientAttributes>>
	> {
	vehicles?: number[];
	locations?: number[];
	users?: number[];
}

export type ClientServerResponsePatch = ClientServerResponseGet;
export type ClientServerResponseDelete = ClientServerResponseGet;
