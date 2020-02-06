export * from "./Booking";
export * from "./Vehicle";
export * from "./Collection";

export enum API_OPERATION {
	CREATE = "CREATE",
	DELETE = "DELETE",
	UPDATE = "UPDATE",
	READ = "READ"
}

export type UseParameters<
	AllParams,
	RequiredParams extends keyof AllParams = undefined,
	PartialParams extends keyof AllParams = undefined
> = Pick<AllParams, RequiredParams> & Pick<Partial<AllParams>, PartialParams>;
