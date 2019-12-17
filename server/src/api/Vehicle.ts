import moment from "moment";
import { Booking, Vehicle as VehicleModel } from "../models";
import { getBookingStatus } from "../utils";
import { BookingStatus } from "../variables/enums";
export class Vehicle {
	public static availableForBooking = async (
		vehicle: VehicleModel,
		from: number,
		to: number
	) => {
		if (vehicle.defleeted === true) {
			return false;
		}

		const bookings = await vehicle.$get("bookings");

		for (const booking of bookings) {
			const status = getBookingStatus({
				from,
				to,
				approved: booking.approved
			});
			if (
				status === BookingStatus.PENDING ||
				status === BookingStatus.APPROVED ||
				status === BookingStatus.ONGOING
			) {
				return false;
			}
		}

		return true;
	};
}
