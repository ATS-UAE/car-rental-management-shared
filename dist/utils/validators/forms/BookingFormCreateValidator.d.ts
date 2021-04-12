import { FieldErrors } from "react-form";
import { BookingAttributes, BookingType, DatePropsToUnix } from "../../../typings";
export declare type UserBookings = Pick<DatePropsToUnix<BookingAttributes>, "from" | "to" | "userId" | "bookingType">;
export interface BookingCreateFormValues {
    vehicleId: number;
    from: Date;
    to: Date;
    userId: number;
    bookingType: BookingType;
    replaceVin?: string;
    replaceBrand?: string;
    replaceModel?: string;
    replacePlateNumber?: string;
    locationId: number;
}
export declare abstract class BookingFormCreateValidator {
    static validate: (values: Partial<BookingCreateFormValues>, bookings: UserBookings[]) => FieldErrors<BookingCreateFormValues>;
    private static useReplacementBookingFields;
    private static canUserBookVehiclesOn;
    private static formBookingCreateValidationSchema;
}
