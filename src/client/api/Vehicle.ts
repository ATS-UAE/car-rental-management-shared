import { BookingChargeUnit } from "../../shared/typings";
import { PartialExcept, ServerResponseMeta } from "../../shared/typings";
import { Api, LocationAttributes, Location } from ".";

export interface VehicleAttributes {
	id: number;
	brand: string;
	model: string;
	plateNumber: string;
	vin: string;
	defleeted: boolean;
	parkingLocation: string | null;
	vehicleImageSrc: string | null;
	bookingChargeCount: number;
	bookingCharge: number;
	wialonUnitId: number | null;
	bookingChargeUnit: BookingChargeUnit | null;
	clientId: number | null;
	locationId: number | null;

	readonly createdAt: Date;
	readonly updatedAt: Date;
}

export class Vehicle {
	constructor(
		public data: PartialExcept<VehicleAttributes, "id">,
		public meta?: ServerResponseMeta
	) {}

	public static getLocation = async (vehicleId: number) =>
		Api.execute<LocationAttributes | null>(
			"get",
			`/api/carbooking/vehicles/${vehicleId}/location`
		).then(({ data, ...meta }) =>
			data !== null ? new Location(data, meta) : null
		);
}
