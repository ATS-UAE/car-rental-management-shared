export interface VehicleIssueAttributes {
    id: number;
    message: string;
    vehicleId: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
