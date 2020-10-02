import { DatePropsToUnix, UseParameters, UserAttributes, ServerResponse, RemoveImmutableSequelizeProperties } from "..";
export declare type AuthAttributes = Omit<UserAttributes, "password">;
export declare type AuthServerResponseGet = ServerResponse<DatePropsToUnix<AuthAttributes>>;
export declare type AuthServerParamsPatch = DatePropsToUnix<UseParameters<RemoveImmutableSequelizeProperties<UserAttributes>, never, "userImageSrc" | "timeZone" | "clientId" | "email" | "firstName" | "lastName" | "mobileNumber" | "password" | "username">>;
export declare type LoginServerParamsPost = {
    username: string;
    password: string;
    remember?: boolean;
};
export declare type ForgotServerParamsPost = {
    token?: string;
    password?: string;
    email?: string;
};
