import {
	UserAttributes,
	DatePropsToUnix,
	ServerResponse,
	RemoveImmutableSequelizeProperties,
	UseParameters
} from "../";

export type UserServerResponseGet = ServerResponse<
	DatePropsToUnix<Omit<UserAttributes, "password">>
>;
export type UserServerResponseGetAll = ServerResponse<
	DatePropsToUnix<Omit<UserAttributes, "password">>[]
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
> & { categories?: number[]; token?: string };
export type UserServerResponsePost = UserServerResponseGet;
export type UserServerResponsePatch = UserServerResponseGet;
export type UserServerResponseDelete = UserServerResponseGet;
