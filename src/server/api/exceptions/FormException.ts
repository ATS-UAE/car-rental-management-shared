import { ApiException } from ".";
import { ValidationError } from "yup";

export type FieldError =
	| {
			key: string;
			value: string;
			// TODO: Remove this
			name?: string;
	  }
	| string;
export class FormException extends ApiException {
	constructor(message: string, public fields: FieldError[] = []) {
		super(message);
	}
	public static extractFieldErrors = (e: ValidationError): FieldError[] => {
		return e.inner.map(error => ({
			key: error.path,
			value: error.message,
			name: error.name
		}));
	};

	public static handleFieldErrors = (e: Error) => {
		if (e instanceof ValidationError) {
			const formException = new FormException(
				"An error has occured in one of the fields.",
				FormException.extractFieldErrors(e)
			);
			if (formException.hasErrors) {
				throw formException;
			}
		} else {
			throw e;
		}
	};

	public addField = (field: FieldError) => {
		this.fields.push(field);
	};

	public hasErrors = () => this.fields.length > 0;
}
