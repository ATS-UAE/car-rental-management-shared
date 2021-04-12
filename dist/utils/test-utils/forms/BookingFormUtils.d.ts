import { BookingCreateFormValues } from "../../validators/forms";
export declare abstract class BookingFormUtils {
    static createBookingFormValues: (override?: Partial<BookingCreateFormValues> | undefined) => BookingCreateFormValues;
}
