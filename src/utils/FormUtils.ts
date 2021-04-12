import { ValidationError } from "yup";
import { FieldErrors } from "react-form";
import _ from "lodash";
import { AxiosError } from "axios";
import { ServerResponseMeta } from "../typings";

export abstract class FormUtils {
	public static getFieldErrorsFromYupValidationError = <Values extends object>(
		errors: Error,
		existingError: FieldErrors<Values> = {}
	) => {
		if (errors instanceof ValidationError) {
			let newErrors = { ...existingError };

			if (errors.path) {
				_.set(newErrors, errors.path, errors.message);
			}

			errors.inner.forEach((error) => {
				if (error.path) {
					_.set(newErrors, error.path, error.message);
				}
				newErrors = FormUtils.getFieldErrorsFromYupValidationError(
					error,
					newErrors
				);
			});
			return newErrors;
		}
		return {};
	};

	public static getErrorsFromApiError = <Values extends object>(
		e: AxiosError<ServerResponseMeta> | Error
	) => {
		const fieldErrors: FieldErrors<Values> = {};
		const formErrors: string[] = [];

		if ("response" in e) {
			/**
			 * If the response has an error message from errors array, use those errors,
			 * if there are no errors in the errors array, use the message instead.
			 * If there is no response, use the error message from the error object itself.
			 */
			if (e.response?.data) {
				e.response.data.errors.forEach((e) => {
					if (typeof e === "string") {
						formErrors.push(e);
					} else {
						fieldErrors[e.key as keyof Values] = e.value;
					}
				});
				if (formErrors.length === 0) {
					formErrors.push(e.response.data.message);
				}
			} else if (formErrors.length === 0) {
				formErrors.push(e.message);
			}
		}

		return {
			field: fieldErrors,
			form: formErrors
		};
	};

	public static replaceInvalidNumber = <R>(
		check: unknown,
		returnInvalid: R
	): number | R => {
		if (typeof check === "number") {
			return check as number;
		}
		return returnInvalid;
	};
}
