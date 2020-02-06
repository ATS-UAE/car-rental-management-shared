import { Api } from ".";
import { ServerResponseMeta } from "../typings";

export interface ClientAttributes {
	id: number;
	name: string;

	readonly createdAt: Date;
	readonly updatedAt: Date;
}

export class Client {
	constructor(data: ClientAttributes, meta: ServerResponseMeta) {}
}
