import { UserBookings } from "./BookingFormCreateValidator";
import { BookingFormValidator } from "./BookingFormValidator";

const errorResult = {};

const createValidatorValidateMockMethod = jest.fn<unknown, unknown[]>(
	() => errorResult
);

jest.mock("./BookingFormCreateValidator", () => ({
	BookingFormCreateValidator: class {
		public static validate = (...params: unknown[]) =>
			createValidatorValidateMockMethod(...params);
	}
}));

describe("BookingFormValidator", () => {
	it("Calls the create form validator.", () => {
		const formValues = {};
		const bookings: UserBookings[] = [];
		const errors = BookingFormValidator.validateBookingCreate(
			formValues,
			bookings
		);

		expect(createValidatorValidateMockMethod).toBeCalledWith(
			formValues,
			bookings
		);
		expect(errors).toStrictEqual(errorResult);
	});
});
