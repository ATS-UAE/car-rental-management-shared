import { ValidationError } from "yup";
import { FormErrorBuilder } from ".";
import { ApiException } from "../exceptions";
import { InvalidPermissionException } from "../exceptions";

export class ApiErrorHandler {
	constructor(e: Error) {
		if (e instanceof ValidationError) {
			// Add fields to errors
			const errors = new FormErrorBuilder();
			for (const error of e.inner) {
				if (error.name === "permission") {
					throw new InvalidPermissionException(error.message);
				}
				errors.add(error.path, error.message);
			}
			errors.throw;
		}
		// Unknown error.
		throw new ApiException("An unknown error has occurred.");
	}
}
