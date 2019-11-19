import { Column } from "material-table";
import api from "../../helpers/api";

export type VehicleStatusData = {
	plateNumber: string;
	chassis: string;
	model: string;
	brand: string;
	wialon: boolean;
	booked: boolean;
	bookings: number;
	accidents: number;
	defleeted: boolean;
};

export const fetchVehicleStatus = async () => {
	const data: VehicleStatusData[] = [];

	try {
		const vehicles = await api.fetchVehicles();
		const accidents = await api.fetchAccidents();
		const bookings = await api.fetchBookings();

		if (vehicles.data) {
			for (const vehicle of vehicles.data) {
				const vehicleAccidents =
					accidents.data &&
					accidents.data.filter(accident => accident.vehicleId === vehicle.id);
				const vehicleBookings =
					bookings.data &&
					bookings.data.filter(booking => booking.vehicleId === vehicle.id);
				data.push({
					accidents: (vehicleAccidents && vehicleAccidents.length) || 0,
					bookings: (vehicleBookings && vehicleBookings.length) || 0,
					model: vehicle.model,
					plateNumber: vehicle.plateNumber,
					brand: vehicle.brand,
					chassis: vehicle.chassis,
					wialon: vehicle.wialonUnitId !== null ? true : false,
					defleeted: vehicle.defleeted,
					booked: false
				});
			}
		}
	} catch (e) {
		console.error(e);
		throw new Error("An error has occurred while fetching data.");
	}

	return data;
};
