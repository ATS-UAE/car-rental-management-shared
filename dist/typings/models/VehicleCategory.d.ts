export interface VehicleCategoryAttributes {
    categoryId: number;
    vehicleId: number;
    readonly createdAt: Date;
    readonly updatedAt: Date | null;
}
