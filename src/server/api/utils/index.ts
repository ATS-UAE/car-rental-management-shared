import { ValidationError } from "yup";
import { FieldError, FormException } from "../exceptions";

export const getValidationErrors = (errors: ValidationError): FieldError[] =>
	errors.inner.map(error =>
		typeof error === "string"
			? error
			: {
					key: error.path,
					value: error.message
			  }
	);

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
