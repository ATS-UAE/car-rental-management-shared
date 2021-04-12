import { FieldErrors } from "react-form";
import {
	BookingFormCreateValidator,
	BookingCreateFormValues,
	UserBookings
} from "./BookingFormCreateValidator";

export abstract class BookingFormValidator {
	public static validateBookingCreate = (
		values: Partial<BookingCreateFormValues>,
		bookings: UserBookings[]
	): FieldErrors<BookingCreateFormValues> => {
		const errors: FieldErrors<BookingCreateFormValues> = BookingFormCreateValidator.validate(
			values,
			bookings
		);
		return errors;
	};
}

export type { BookingCreateFormValues };
