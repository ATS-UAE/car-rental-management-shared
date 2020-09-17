import {
	DatePropsToUnix,
	UseParameters,
	UserAttributes,
	ServerResponse,
	RemoveImmutableSequelizeProperties
} from "..";

export type AuthAttributes = Omit<UserAttributes, "password">;

export type AuthServerResponseGet = ServerResponse<
	DatePropsToUnix<AuthAttributes>
>;

export type AuthServerParamsPatch = DatePropsToUnix<
	UseParameters<
		RemoveImmutableSequelizeProperties<UserAttributes>,
		never,
		| "userImageSrc"
		| "timeZone"
		| "clientId"
		| "email"
		| "firstName"
		| "lastName"
		| "mobileNumber"
		| "password"
		| "username"
	>
>;

export type LoginServerParamsPost = {
	username: string;
	password: string;
	remember?: boolean;
};

export type ForgotServerParamsPost = {
	token?: string;
	password?: string;
	email?: string;
};
