export interface VehicleResponse extends Vehicle {}

export interface Vehicle {
	id: number;
	categories: number[];
	clientId: number;
	brand: string;
	model: string;
	plateNumber: string;
}

export interface VehicleRequest extends Vehicle {}
