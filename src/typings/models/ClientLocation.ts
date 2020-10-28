import { SequelizeBaseAttributes } from ".";

export interface ClientLocationAttributes extends SequelizeBaseAttributes {
	locationId: number;
	clientId: number;
}
