import { SequelizeBaseAttributes } from ".";
export interface VehicleIssueAttributes extends SequelizeBaseAttributes {
    id: number;
    message: string;
    vehicleId: number;
}
