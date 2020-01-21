export type ExtractArray<T> = T extends (infer R)[] ? R : T;
export declare type PartialExcept<T, K extends keyof T> = Partial<Omit<T, K>> &
	Pick<T, K>;
