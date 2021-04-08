import { BookingStatus } from "../typings";
import { DateUtils } from "./DateUtils";
import { MathUtils } from "./MathUtils";

export abstract class BookingUtils {
	public static getBookingStatus = (booking: {
		from: Date;
		to: Date;
		approved: boolean | null;
	}): BookingStatus => {
		let status = BookingStatus.UNKNOWN;
		const currentTime = new Date();
		const hasPassedFrom = booking.from <= currentTime;
		const hasPassedTo = booking.to <= currentTime;
		if (booking.approved) {
			if (hasPassedFrom && !hasPassedTo) {
				status = BookingStatus.ONGOING;
			} else if (hasPassedTo) {
				status = BookingStatus.FINISHED;
			} else {
				status = BookingStatus.APPROVED;
			}
		} else if (booking.approved === null) {
			status = BookingStatus.PENDING;
		} else if (booking.approved === false) {
			status = BookingStatus.DENIED;
		}
		return status;
	};

	public static isBookingTimeSlotTaken = (
		bookings: Array<{
			from: number | Date;
			to: number | Date;
			id: number;
		}>,
		from: number | Date,
		to: number | Date,
		bookingId?: number
	): boolean => {
		return bookings.some((booking) => {
			const taken = MathUtils.rangeOverlap(
				DateUtils.getUnixTimestampFromDate(DateUtils.getDate(from)),
				DateUtils.getUnixTimestampFromDate(DateUtils.getDate(to)),
				DateUtils.getUnixTimestampFromDate(DateUtils.getDate(booking.from)),
				DateUtils.getUnixTimestampFromDate(DateUtils.getDate(booking.to))
			);
			if ((taken && !bookingId) || bookingId !== booking.id) {
				return taken;
			}
			return false;
		});
	};
}
