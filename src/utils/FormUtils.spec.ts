import { ValidationError } from "yup";
import { FormUtils } from "./FormUtils";

describe("FormUtils", () => {
	it("Extracts errors from a yup validation error.", () => {
		const yupError = new ValidationError(
			"error message",
			"error message",
			"test",
			"error message"
		);

		const errors = FormUtils.getFieldErrorsFromYupValidationError(yupError);

		expect(errors).toEqual({ test: "error message" });
	});
});
