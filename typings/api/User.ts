import {
	UserAttributes,
	DatePropsToUnix,
	ServerResponse,
	RemoveImmutableSequelizeProperties,
	UseParameters
} from "../";

export type UserServerResponseGet = ServerResponse<
	DatePropsToUnix<UserAttributes>
>;
export type UserServerResponseGetAll = ServerResponse<
	DatePropsToUnix<UserAttributes>[]
>;
export type UserServerParamsPatch = DatePropsToUnix<
	UseParameters<
		RemoveImmutableSequelizeProperties<UserAttributes>,
		never,
		| "userImageSrc"
		| "timeZone"
		| "clientId"
		| "email"
		| "firstName"
		| "lastName"
		| "blocked"
		| "mobileNumber"
		| "licenseImageSrc"
		| "password"
		| "role"
		| "username"
	> & { categories?: number[] }
>;
export type UserServerParamsPost = DatePropsToUnix<
	UseParameters<
		RemoveImmutableSequelizeProperties<UserAttributes>,
		| "clientId"
		| "email"
		| "username"
		| "firstName"
		| "lastName"
		| "password"
		| "mobileNumber"
		| "role",
		"userImageSrc" | "timeZone"
	>
> & { categories?: number[] };
export type UserServerResponsePost = UserServerResponseGet;
export type UserServerResponsePatch = UserServerResponseGet;
export type UserServerResponseDelete = UserServerResponseGet;
