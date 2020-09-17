import { UserAttributes, DatePropsToUnix, ServerResponse, RemoveImmutableSequelizeProperties, UseParameters } from "..";
export declare type UserServerResponseGet = ServerResponse<DatePropsToUnix<UserAttributes>>;
export declare type UserServerResponseGetAll = ServerResponse<DatePropsToUnix<UserAttributes>[]>;
export declare type UserServerParamsPatch = DatePropsToUnix<UseParameters<RemoveImmutableSequelizeProperties<UserAttributes>, never, "userImageSrc" | "timeZone" | "clientId" | "email" | "firstName" | "lastName" | "blocked" | "mobileNumber" | "licenseImageSrc" | "password" | "role" | "username">>;
export declare type UserServerParamsPost = DatePropsToUnix<UseParameters<RemoveImmutableSequelizeProperties<UserAttributes>, "clientId" | "email" | "username" | "firstName" | "lastName" | "password" | "mobileNumber" | "role", "userImageSrc" | "timeZone">>;
export declare type UserServerResponsePost = UserServerResponseGet;
export declare type UserServerResponsePatch = UserServerResponseGet;
export declare type UserServerResponseDelete = UserServerResponseGet;
