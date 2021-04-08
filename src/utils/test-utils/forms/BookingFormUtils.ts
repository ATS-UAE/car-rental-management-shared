import { BookingType } from "../../../typings";
import { DateUtils } from "../../DateUtils";
import { BookingCreateFormValues } from "../../validators/forms";

export abstract class BookingFormUtils {
	public static createBookingFormValues = (
		override?: Partial<BookingCreateFormValues>
	): BookingCreateFormValues => {
		const THIRTY_MINUTES_IN_SECONDS = 60 * 30;

		const bookingFormValues: BookingCreateFormValues = {
			from: new Date(),
			to: DateUtils.addSecondsToDate(new Date(), THIRTY_MINUTES_IN_SECONDS),
			userId: 1,
			bookingType: BookingType.PRIVATE,
			locationId: 1,
			vehicleId: 1,
			...override
		};

		return bookingFormValues;
	};
}
