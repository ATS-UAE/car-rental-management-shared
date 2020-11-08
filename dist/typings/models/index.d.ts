export * from "./Accident";
export * from "./AccidentUserStatus";
export * from "./Booking";
export * from "./Category";
export * from "./Client";
export * from "./ClientLocation";
export * from "./Location";
export * from "./User";
export * from "./UserVehicleCategory";
export * from "./Vehicle";
export * from "./VehicleCategory";
export * from "./VehicleIssue";
export * from "./MobilePush";
export * from "./WebPush";
export * from "./UserLocation";
export interface SequelizeBaseAttributes {
    readonly createdAt: Date;
    readonly updatedAt: Date | null;
}
