export interface ReplaceVehicleAttributes {
	id: number;
	plateNumber: string;
	brand: string;
	model: string;
	vin: string;

	readonly createdAt: Date;
	readonly updatedAt: Date;
}
