import { Location } from "./";
import { PartialExcept } from "../";
export interface Client {
	id: number;
	name: string;
}

export interface ClientResponse extends Client {
	locations: Location[];
	vehicles: Vehicle[];
	users: User[];
}

export interface ClientRequest extends Client {
	locations: number[];
	vehicles: number[];
	users: number[];
}
