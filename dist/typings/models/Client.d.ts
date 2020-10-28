import { SequelizeBaseAttributes } from ".";
export interface ClientAttributes extends SequelizeBaseAttributes {
    id: number;
    name: string;
}
