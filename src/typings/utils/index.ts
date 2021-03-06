import { ServerResponse } from "../api";

export type DateToUnix<T> = T extends Date ? Exclude<T, Date> | number : T;

export type Nullable<T> = {
	[K in keyof T]: T[K] | null;
};

export type DatePropsToUnix<T extends object> = {
	[K in keyof T]: DateToUnix<T[K]>;
};

export type PartialExcept<T, K extends keyof T> = Partial<Omit<T, K>> &
	Pick<T, K>;

/**
 * Makes keys 'K' of 'T' partial.
 */
export type PartialKeys<T, K extends keyof T> = Partial<Pick<T, K>> &
	Omit<T, K>;

export type FlattenIfArray<T> = T extends (infer R)[] ? R : T;

export type ExtractServerResponseData<T> = T extends ServerResponse<infer Data>
	? Data
	: T;

export type UnixToDate<T> = T extends number ? Exclude<T, number> | Date : T;

export type UnixPropsToDate<T extends object, K extends keyof T> = {
	[P in keyof T]: P extends K ? UnixToDate<T[P]> : T[P];
};

export type UseParameters<
	AllParams,
	RequiredParams extends keyof AllParams = never,
	OptionalParams extends keyof AllParams = never
> = Pick<AllParams, RequiredParams> & Pick<Partial<AllParams>, OptionalParams>;

export type ReplaceAttributes<
	Original extends object,
	Enhancer extends object
> = {
	[P in keyof Original]: P extends keyof Enhancer ? Enhancer[P] : Original[P];
} &
	Omit<Enhancer, keyof Original>;

export type WithID<T extends object> = T & { id: number };
