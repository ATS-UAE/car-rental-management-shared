import {
	UserAttributes,
	DatePropsToUnix,
	ServerResponse,
	RemoveImmutableSequelizeProperties
} from "../";

export type UserServerResponseGet = ServerResponse<
	DatePropsToUnix<UserAttributes>
>;
export type UserServerResponseGetAll = ServerResponse<
	DatePropsToUnix<UserAttributes>[]
>;
export type UserServerParamsPatch = DatePropsToUnix<
	Partial<RemoveImmutableSequelizeProperties<UserAttributes>>
>;
export type UserServerResponsePatch = UserServerResponseGet;
export type UserServerResponseDelete = UserServerResponseGet;
