import { SequelizeBaseAttributes } from ".";
export interface VehicleCategoryAttributes extends SequelizeBaseAttributes {
    categoryId: number;
    vehicleId: number;
}
