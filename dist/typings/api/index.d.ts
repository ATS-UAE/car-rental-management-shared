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
export interface ServerResponse<Result> extends ServerResponseMeta {
    data: Result;
}
export interface ServerResponseMeta {
    code: number;
    errors: Array<string | {
        key: string;
        value: string;
    }>;
    success: boolean;
    message: string;
}
export declare type RemoveImmutableSequelizeProperties<T> = Omit<T, "createdAt" | "updatedAt" | "id">;
export declare enum API_OPERATION {
    CREATE = "CREATE",
    DELETE = "DELETE",
    UPDATE = "UPDATE",
    READ = "READ"
}
