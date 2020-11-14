import { UserAttributes, DatePropsToUnix, ServerResponse, RemoveImmutableSequelizeProperties, UseParameters } from "..";
export declare type UserCreateOptions = DatePropsToUnix<UseParameters<RemoveImmutableSequelizeProperties<UserAttributes>, "clientId" | "email" | "username" | "firstName" | "lastName" | "password" | "mobileNumber" | "role", "userImageSrc" | "timeZone">> & {
    categories?: number[];
    locations?: number[];
};
export declare type UserSignUpOptions = {
    token: string;
} & Omit<UserCreateOptions, "role" | "email" | "clientId" | "categories">;
export declare type UserServerResponseGet = ServerResponse<DatePropsToUnix<Omit<UserAttributes, "password">>>;
export declare type UserServerResponseGetAll = ServerResponse<DatePropsToUnix<Omit<UserAttributes, "password">>[]>;
export declare type UserServerParamsPatch = DatePropsToUnix<UseParameters<RemoveImmutableSequelizeProperties<UserAttributes>, never, "userImageSrc" | "timeZone" | "clientId" | "email" | "firstName" | "lastName" | "blocked" | "mobileNumber" | "licenseImageSrc" | "password" | "role" | "username"> & {
    categories?: number[];
    locations?: number[];
}>;
export declare type UserServerParamsPost = UserCreateOptions | UserSignUpOptions;
export declare type UserServerResponsePost = UserServerResponseGet;
export declare type UserServerResponsePatch = UserServerResponseGet;
export declare type UserServerResponseDelete = UserServerResponseGet;
