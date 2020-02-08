import { ServerResponse } from "../../shared/typings";
import { FormError } from "../components/presentational";
export * from "./RoleUtils";
export * from "./helpers";

export class FormErrors<Values extends object> {
	public fieldErrors: FormError<Values> = {};
	public formErrors: string[] = [];

	public addFieldError(error: { key: string; value: string }) {
		if (!this.fieldErrors[error.key]) {
			this.fieldErrors[error.key] = error.value;
		} else {
			this.fieldErrors[error.key] += ` ${error.value}`;
		}
	}
	public addFormError(error: string) {
		this.formErrors.push(error);
	}

	static handleFormApiErrors = <Values extends object>(
		error: ServerResponse<Values>
	) => {
		const errors = new FormErrors<Values>();
		const apiErrors = error.errors;

		if ((apiErrors && !apiErrors.length) || !apiErrors) {
			errors.addFormError(error.message);
		} else if (apiErrors) {
			apiErrors.forEach(e => {
				if (typeof e === "string") {
					errors.addFormError(e);
				} else {
					errors.addFieldError(e);
				}
			});
		}

		return errors;
	};
}
