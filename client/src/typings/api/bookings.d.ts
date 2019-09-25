export interface Booking {
	id: number;
	from: number;
	to: number;
	approved: boolean;
	vehicleId: number;
	finalized: boolean;
}
