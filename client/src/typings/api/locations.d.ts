import { Client } from "./clients";
export interface Location {
	id: number;
	name: string;
	clientId: number;
	address: string;
	lat: number;
	lng: number;
}

export interface LocationResponse extends Location {
	clients: Client[];
}

export interface LocationRequest extends Location {
	clients: number[];
}
