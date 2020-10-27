import { SequelizeBaseAttributes } from ".";

export interface MobilePushAttributes extends SequelizeBaseAttributes {
	id: number;
	key: string;
}
