import { ServerResponse } from "../api";
export declare type DateToUnix<T> = T extends Date ? number : T;
export declare type Nullable<T> = {
    [K in keyof T]: T[K] | null;
};
export declare type DatePropsToUnix<T extends object> = {
    [K in keyof T]: DateToUnix<T[K]>;
};
export declare type PartialExcept<T, K extends keyof T> = Partial<Omit<T, K>> & Pick<T, K>;
/**
 * Makes keys 'K' of 'T' partial.
 */
export declare type PartialKeys<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>;
export declare type FlattenIfArray<T> = T extends (infer R)[] ? R : T;
export declare type ExtractServerResponseData<T> = T extends ServerResponse<infer Data> ? Data : T;
export declare type UnixToDate<T> = T extends number ? Date : T;
export declare type UnixPropsToDate<T extends object, K extends keyof T> = {
    [P in keyof T]: P extends K ? Date : T[P];
};
export declare type UseParameters<AllParams, RequiredParams extends keyof AllParams = never, OptionalParams extends keyof AllParams = never> = Pick<AllParams, RequiredParams> & Pick<Partial<AllParams>, OptionalParams>;
export declare type ReplaceAttributes<Original extends object, Enhancer extends object> = {
    [P in keyof Original]: P extends keyof Enhancer ? Enhancer[P] : Original[P];
} & Omit<Enhancer, keyof Original>;
export declare type WithID<T extends object> = T & {
    id: number;
};
