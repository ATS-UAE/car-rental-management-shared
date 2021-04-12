import { AxiosError } from "axios";
import { ValidationError } from "yup";
import { StatusCode } from "../typings";
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
	it("Extracts errors from an api error.", () => {
		const apiErrors = FormUtils.getErrorsFromApiError<{ test: string }>({
			response: {
				data: {
					errors: ["TEST", { key: "test", value: "ERROR" }],
					code: StatusCode.INVALID_PARAMETERS,
					message: "Invalid parameters!",
					success: false
				}
			}
		} as AxiosError);

		expect(apiErrors.form).toHaveLength(1);
		expect(apiErrors.form[0]).toEqual("TEST");
		expect(apiErrors.field.test).toEqual("ERROR");
	});
});
