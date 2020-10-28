import { SequelizeBaseAttributes } from ".";
export interface AccidentUserStatusAttributes extends SequelizeBaseAttributes {
    read: boolean;
    deleted: boolean;
    accidentId: number;
    userId: number;
}
