import { Category } from ".";

export interface VehicleResponse extends Vehicle {}

export interface Vehicle {
	id: number;
	categories: Category[];
	clientId: number;
	brand: string;
	chassis: string;
	wialonUnitId: number | null;
	defleeted: boolean;
	model: string;
	plateNumber: string;
	locationId: number | null;
	bookingChargeCount: number;
	bookingChargeUnit: BookingChargeUnit;
	bookingCharge: number;
	available?: boolean;
}

export interface VehicleRequest extends Vehicle {}
