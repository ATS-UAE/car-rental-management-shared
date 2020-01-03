export * from "./Booking";
export * from "./Vehicle";
export * from "./Collection";

export type UseParameters<
	AllParams,
	RequiredParams extends keyof AllParams = undefined,
	PartialParams extends keyof AllParams = undefined
> = Pick<AllParams, RequiredParams> & Pick<Partial<AllParams>, PartialParams>;
