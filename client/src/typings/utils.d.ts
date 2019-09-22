export type Nullable<T> = {
	[K in keyof T]: T[K] | null;
};

export type PartialExcept<T, K extends keyof T> = Partial<Omit<T, K>> &
	Pick<T, K>;
