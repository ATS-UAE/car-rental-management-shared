import moment from "moment";
import { BookingStatus } from "../typings";

export * from "./RoleUtils";

export const getBookingStatus = (booking: {
	from: number;
	to: number;
	approved: boolean | null;
}): BookingStatus => {
	let status = BookingStatus.UNKNOWN;
	const currentTime = moment();
	const hasPassedFrom = moment(booking.from, "X").isSameOrBefore(currentTime);
	const hasPassedTo = moment(booking.to, "X").isSameOrBefore(currentTime);
	if (booking.approved) {
		if (hasPassedFrom && !hasPassedTo) status = BookingStatus.ONGOING;
		else if (hasPassedTo) status = BookingStatus.FINISHED;
		else status = BookingStatus.APPROVED;
	} else if (booking.approved === null) {
		status = BookingStatus.PENDING;
	} else if (booking.approved === false) {
		status = BookingStatus.DENIED;
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
	return bookings.some((booking) => {
		const status = getBookingStatus(booking);
		if (
			status === BookingStatus.PENDING ||
			status === BookingStatus.ONGOING ||
			status === BookingStatus.APPROVED
		) {
			if (!bookingId || bookingId !== booking.id) {
				return true;
			}
		}
		return false;
	});
};

export const toTitleWords = (word: string, delimiter: string = "_"): string => {
	const splitWord = word.split(delimiter);
	let result = "";
	splitWord.forEach((item) => {
		for (let i = 0; i < item.length; i++) {
			const letter = item[i];
			if (i === 0) {
				result += letter.toUpperCase();
			} else {
				result += letter.toLowerCase();
			}
		}
		result += " ";
	});
	return result;
};
