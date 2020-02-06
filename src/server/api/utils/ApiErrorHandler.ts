import { ApiException, FormException } from "../exceptions";
import { InvalidPermissionException } from "../exceptions";

export class ApiErrorHandler {
	constructor(e: Error) {
		console.log("ApiErrorHandler", e);
		if (e instanceof FormException) {
			// Add fields to errors
			for (const error of e.fields) {
				console.log("error fields",error);
				if (error.name === "permission") {
					throw new InvalidPermissionException(error.message);
				}
			}
			throw e;
		}
		// Unknown error.
		throw new ApiException("An unknown error has occurred.");
	}
}
