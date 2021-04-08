import * as yup from "yup";
import { DateUtils } from "../../DateUtils";
import {
	BookingAttributes,
	BookingType,
	DatePropsToUnix,
	UserAttributes
} from "../../../typings";
import { FieldErrors } from "react-form";
import { FormUtils } from "../../FormUtils";

export type UserBookings = Pick<
	DatePropsToUnix<BookingAttributes>,
	"from" | "to" | "userId" | "bookingType"
>;

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

export abstract class BookingFormCreateValidator {
	public static validate = (
		values: Partial<BookingCreateFormValues>,
		bookings: UserBookings[]
	): FieldErrors<BookingCreateFormValues> => {
		try {
			BookingFormCreateValidator.formBookingCreateValidationSchema.validateSync(
				values,
				{
					abortEarly: false,
					context: {
						bookings
					}
				}
			);
		} catch (e) {
			return FormUtils.getFieldErrorsFromYupValidationError(e);
		}
		return {};
	};

	private static useReplacementBookingFields = (
		bookingType: BookingType,
		schema: yup.AnySchema
	) => {
		if (bookingType !== BookingType.REPLACEMENT) {
			return schema.nullable().transform(() => null);
		}
		if (bookingType === BookingType.REPLACEMENT) {
			return schema.required();
		}
	};

	private static canUserBookVehiclesOn = (
		user: Pick<UserAttributes, "id">,
		userBookings: UserBookings[],
		bookingFormValues: Pick<BookingAttributes, "bookingType"> & {
			from: Date | number;
			to: Date | number;
		}
	) => {
		if (bookingFormValues.bookingType === BookingType.REPLACEMENT) {
			return true;
		}
		for (const booking of userBookings) {
			const isSameUser = booking.userId === user.id;
			const isReplacementBooking = booking.bookingType === BookingType.REPLACEMENT;
			if (isSameUser && !isReplacementBooking) {
				const dateOverlapsFromOtherBookings = DateUtils.doesDateIntervalOverlaps(
					{
						start: DateUtils.getDate(bookingFormValues.from),
						end: DateUtils.getDate(bookingFormValues.to)
					},
					{
						start: DateUtils.getDate(booking.from),
						end: DateUtils.getDate(booking.to)
					}
				);
				if (dateOverlapsFromOtherBookings) {
					return false;
				}
			}
		}
		return true;
	};

	private static formBookingCreateValidationSchema = yup.object().shape({
		from: yup
			.mixed()
			.required("Required")
			.test(
				"not-greater-than-to",
				'Value should not be greater than the value of "to"',
				function (from) {
					const { to } = this.parent;
					if (from) {
						return DateUtils.dateIsBefore(from, to);
					}
					return false;
				}
			)
			.when("$bookings", (bookings: UserBookings[], schema: yup.AnySchema) => {
				return schema.test(
					"no-same-schedules",
					"You already have a booking during this time.",
					function (from: unknown) {
						const { userId, to, bookingType } = this.parent;
						if (from instanceof Date && to instanceof Date) {
							return BookingFormCreateValidator.canUserBookVehiclesOn(
								{ id: userId },
								bookings,
								{ from, to, bookingType }
							);
						}
						return true;
					}
				);
			}),
		to: yup
			.mixed()
			.required("Required")
			.test(
				"not-greater-than-to",
				'Value should not be lesser than the value of "from"',
				function (to) {
					const { from } = this.parent;
					return DateUtils.dateIsAfter(to, from);
				}
			)
			.when("$bookings", (bookings: UserBookings[], schema: yup.AnySchema) => {
				return schema.test(
					"no-same-schedules",
					"You already have a booking during this time.",
					function (to: unknown) {
						const { userId, from, bookingType } = this.parent;
						if (from instanceof Date && to instanceof Date) {
							return BookingFormCreateValidator.canUserBookVehiclesOn(
								{ id: userId },
								bookings,
								{ from, to, bookingType }
							);
						}
						return true;
					}
				);
			}),
		locationId: yup.number().required("Required"),
		userId: yup.number().required("Required"),
		vehicleId: yup.number().required("Required"),
		bookingType: yup
			.mixed<BookingType>()
			.oneOf(Object.values(BookingType))
			.required("Required"),
		replacePlateNumber: yup
			.string()
			.when(
				["bookingType"],
				BookingFormCreateValidator.useReplacementBookingFields
			),
		replaceBrand: yup
			.string()
			.when(
				["bookingType"],
				BookingFormCreateValidator.useReplacementBookingFields
			),
		replaceModel: yup
			.string()
			.when(
				["bookingType"],
				BookingFormCreateValidator.useReplacementBookingFields
			),
		replaceVin: yup
			.string()
			.when(
				["bookingType"],
				BookingFormCreateValidator.useReplacementBookingFields
			)
	});
}
