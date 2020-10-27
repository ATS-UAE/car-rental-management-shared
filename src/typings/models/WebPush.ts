import { SequelizeBaseAttributes } from ".";

export interface WebPushAttributes extends SequelizeBaseAttributes {
	id: number;
	endpoint: string;
	p256dh: string;
	auth: string;
}
