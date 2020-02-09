import { BookingType } from "../";

export interface BookingAttributes {
	id: number;
	paid: boolean;
	amount: number | null;
	from: Date;
	to: Date;
	approved: boolean | null;
	finished: boolean;
	startMileage: number | null;
	endMileage: number | null;
	startFuel: number | null;
	endFuel: number | null;
	userId: number;
	vehicleId: number;
	bookingType: BookingType;
	replaceVehicleId: number | null;

	readonly createdAt: Date;
	readonly updatedAt: Date;
}
