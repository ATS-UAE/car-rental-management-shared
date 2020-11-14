import {
	UserAttributes,
	DatePropsToUnix,
	ServerResponse,
	RemoveImmutableSequelizeProperties,
	UseParameters
} from "..";

export type UserCreateOptions = DatePropsToUnix<
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
> & { categories?: number[]; locations?: number[] };

export type UserSignUpOptions = { token: string } & Omit<
	UserCreateOptions,
	"role" | "email" | "clientId" | "categories"
>;

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
	> & { categories?: number[]; locations?: number[] }
>;
export type UserServerParamsPost = UserCreateOptions | UserSignUpOptions;
export type UserServerResponsePost = UserServerResponseGet;
export type UserServerResponsePatch = UserServerResponseGet;
export type UserServerResponseDelete = UserServerResponseGet;
