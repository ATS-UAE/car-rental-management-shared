export interface VehicleResponse extends Vehicle {}

export interface Vehicle {
	id: number;
	categories: number[];
	clientId: number;
	brand: string;
	chassis: string;
	wialonUnitId: number | null;
	defleeted: boolean;
	model: string;
	plateNumber: string;
}

export interface VehicleRequest extends Vehicle {}
