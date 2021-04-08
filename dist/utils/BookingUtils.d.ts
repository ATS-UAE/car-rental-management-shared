import { BookingStatus } from "../typings";
export declare abstract class BookingUtils {
    static getBookingStatus: (booking: {
        from: Date;
        to: Date;
        approved: boolean | null;
    }) => BookingStatus;
    static isBookingTimeSlotTaken: (bookings: {
        from: number | Date;
        to: number | Date;
        id: number;
    }[], from: number | Date, to: number | Date, bookingId?: number | undefined) => boolean;
}
