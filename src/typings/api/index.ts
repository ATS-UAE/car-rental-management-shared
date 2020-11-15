export * from "./Auth";
export * from "./Accident";
export * from "./Booking";
export * from "./Category";
export * from "./Client";
export * from "./Location";
export * from "./User";
export * from "./Vehicle";
export * from "./WialonUnit";
export * from "./Report";
export * from "./Invite";
export * from "./VehicleCategory";
export * from "./PushSubscription";

export enum StatusCode {
	/**
	 * You are trying to access a resource that is not intended to
	 * be accessed by your role.
	 */
	UNAUTHORIZED_ROLE = "UNAUTHORIZED_ROLE",
	/**
	 * You are not logged in.
	 */
	UNAUTHENTICATED = "UNAUTHENTICATED",
	/**
	 * You are trying to create, or update a resource with invalid fields.
	 */
	INVALID_PARAMETERS = "INVALID_PARAMETERS",
	/**
	 * You are trying to execute an unallowed action to a resource.
	 */
	UNALLOWED_ACTION = "UNALLOWED_ACTION",
	/**
	 * The resource you are trying to access for is not found.
	 */
	RESOURCE_NOT_FOUND = "RESOURCE_NOT_FOUND",
	/**
	 * ¯\\\_(ツ)\_/¯
	 */
	UNKNOWN = "UNKNOWN",
	/**
	 * No errors!
	 */
	SUCCESS = "SUCCESS"
}
export interface ServerResponse<Result> extends ServerResponseMeta {
	data: Result;
}

export interface ServerResponseMeta {
	code: StatusCode;
	errors: Array<string | { key: string; value: string }>;
	success: boolean;
	message: string;
}

export type RemoveImmutableSequelizeProperties<T> = Omit<
	T,
	"createdAt" | "updatedAt" | "id"
>;
