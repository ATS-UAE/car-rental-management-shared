import { ValidationError } from "yup";
import { FieldError, FormException } from "../exceptions";

export * from "./ApiErrorHandler";
export * from "./FormErrorBuilder";

export const getValidationErrors = (errors: ValidationError): FieldError[] =>
	errors.inner.map(error => ({
		field: error.path,
		message: error.message,
		name: error.name
	}));

export const catchYupVadationErrors = async (
	validator: () => void | Promise<void>
) => {
	let errors: FieldError[] = [];
	try {
		await validator();
	} catch (e) {
		if (e instanceof ValidationError) {
			errors = getValidationErrors(e);
		}
		if (errors.length) {
			throw new FormException(
				"An error has occured in one of the fields.",
				errors
			);
		}
	}
};
