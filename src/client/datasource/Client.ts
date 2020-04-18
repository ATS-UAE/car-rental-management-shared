import { Sync } from "../utils/helpers/api";

interface ClientProps {
	id: number;
	name: string;
}

export class Client {
	data = new Sync<ClientProps>();
}
