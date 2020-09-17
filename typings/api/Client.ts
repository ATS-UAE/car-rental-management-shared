import {
	ClientAttributes,
	DatePropsToUnix,
	ServerResponse,
	RemoveImmutableSequelizeProperties
} from "..";

export type ClientServerResponseGet = ServerResponse<
	DatePropsToUnix<ClientAttributes>
>;
export type ClientServerResponseGetAll = ServerResponse<
	DatePropsToUnix<ClientAttributes>[]
>;

export type ClientServerResponsePost = Pick<ClientAttributes, "name">;
// TODO: No nested models.
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
