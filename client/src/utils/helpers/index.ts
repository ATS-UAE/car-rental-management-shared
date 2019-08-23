import moment from "moment";
import BookingStatus from "../../variables/enums/BookingStatus";
import { IBooking } from "../typings/api";
export { default as CancellablePromise } from "./CancellablePromise";

export const hasActiveBooking = (
	vehicle: { [key: string]: any; bookings: any[] },
	bookingId: number
): boolean => {
	let active = false;
	if (vehicle && vehicle.bookings) {
		for (const booking of vehicle.bookings) {
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

export const isBookingTimeSlotTaken = (
	vehicleBookings: Array<IBooking>,
	from: number,
	to: number,
	bookingId: number
): boolean => {
	let taken = false;

	for (const booking of vehicleBookings) {
		let status = getBookingStatus(booking);
		if (
			status === BookingStatus.PENDING ||
			status === BookingStatus.ONGOING ||
			status === BookingStatus.APPROVED
		) {
			taken = rangeOverlap(from, to, booking.from, booking.to);
			if ((taken && !bookingId) || bookingId !== booking.id) {
				return taken;
			}
		}
	}

	return taken;
};

export const getBookingStatus = (booking: IBooking): BookingStatus => {
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
			if (hasPassedFrom) status = BookingStatus.EXPIRED;
			else status = BookingStatus.PENDING;
		} else if (booking.approved === false) status = BookingStatus.DENIED;
	}
	return status;
};

export const rangeOverlap = (
	x1: number,
	x2: number,
	y1: number,
	y2: number
): boolean => {
	return Math.max(x1, y1) <= Math.min(x2, y2);
};

export const toTitleWords = (word: string, delimiter: string = "_"): string => {
	let splitWord = word.split(delimiter);
	let result = "";
	for (let word of splitWord) {
		for (let i = 0; i < word.length; i++) {
			let letter = word[i];
			if (i === 0) {
				result += letter.toUpperCase();
			} else {
				result += letter.toLowerCase();
			}
		}
		result += " ";
	}
	return result;
};

export const waitForAll = async (obj: any): Promise<any> => {
	if (obj instanceof Array) {
		for (let e of obj) {
			await waitForAll(e);
		}
	} else {
		for (let prop in obj) {
			if (obj[prop]) {
				// If the propriety has a 'then' function it's a Promise
				if (typeof obj[prop].then === "function") {
					obj[prop] = await obj[prop];
				}
				if (obj)
					if (typeof obj[prop] === "object") {
						obj[prop] = await waitForAll(obj[prop]);
					}
			}
		}
	}
	return obj;
};
