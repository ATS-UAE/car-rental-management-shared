export interface Booking {
	id: number;
	from: number;
	to: number;
	approved: boolean;
	vehicleId: number;
	finalized: boolean;
	userId: number;
	vehicle: {
		id: number;
		vin: string;
		plateNumber: string;
		brand: string;
		model: string;
	};
}
