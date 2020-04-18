import moment from "moment";
import { BookingStatus } from "../typings";

export * from "./RoleUtils";

export const getBookingStatus = (booking: {
	from: number;
	to: number;
	approved: boolean | null;
}): BookingStatus => {
	let status = BookingStatus.UNKNOWN;
	let currentTime = moment();
	let hasPassedFrom = moment(booking.from, "X").isSameOrBefore(currentTime);
	let hasPassedTo = moment(booking.to, "X").isSameOrBefore(currentTime);
	if (booking.approved) {
		if (hasPassedFrom && !hasPassedTo) status = BookingStatus.ONGOING;
		else if (hasPassedTo) status = BookingStatus.FINISHED;
		else status = BookingStatus.APPROVED;
	} else {
		if (booking.approved === null) {
			status = BookingStatus.PENDING;
		} else if (booking.approved === false) {
			status = BookingStatus.DENIED;
		}
	}
	return status;
};

export const hasActiveBooking = (
	bookings: Array<{
		from: number;
		to: number;
		approved: boolean | null;
		id: number;
	}>,
	bookingId?: number
): boolean => {
	let active = false;
	if (bookings) {
		for (const booking of bookings) {
			let status = getBookingStatus(booking);
			if (
				status === BookingStatus.PENDING ||
				status === BookingStatus.ONGOING ||
				status === BookingStatus.APPROVED
			) {
				if (!bookingId || bookingId !== booking.id) return true;
			}
		}
	}
	return active;
};
