import { SequelizeBaseAttributes } from ".";
export interface UserVehicleCategoryAttributes extends SequelizeBaseAttributes {
    userId: number;
    categoryId: number;
}
