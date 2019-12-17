export type ExtractArray<T> = T extends (infer R)[] ? R : T;
