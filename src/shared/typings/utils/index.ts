import { ServerResponse } from "../api";

export type DateToUnix<T> = T extends Date ? number : T;

export type Nullable<T> = {
	[K in keyof T]: T[K] | null;
};

export type DatePropsToUnix<T extends object> = {
	[K in keyof T]: DateToUnix<T[K]>;
};

export type PartialExcept<T, K extends keyof T> = Partial<Omit<T, K>> &
	Pick<T, K>;

export type FlattenIfArray<T> = T extends (infer R)[] ? R : T;

export type ExtractServerResponseData<T> = T extends ServerResponse<infer Data>
	? Data
	: T;
