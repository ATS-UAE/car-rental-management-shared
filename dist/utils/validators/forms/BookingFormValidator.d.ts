import { FieldErrors } from "react-form";
import { BookingCreateFormValues, UserBookings } from "./BookingFormCreateValidator";
export declare abstract class BookingFormValidator {
    static validateBookingCreate: (values: Partial<BookingCreateFormValues>, bookings: UserBookings[]) => FieldErrors<BookingCreateFormValues>;
}
export type { BookingCreateFormValues };
