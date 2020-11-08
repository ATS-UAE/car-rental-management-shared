import { SequelizeBaseAttributes } from ".";
export interface UserLocationAttributes extends SequelizeBaseAttributes {
    userId: number;
    locationId: number;
}
